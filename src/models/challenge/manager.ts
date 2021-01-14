import { MakeChallengeInput } from '../../api/challenge/models';
import { copyFields } from '../../utils/dataUtils';
import { ChallengeModel } from './entity';
import { withTransaction } from '../../helpers/database';

export class ChallengeManager {
  static makeChallenge = async (input: MakeChallengeInput, challengerId: string) => {
    copyFields(input, 'id', '_id');

    const challenge = new ChallengeModel({
      _id: input.id,
      challenger: challengerId,
      challenged: input.challenged,
    });

    await withTransaction(async (session) => {
      await challenge.save({ session });
    });

    return challenge;
  };
}
