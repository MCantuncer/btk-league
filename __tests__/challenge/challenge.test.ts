import { testMutate, testQuery } from '../../jest.setup';
import { UserInputs, UserMutations } from '../user/globals';
import { ChallengeInputs, ChallengeMutations, ChallengeQueries } from './globals';
import { Challenge, ChallengeModel } from '../../src/models/challenge/entity';
import { TEST_USER_ID } from '../../src/utils/constants';

describe('Challenge Tests', () => {
  it('Make a Challenge', async () => {
    let graphqlResponse = await testMutate(UserMutations.Instance.REGISTER, {
      input: { ...UserInputs.Instance().REGISTER_INPUT_1, email: 'tuncer@btk.com' },
    });

    expect(graphqlResponse.errors).toBeUndefined();

    graphqlResponse = await testMutate(ChallengeMutations.Instance.MAKE_CHALLENGE, {
      input: ChallengeInputs.Instance().MAKE_CHALLENGE_INPUT_1,
    });

    expect(graphqlResponse.errors).toBeUndefined();

    const response = (graphqlResponse.data || {}) as { makeChallenge: Challenge };

    expect(response.makeChallenge.challenger).toEqual(TEST_USER_ID);
    expect(response.makeChallenge.challenged).toEqual(UserInputs.CREATE_ID_1);
    expect(response.makeChallenge.accepted).toBeNull();

    expect(response).toMatchSnapshot();
  });

  it('Make another Challenge', async () => {
    let graphqlResponse = await testMutate(UserMutations.Instance.REGISTER, {
      input: { ...UserInputs.Instance().REGISTER_INPUT_1, id: UserInputs.CREATE_ID_2, email: 'can@btk.com' },
    });

    expect(graphqlResponse.errors).toBeUndefined();

    graphqlResponse = await testMutate(ChallengeMutations.Instance.MAKE_CHALLENGE, {
      input: ChallengeInputs.Instance().MAKE_CHALLENGE_INPUT_2,
    });

    expect(graphqlResponse.errors).toBeUndefined();

    const response = (graphqlResponse.data || {}) as { makeChallenge: Challenge };

    expect(response.makeChallenge.challenger).toEqual(TEST_USER_ID);
    expect(response.makeChallenge.challenged).toEqual(UserInputs.CREATE_ID_2);
    expect(response.makeChallenge.accepted).toBeNull();

    expect(response).toMatchSnapshot();
  });

  it('List Challenges that User Challenged', async () => {
    const graphqlResponse = await testQuery(ChallengeQueries.Instance.CHALLENGED_LIST, {});

    expect(graphqlResponse.errors).toBeUndefined();

    const response = (graphqlResponse.data || {}) as { challengedList: Challenge[] };

    expect(response.challengedList.length).toEqual(2);
    expect(response.challengedList[0].challenger).toEqual(TEST_USER_ID);
    expect(response.challengedList[1].challenger).toEqual(TEST_USER_ID);

    expect(response).toMatchSnapshot();
  });

  it('List Challenges that User is Challenged By', async () => {
    let graphqlResponse = await testMutate(UserMutations.Instance.REGISTER, {
      input: { ...UserInputs.Instance().REGISTER_INPUT_1, id: UserInputs.CREATE_ID_3, email: 'mcan@btk.com' },
    });

    expect(graphqlResponse.errors).toBeUndefined();

    await ChallengeModel.create(
      new ChallengeModel({
        _id: ChallengeInputs.CREATE_ID_3,
        challenger: UserInputs.CREATE_ID_3,
        challenged: TEST_USER_ID,
      }),
    );

    graphqlResponse = await testQuery(ChallengeQueries.Instance.CHALLENGED_BY_LIST, {});

    expect(graphqlResponse.errors).toBeUndefined();

    const response = (graphqlResponse.data || {}) as { challengedByList: Challenge[] };

    expect(response.challengedByList).toHaveLength(1);

    expect(response.challengedByList[0].challenger).toEqual(UserInputs.CREATE_ID_3);
    expect(response.challengedByList[0].challenged).toEqual(TEST_USER_ID);

    expect(response).toMatchSnapshot();
  });

  it('Accept a Challenge', async () => {
    const graphqlResponse = await testMutate(ChallengeMutations.Instance.RESPOND_CHALLENGE, {
      input: ChallengeInputs.Instance().RESPOND_CHALLENGE_INPUT_1,
    });

    expect(graphqlResponse.errors).toBeUndefined();

    const response = (graphqlResponse.data || {}) as { respondChallenge: Challenge };

    expect(response.respondChallenge.challenger).toEqual(UserInputs.CREATE_ID_3);
    expect(response.respondChallenge.challenged).toEqual(TEST_USER_ID);
    expect(response.respondChallenge.accepted).toBe(true);

    expect(response).toMatchSnapshot();
  });
});
