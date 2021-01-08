import { Field, InputType } from 'type-graphql';
import { UserTypeEnum } from './enums';
import { IsEmail, MinLength } from 'class-validator';
import { BaseInputWithDate } from '../common';
import { ValidateEmailIsUnique } from '../../helpers/validators';

@InputType()
export class UserInput extends BaseInputWithDate {
  @Field(() => UserTypeEnum)
  userType: UserTypeEnum;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  @IsEmail()
  @ValidateEmailIsUnique()
  email: string;

  @Field(() => String)
  @MinLength(6)
  password: string;
}
