import { Challenge, ChallengeModel } from '../../models/challenge/entity';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ChallengeResponseInput } from './models';
import { copyFields } from '../../utils/dataUtils';

@Resolver(() => Challenge)
export default class {
  @Authorized()
  @Query(() => [Challenge])
  async meChallengedList(@Ctx() ctx): Promise<Challenge[] | null> {
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
  ): Promise<Challenge | null> {
    copyFields(input, 'id', '_id');

    await ChallengeModel.findOneAndUpdate(
      { challenged: ctx.user.id, _id: input.id },
      { accepted: input.accepted,  },
    ).exec();

    // TODO: If input.accepted is true, then create match without date & court.

    return ChallengeModel.findOne({ _id: input.id }).lean();
  }
}
