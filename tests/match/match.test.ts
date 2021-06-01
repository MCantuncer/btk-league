import { testMutate, testQuery } from '../../jest.setup';
import { UserInputs, UserMutations } from '../user/globals';
import { MatchInputs, MatchMutations, MatchQueries } from './globals';
import { Match } from '../../src/models/match/entity';
import { WinnerEnum } from '../../src/models/match/enums';
import moment from 'moment';

describe('Match Tests', () => {
  it('Create a Match', async () => {
    let graphqlResponse = await testMutate(UserMutations.Instance.REGISTER, {
      input: { ...UserInputs.Instance().REGISTER_INPUT_1, email: 'tuncer@btk.com' },
    });

    expect(graphqlResponse.errors).toBeUndefined();

    graphqlResponse = await testMutate(UserMutations.Instance.REGISTER, {
      input: { ...UserInputs.Instance().REGISTER_INPUT_1, email: 'can@btk.com', id: UserInputs.CREATE_ID_2 },
    });

    expect(graphqlResponse.errors).toBeUndefined();

    graphqlResponse = await testMutate(MatchMutations.Instance.UPSERT_MATCH, {
      input: MatchInputs.Instance().UPSERT_MATCH_INPUT_1,
    });

    expect(graphqlResponse.errors).toBeUndefined();

    const response = (graphqlResponse.data || {}) as { upsertMatch: Match };

    expect(response.upsertMatch.home).toEqual(UserInputs.CREATE_ID_1);
    expect(response.upsertMatch.visitor).toEqual(UserInputs.CREATE_ID_2);

    expect(response.upsertMatch.result).toBeNull();
    expect(response.upsertMatch.matchWinner).toBeNull();

    response.upsertMatch.matchDate = null;

    expect(response).toMatchSnapshot();
  });
  it('Update a Match', async () => {
    const graphqlResponse = await testMutate(MatchMutations.Instance.UPSERT_MATCH, {
      input: {
        ...MatchInputs.Instance().UPSERT_MATCH_INPUT_1,
        result: [
          { homeGame: 3, visitorGame: 6, winner: WinnerEnum[WinnerEnum.VISITOR] },
          { homeGame: 3, visitorGame: 6, winner: WinnerEnum[WinnerEnum.VISITOR] },
        ],
        matchWinner: WinnerEnum[WinnerEnum.VISITOR],
      },
    });

    expect(graphqlResponse.errors).toBeUndefined();

    const response = (graphqlResponse.data || {}) as { upsertMatch: Match };

    expect(response.upsertMatch.matchWinner).toEqual(WinnerEnum[WinnerEnum.VISITOR]);
    expect(response.upsertMatch.result).toHaveLength(2);

    response.upsertMatch.matchDate = null;

    expect(response).toMatchSnapshot();
  });
  it('Create new Match', async () => {
    const graphqlResponse = await testMutate(MatchMutations.Instance.UPSERT_MATCH, {
      input: MatchInputs.Instance().UPSERT_MATCH_INPUT_2,
    });

    expect(graphqlResponse.errors).toBeUndefined();

    const response = (graphqlResponse.data || {}) as { upsertMatch: Match };

    expect(response.upsertMatch.home).toEqual(UserInputs.CREATE_ID_2);
    expect(response.upsertMatch.visitor).toEqual(UserInputs.CREATE_ID_1);

    expect(response.upsertMatch.result).toBeNull();
    expect(response.upsertMatch.matchWinner).toBeNull();

    response.upsertMatch.matchDate = null;

    expect(response).toMatchSnapshot();
  });
  it('List Matches', async () => {
    const graphqlResponse = await testQuery(MatchQueries.Instance.LIST_MATCHES);

    expect(graphqlResponse.errors).toBeUndefined();
  });
  it('Filter Matches by Home Player', async () => {
    const graphqlResponse = await testQuery(MatchQueries.Instance.LIST_MATCHES, {
      home: { eq: UserInputs.CREATE_ID_1 },
    });

    expect(graphqlResponse.errors).toBeUndefined();

    const response = (graphqlResponse.data || {}) as { listMatches: { data: Match[] } };

    removeMatchDateFromMatchList(response.listMatches.data);

    expect(response.listMatches.data).toHaveLength(1);
    expect(response.listMatches.data[0].home).toEqual(UserInputs.CREATE_ID_1);

    expect(response).toMatchSnapshot();
  });
  it('Filter Matches by Match Date', async () => {
    const graphqlResponse = await testQuery(MatchQueries.Instance.LIST_MATCHES, {
      matchDate: { gte: parseInt(moment(new Date()).add('-10', 'minutes').format('x')) },
    });

    expect(graphqlResponse.errors).toBeUndefined();

    const response = (graphqlResponse.data || {}) as { listMatches: { data: Match[] } };

    removeMatchDateFromMatchList(response.listMatches.data);

    expect(response.listMatches.data).toHaveLength(1);
    expect(response.listMatches.data[0].id).toEqual(MatchInputs.CREATE_ID_2);

    expect(response).toMatchSnapshot();
  });
});

const removeMatchDateFromMatchList = (matchList: Match[]) => {
  for (const match of matchList) {
    match.matchDate = null;
  }
};
