import { Field, GraphQLTimestamp, InputType, Int } from 'type-graphql';
import { BaseInputWithDate } from '../common';
import { ValidateObjectId } from '../../helpers/validators';
import { User } from '../user/entity';
import { WinnerEnum } from './enums';

@InputType()
export class MatchInput extends BaseInputWithDate {
  @Field(() => String)
  @ValidateObjectId(User)
  home: string;

  @Field(() => String)
  @ValidateObjectId(User)
  visitor: string;

  @Field(() => GraphQLTimestamp, { nullable: true })
  matchDate?: Date;

  @Field(() => WinnerEnum, { nullable: true })
  matchWinner?: WinnerEnum;

  @Field(() => [SetResultInput], { nullable: true })
  result?: SetResultInput[];
}

@InputType()
export class SetResultInput {
  @Field(() => Int)
  homeGame: number;

  @Field(() => Int)
  visitorGame: number;

  @Field(() => WinnerEnum, { nullable: true })
  winner?: WinnerEnum | null;
}
