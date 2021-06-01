import { gql } from 'graphql-request';
import { UserInputs } from '../user/globals';
import moment from 'moment';

const matchResponse = `{
  deleted
  home
  visitor
  result {
    homeGame
    visitorGame
    winner
  }
  matchDate
  matchWinner
  id
}`;

export class MatchMutations {
  static Instance = new MatchMutations();

  UPSERT_MATCH = gql`
    mutation UpsertMatch($input: MatchInput!) {
      upsertMatch(input: $input)
      ${matchResponse}
    }
  `;
}

export class MatchQueries {
  static Instance = new MatchQueries();

  LIST_MATCHES = gql`
    query ListMatches(
      $idArg: StringFilterInput
      $home: StringFilterInput
      $visitor: StringFilterInput
      $matchDate: DateFilterInput
    ) {
      listMatches(id: $idArg, home: $home, visitor: $visitor, matchDate: $matchDate) {
        data ${matchResponse}
        page
        limit
        count
        hasNext
       }
    }
  `;
}

export class MatchInputs {
  static Instance = () => new MatchInputs();
  static CREATE_ID_1 = '5bacbea0-8126-41bb-a9da-e20d86398e69';
  static CREATE_ID_2 = 'ce6429be-8660-4282-b6f6-4f07c4b434be';

  UPSERT_MATCH_INPUT_1 = {
    id: MatchInputs.CREATE_ID_1,
    home: UserInputs.CREATE_ID_1,
    visitor: UserInputs.CREATE_ID_2,
    matchDate: parseInt(moment(new Date()).add('-100', 'minutes').format('x')),
  };

  UPSERT_MATCH_INPUT_2 = {
    id: MatchInputs.CREATE_ID_2,
    home: UserInputs.CREATE_ID_2,
    visitor: UserInputs.CREATE_ID_1,
    matchDate: parseInt(moment(new Date()).format('x')),
  };
}
