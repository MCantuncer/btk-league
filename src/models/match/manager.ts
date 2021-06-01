import { Challenge } from '../challenge/entity';
import { Match, MatchModel } from './entity';
import { createUUID } from '../../utils/dataUtils';
import { withTransaction } from '../../helpers/database';

export class MatchManager {
  static createMatchViaChallenge = async (challenge: Challenge): Promise<Match> => {
    const match = new MatchModel({
      _id: createUUID(),
      home: challenge.challenged,
      visitor: challenge.challenger,
    });

    await withTransaction(async (session) => {
      await match.save({ session });
    });

    return match;
  };
}
