import { Field, ObjectType } from 'type-graphql';
import { EntityWithIdAndDates } from '../base';
import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from '../user/entity';

@ObjectType()
export class Challenge extends EntityWithIdAndDates {
  @prop({ ref: User, type: String })
  @Field(() => String)
  challenger: Ref<User>;

  @prop({ ref: User, type: String })
  @Field(() => String)
  challenged: Ref<User>;

  @prop()
  @Field(() => Boolean, { nullable: true })
  accepted?: boolean | null;
}

export const ChallengeModel = getModelForClass(Challenge, {
  schemaOptions: { collection: 'challenges' },
});
