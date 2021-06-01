import { Challenge } from '../challenge/entity';
import { Match, MatchModel } from './entity';
import { createUUID } from '../../utils/dataUtils';
import { withTransaction } from '../../helpers/database';
import { MatchInput } from './input';
import { DocumentType } from '@typegoose/typegoose';

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

  static upsertMatch = async (matchInput: MatchInput): Promise<Match | null> => {
    const matchId = matchInput._id || matchInput.id;
    const newMatchId = createUUID();
    let isExist: DocumentType<Match> | null = null;

    if (matchId) isExist = await MatchModel.findOne({ _id: matchId }).exec();

    if (isExist) await MatchModel.findOneAndUpdate({ _id: matchId }, matchInput).exec();
    else {
      const match = new MatchModel({
        ...matchInput,
        _id: matchId || newMatchId,
      });

      await withTransaction(async (session) => {
        await match.save({ session });
      });
    }
    return await MatchModel.findOne({ _id: matchId || newMatchId }).exec();
  };
}
