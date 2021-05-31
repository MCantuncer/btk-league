import { Match, MatchModel } from '../../models/match/entity';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';

@Resolver(() => Match)
export default class {
  @Authorized()
  @Query(() => [Match])
  // async listMatches(@Args(() => MatchSearchInput) args: MatchSearchInput): Promise<Match[] | null> {
  //   return null;
  // }
  async listMatches(@Ctx() ctx): Promise<Match[] | null> {
    return await MatchModel.find({ home: ctx.user.id }).exec();
  }
}
