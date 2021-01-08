import { testMutate, testQuery } from '../../jest.setup';
import { UserInputs, UserMutations, UserQueries } from './globals';
import { User } from '../../src/models/user/entity';
import { CheckResponse } from '../../src/api/user/models';
import { createUUID } from '../../src/utils/dataUtils';

describe('User Tests', () => {
  it('Register a User', async () => {
    const graphqlResponse = await testMutate(UserMutations.Instance.REGISTER, {
      input: { ...UserInputs.Instance().REGISTER_INPUT_1 },
    });

    const response = (graphqlResponse.data || {}) as { register: User };

    expect(response.register.email).toEqual(UserInputs.Instance().REGISTER_INPUT_1.email);

    expect(response).toMatchSnapshot();
  });

  it('Invalid Register a User with Exist Email', async () => {
    const graphqlResponse = await testMutate(UserMutations.Instance.REGISTER, {
      input: { ...UserInputs.Instance().REGISTER_INPUT_1, id: createUUID() },
    });

    expect(graphqlResponse.errors).not.toBeUndefined();

    expect(graphqlResponse.errors![0].extensions!.code).toEqual('ARGUMENT_VALIDATION_ERROR');

    expect(graphqlResponse).toMatchSnapshot();
  });

  it('Login User', async () => {
    const graphqlResponse = await testMutate(UserMutations.Instance.LOGIN, {
      input: { ...UserInputs.Instance().LOGIN_INPUT_1 },
    });

    const response = (graphqlResponse.data || {}) as { login: User };

    expect(response.login.email).toEqual(UserInputs.Instance().LOGIN_INPUT_1.email);
    expect(response.login.password).not.toEqual(UserInputs.Instance().LOGIN_INPUT_1.password);

    expect(response).toMatchSnapshot();
  });

  it('Check Email', async () => {
    const graphqlResponse = await testQuery(UserQueries.Instance.CHECK_EMAIL, {
      emailArg: UserInputs.Instance().LOGIN_INPUT_1.email,
    });

    const response = (graphqlResponse.data || {}) as { checkEmail: CheckResponse };

    expect(response.checkEmail.exists).toBe(true);
    expect(response).toMatchSnapshot();
  });
});
