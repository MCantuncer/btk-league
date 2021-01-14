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
  static CREATE_ID_2 = '05837b13-6c10-45f8-9ed5-a88fa6ef9ff2';
  static CREATE_ID_3 = 'dfc9cac2-4240-43d1-9274-1dde9e4a6b18';

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
