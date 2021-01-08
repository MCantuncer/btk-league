import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { UserModel } from '../models/user/entity';

export function ValidateEmailIsUnique(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'ValidateEmailIsUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: { ...validationOptions, message: 'Email is already exist.' },
      validator: {
        async validate(email: any, args: ValidationArguments) {
          const emailExist = await UserModel.findOne({ email: email }).exec();
          return !emailExist;
        },
      },
    });
  };
}
