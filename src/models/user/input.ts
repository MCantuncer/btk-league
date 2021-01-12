import { Field, InputType, Int } from 'type-graphql';
import { UserTypeEnum } from './enums';
import { IsEmail, Min, MinLength } from 'class-validator';
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

  @Field(() => Int, { nullable: true })
  @Min(0)
  standing?: number | null;
}
