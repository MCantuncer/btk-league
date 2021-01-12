import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { UserModel } from '../models/user/entity';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { getModelForClass } from '@typegoose/typegoose';

export function ValidateEmailIsUnique(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'ValidateEmailIsUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: { ...validationOptions, message: 'Email is already exist.' },
      validator: {
        async validate(email: any) {
          const emailExist = await UserModel.findOne({ email: email }).exec();
          return !emailExist;
        },
      },
    });
  };
}

export function ValidateObjectId<T extends AnyParamConstructor<any>>(
  targetClass: T,
  path: string = '_id',
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ValidateObjectId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [targetClass],
      options: { ...validationOptions, message: `Referenced id not found` },
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const model = getModelForClass(targetClass);
          if (value == null) return true;

          if (!Array.isArray(value)) {
            value = [value];
          }

          const count = await model.find().where(path).in(value).where('deleted', false).countDocuments();

          return count == value.length;
        },
      },
    });
  };
}
