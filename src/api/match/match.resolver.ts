import { Match, MatchModel } from '../../models/match/entity';
import { Arg, Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { DocumentQuery } from 'mongoose';
import { MatchArgs, MatchPaginationResponse } from './models';
import { ModelUtils } from '../../helpers/database';
import { DocumentType } from '@typegoose/typegoose';
import { MatchInput } from '../../models/match/input';
import { MatchManager } from '../../models/match/manager';
import { PaginationInput } from '../../graphql/filters';
import { IPaginationResponse } from '../../graphql/pagination';

@Resolver(() => Match)
export default class {
  @Authorized()
  @Query(() => MatchPaginationResponse)
  async listMatches(@Args(() => MatchArgs) args: MatchArgs): Promise<MatchPaginationResponse> {
    let query: DocumentQuery<DocumentType<Match>[], DocumentType<Match>, {}> = (
      await ModelUtils.findAndFilter(MatchModel, args)
    )();

    const paginationInput = args['pagination'] || new PaginationInput();
    return (await ModelUtils.applyPagination(
      query,
      paginationInput,
      MatchPaginationResponse,
    )) as IPaginationResponse<Match>;
  }

  @Authorized()
  @Mutation(() => Match)
  async upsertMatch(@Arg('input', () => MatchInput) input: MatchInput): Promise<Match | null> {
    return await MatchManager.upsertMatch(input);
  }
}
