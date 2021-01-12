import { Field, ObjectType } from 'type-graphql';
import { EntityWithIdAndDates } from '../base';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { User } from '../user/entity';
import { WinnerEnum } from './enums';

@ObjectType()
@modelOptions({ schemaOptions: { _id: false } })
export class SetResult {
  @prop()
  homeGame: number;

  @prop()
  visitorGame: number;

  @prop()
  @Field(() => WinnerEnum, { nullable: true })
  winner?: WinnerEnum | null;
}

@ObjectType()
export class Match extends EntityWithIdAndDates {
  @prop({ ref: User, type: String })
  home: Ref<User>;

  @prop({ ref: User, type: String })
  visitor: Ref<User>;

  @prop()
  result?: SetResult[] | null;

  @prop()
  matchWinner?: WinnerEnum | null;

  @prop()
  matchDate?: Date | null;
}
