import { Field, Int, ObjectType } from 'type-graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { UserTypeEnum } from './enums';
import { EntityWithIdAndDates } from '../base';

@ObjectType()
export class User extends EntityWithIdAndDates {
  @prop()
  @Field(() => UserTypeEnum)
  userType: UserTypeEnum;

  @prop()
  @Field(() => String)
  firstName: string;

  @prop()
  @Field(() => String)
  lastName: string;

  @prop()
  @Field(() => String)
  email: string;

  @prop()
  @Field(() => String)
  password: string;

  @prop()
  @Field(() => Int, { nullable: true })
  standing?: number | null;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { collection: 'users' },
});
