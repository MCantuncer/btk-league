import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User, UserModel } from '../../models/user/entity';
import { UserInput } from '../../models/user/input';
import { copyFields } from '../../utils/dataUtils';
import { UserManager } from '../../models/user/manager';
import { verify } from 'argon2';
import { ApolloError } from 'apollo-server-express';
import { CheckResponse, LoginInput } from './models';

@Resolver(() => User)
export default class {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }): Promise<User | null> {
    if (!req.session.userId) return null;

    return await UserModel.findOne({ _id: req.session.userId }).exec();
  }

  @Query(() => CheckResponse)
  async checkEmail(@Arg('email', () => String!) email: string): Promise<CheckResponse> {
    const user = await UserModel.findOne({ email }).lean();

    return {
      exists: !!user,
    };
  }

  @Mutation(() => User)
  async register(@Ctx() { req }, @Arg('input') input: UserInput): Promise<User | null> {
    copyFields(input, 'id', '_id');
    const user = await UserManager.registerUser(input);

    // const token = UserHelpers.getToken(user, common.deploy_host);
    // res.cookie(SESSION_COOKIE_NAME, token, { httpOnly: true, sameSite: true });
    req.session.userId = user.id;
    return user;
  }

  @Mutation(() => User)
  async login(@Ctx() { req, res }, @Arg('input') input: LoginInput): Promise<User | null> {
    const email = input.email;
    const user = await UserModel.findOne({ email: email }).exec();

    if (user && (await verify(user.password, input.password))) {
      // const token = UserHelpers.getToken(user, common.deploy_host);
      // res.cookie(SESSION_COOKIE_NAME, token, COOKIE_OPTIONS);
      req.session.userId = user.id;
      return user;
    } else {
      throw new ApolloError('Username or password is incorrect', 'USERNAME_OR_PASSWORD_IS_INCORRECT');
    }
  }
}
