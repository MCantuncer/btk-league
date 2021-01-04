import { gql } from 'graphql-request/dist';
import { UserTypeEnum } from '../../src/models/user/enums';

const userResponse = `{
  id
  userType
  firstName
  lastName
  email
}`;

export class UserMutations {
  static Instance = new UserMutations();

  SAVE = gql`
        mutation Register($input: UserInput!) {
            register(input: $input)
            ${userResponse}
        }`;
}

export class UserQueries {
  static Instance = new UserQueries();

  GET = gql`
        query GetUserById($idArg: StringFilterInput) {
            getUserById(id: $idArg)
            ${userResponse}
        }`;
}

export class UserInputs {
  static Instance = () => new UserInputs();
  static CREATE_ID_1 = '0bbdcc9f-a146-4d1b-a2bc-65257dadbd48';

  REGISTER_INPUT_1 = {
    id: UserInputs.CREATE_ID_1,
    firstName: 'Test',
    lastName: 'BTK',
    email: 'test@btk.com',
    password: '12345687',
    userType: UserTypeEnum[UserTypeEnum.PLAYER],
  };
}
