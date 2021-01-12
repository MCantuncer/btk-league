import { gql } from 'graphql-request/dist';
import { UserTypeEnum } from '../../src/models/user/enums';

const userResponse = `{
  id
  userType
  firstName
  lastName
  email
  standing
}`;

const checkResponse = `{
  exists
}`;

export class UserMutations {
  static Instance = new UserMutations();

  REGISTER = gql`
        mutation Register($input: UserInput!) {
            register(input: $input)
            ${userResponse}
        }`;

  LOGIN = gql`
        mutation Login($input: LoginInput!) {
            login(input: $input)
            ${userResponse}
        }
        `;
}

export class UserQueries {
  static Instance = new UserQueries();

  CHECK_EMAIL = gql`
        query CheckEmail($emailArg: String!) {
            checkEmail(email: $emailArg)
            ${checkResponse}
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

  LOGIN_INPUT_1 = {
    email: 'test@btk.com',
    password: '12345687',
  };
}
