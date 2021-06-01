import { Challenge, ChallengeModel } from '../../models/challenge/entity';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ChallengeResponseInput, MakeChallengeInput } from './models';
import { copyFields } from '../../utils/dataUtils';
import { ChallengeManager } from '../../models/challenge/manager';
import { MatchManager } from '../../models/match/manager';
import { Match } from '../../models/match/entity';

@Resolver(() => Challenge)
export default class {
  @Authorized()
  @Query(() => [Challenge])
  async challengedList(@Ctx() ctx): Promise<Challenge[] | null> {
    return await ChallengeModel.find({ challenger: ctx.user.id }).exec();
  }

  @Authorized()
  @Query(() => [Challenge])
  async challengedByList(@Ctx() ctx): Promise<Challenge[] | null> {
    return await ChallengeModel.find({ challenged: ctx.user.id }).exec();
  }

  @Authorized()
  @Mutation(() => Challenge)
  async respondChallenge(
    @Ctx() ctx,
    @Arg('input', () => ChallengeResponseInput) input: ChallengeResponseInput,
  ): Promise<Match | Challenge | null> {
    copyFields(input, 'id', '_id');

    await ChallengeModel.findOneAndUpdate(
      { challenged: ctx.user.id, _id: input.challengeId },
      { accepted: input.accepted },
    ).exec();

    const challenge = await ChallengeModel.findOne({ _id: input.challengeId }).exec();

    if (input.accepted && challenge) {
      await MatchManager.createMatchViaChallenge(challenge);
    }

    return challenge;
  }

  @Authorized()
  @Mutation(() => Challenge)
  async makeChallenge(
    @Ctx() ctx,
    @Arg('input', () => MakeChallengeInput) input: MakeChallengeInput,
  ): Promise<Challenge | null> {
    return ChallengeManager.makeChallenge(input, ctx.user.id);
  }
}
