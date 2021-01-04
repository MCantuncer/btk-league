import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User, UserModel } from '../../models/user/entity';
import { UserInput } from '../../models/user/input';
import { copyFields } from '../../utils/dataUtils';
import { UserManager } from '../../models/user/manager';
import { verify } from 'argon2';
import { ApolloError } from 'apollo-server-express';

@Resolver(() => User)
export default class {
  @Query((returns) => User, { nullable: true })
  async getUserById(@Arg('id') id: string): Promise<User | null> {
    return await UserModel.findOne({ _id: id }).exec();
  }

  @Mutation(() => User)
  async register(@Arg('input') input: UserInput): Promise<User | null> {
    copyFields(input, 'id', '_id');
    return await UserManager.registerUser(input);
  }

  @Mutation(() => User)
  async login(@Arg('input') input: UserInput): Promise<User | null> {
    const email = input.email;
    const user = await UserModel.findOne({ email }).lean();
    if (user && (await verify(user.password, input.password))) {
      return user;
    } else {
      throw new ApolloError('Username or password is incorrect', 'USERNAME_OR_PASSWORD_IS_INCORRECT');
    }
  }
}
