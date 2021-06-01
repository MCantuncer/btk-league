import { ArgsType, Field, ObjectType } from 'type-graphql';
import { BaseArgs } from '../../graphql/common';
import { DateFilterInput, PaginationInput, StringFilterInput } from '../../graphql/filters';
import { Match } from '../../models/match/entity';
import { BasePaginationResponse } from '../../graphql/pagination';

@ArgsType()
export class MatchArgs extends BaseArgs {
  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput | null;

  @Field(() => DateFilterInput, { nullable: true })
  updatedAt?: DateFilterInput | null;

  @Field(() => StringFilterInput, { nullable: true })
  home?: StringFilterInput | null;

  @Field(() => StringFilterInput, { nullable: true })
  visitor?: StringFilterInput | null;

  @Field(() => DateFilterInput, { nullable: true })
  matchDate?: DateFilterInput | null;

  @Field(() => PaginationInput, { nullable: true })
  pagination?: PaginationInput | null;
}

@ObjectType()
export class MatchPaginationResponse extends BasePaginationResponse(Match) {}
