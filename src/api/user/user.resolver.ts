import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User, UserModel } from '../../models/user/entity';
import { UserInput } from '../../models/user/input';
import { copyFields } from '../../utils/dataUtils';
import { UserManager } from '../../models/user/manager';
import { verify } from 'argon2';
import { ApolloError } from 'apollo-server-express';
import { CheckResponse, LoginInput } from './models';
import { UserHelpers } from './helpers';
import common from '../../../config/common';
import { COOKIE_OPTIONS, SESSION_COOKIE_NAME } from '../../utils/constants';

@Resolver(() => User)
export default class {
  @Query(() => CheckResponse)
  async checkEmail(@Arg('email', () => String!) email: string): Promise<CheckResponse> {
    const user = await UserModel.findOne({ email }).lean();

    return {
      exists: !!user,
    };
  }

  @Mutation(() => User)
  async register(@Ctx() { res }, @Arg('input') input: UserInput): Promise<User | null> {
    if (!res)
      // For test TODO: Mock Ctx's res.cookie function.
      res = {
        cookie: function (x, y, z) {
          return true;
        },
      };

    copyFields(input, 'id', '_id');
    const user = await UserManager.registerUser(input);

    const token = UserHelpers.getToken(user, common.deploy_host);
    res.cookie(SESSION_COOKIE_NAME, token, { httpOnly: true, sameSite: true });

    return user;
  }

  @Mutation(() => User)
  async login(@Ctx() { res }, @Arg('input') input: LoginInput): Promise<User | null> {
    if (!res)
      res = {
        cookie: function (x, y, z) {
          return true;
        },
      };

    const email = input.email;
    const user = await UserModel.findOne({ email }).lean();

    if (user && (await verify(user.password, input.password))) {
      const token = UserHelpers.getToken(user, common.deploy_host);
      res.cookie(SESSION_COOKIE_NAME, token, COOKIE_OPTIONS);

      return user;
    } else {
      throw new ApolloError('Username or password is incorrect', 'USERNAME_OR_PASSWORD_IS_INCORRECT');
    }
  }
}
