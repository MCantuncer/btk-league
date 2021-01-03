import { Field, GraphQLTimestamp, ID, InputType, ObjectType } from 'type-graphql';
import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import * as uuid from 'uuid';

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export abstract class EntityWithIdAndDates extends TimeStamps {
  @prop({ default: () => uuid.v4() })
  _id: string;

  @Field(() => ID, { nullable: true })
  id?: string = undefined;

  @Field(() => GraphQLTimestamp, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLTimestamp, { nullable: true })
  updatedAt?: Date;

  @prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  deleted?: boolean;
}
