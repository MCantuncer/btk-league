import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User, UserModel } from '../../models/user/entity';
import { UserInput } from '../../models/user/input';

@Resolver(() => User)
export default class {
  @Query((returns) => User, { nullable: true })
  async getUserById(@Arg('id') id: string): Promise<User | null> {
    return await UserModel.findOne({ _id: id }).exec();
  }

  @Mutation(() => User)
  async addUser(@Arg('input') input: UserInput): Promise<User | null> {
    return await UserModel.create(input);
  }
}
