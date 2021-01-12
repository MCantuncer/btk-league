import { UserInput } from './input';
import { UserModel } from './entity';
import { UserUtils } from './utils';
import { withTransaction } from '../../helpers/database';
import { UserTypeEnum } from './enums';

export class UserManager {
  static registerUser = async (input: UserInput) => {
    const userCount = await UserModel.find({}).countDocuments().exec();

    const user = new UserModel({
      _id: input.id,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      userType: input.userType,
      standing: input.userType == UserTypeEnum.PLAYER ? userCount + 1 : null,
    });

    const userUtils = new UserUtils(user);
    await userUtils.setPassword(input.password);

    await withTransaction(async (session) => {
      await user.save({ session });
    });

    return user;
  };

  static checkEmail = async (email: string) => {
    const user = await UserModel.findOne({ email: email }).exec();
    return !!user;
  };
}
