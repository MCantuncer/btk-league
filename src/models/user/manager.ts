import { UserInput } from './input';
import { UserModel } from './entity';
import { UserUtils } from './utils';
import { withTransaction } from '../../helpers/database';

export class UserManager {
  static registerUser = async (input: UserInput) => {
    const user = new UserModel({
      _id: input.id,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      userType: input.userType,
    });

    const userUtils = new UserUtils(user);
    await userUtils.setPassword(input.password);

    await withTransaction(async (session) => {
      await user.save({ session });
    });

    return user;
  };
}
