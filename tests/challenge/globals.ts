import { gql } from 'graphql-request/dist';
import { UserInputs } from '../user/globals';

const challengeResponse = `{
  accepted
  challenged
  challenger
  deleted
  id
}`;

export class ChallengeMutations {
  static Instance = new ChallengeMutations();

  MAKE_CHALLENGE = gql`
    mutation MakeChallenge($input: MakeChallengeInput!) {
      makeChallenge(input: $input)
      ${challengeResponse}
    }
  `;

  RESPOND_CHALLENGE = gql`
    mutation RespondChallenge($input: ChallengeResponseInput!) {
        respondChallenge(input: $input)
        ${challengeResponse}
    }
  `;
}

export class ChallengeQueries {
  static Instance = new ChallengeQueries();

  CHALLENGED_LIST = gql`
        query MeChallengedList {
            challengedList
            ${challengeResponse}
        }`;

  CHALLENGED_BY_LIST = gql`
        query ChallengedByList {
            challengedByList
            ${challengeResponse}
        }`;
}

export class ChallengeInputs {
  static Instance = () => new ChallengeInputs();
  static CREATE_ID_1 = 'bfa762a8-e4ad-456f-8de9-2c59c753a3c8';
  static CREATE_ID_2 = '6592622d-bb40-497a-b92c-452bdaa4320a';
  static CREATE_ID_3 = 'b5f6b1da-aefd-4c0f-86d9-3551503aea83';

  MAKE_CHALLENGE_INPUT_1 = {
    id: ChallengeInputs.CREATE_ID_1,
    challenged: UserInputs.CREATE_ID_1,
  };

  MAKE_CHALLENGE_INPUT_2 = {
    id: ChallengeInputs.CREATE_ID_2,
    challenged: UserInputs.CREATE_ID_2,
  };

  RESPOND_CHALLENGE_INPUT_1 = {
    challengeId: ChallengeInputs.CREATE_ID_3,
    accepted: true,
  };
}
