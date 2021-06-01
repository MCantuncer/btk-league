import { Field, GraphQLTimestamp, Int, ObjectType } from 'type-graphql';
import { EntityWithIdAndDates } from '../base';
import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { User } from '../user/entity';
import { WinnerEnum } from './enums';

@ObjectType()
@modelOptions({ schemaOptions: { _id: false } })
export class SetResult {
  @prop()
  @Field(() => Int)
  homeGame: number;

  @prop()
  @Field(() => Int)
  visitorGame: number;

  @prop()
  @Field(() => WinnerEnum, { nullable: true })
  winner?: WinnerEnum | null;
}

@ObjectType()
export class Match extends EntityWithIdAndDates {
  @prop({ ref: User, type: String })
  @Field(() => String)
  home: Ref<User>;

  @prop({ ref: User, type: String })
  @Field(() => String)
  visitor: Ref<User>;

  @prop()
  @Field(() => [SetResult], { nullable: true })
  result?: SetResult[] | null;

  @prop()
  @Field(() => WinnerEnum, { nullable: true })
  matchWinner?: WinnerEnum | null;

  @prop()
  @Field(() => GraphQLTimestamp, { nullable: true })
  matchDate?: Date | null;
}

export const MatchModel = getModelForClass(Match, {
  schemaOptions: { collection: 'matches' },
});
