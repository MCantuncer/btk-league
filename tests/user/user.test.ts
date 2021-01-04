import { testMutate } from '../../jest.setup';
import { UserInputs, UserMutations } from './globals';
import { User } from '../../src/models/user/entity';

describe('User Tests', () => {
  it('Register a User', async () => {
    const graphqlResponse = await testMutate(UserMutations.Instance.SAVE, {
      input: { ...UserInputs.Instance().REGISTER_INPUT_1 },
    });

    const response = (graphqlResponse.data || {}) as { register: User };

    expect(response.register.email).toEqual(UserInputs.Instance().REGISTER_INPUT_1.email);
    expect(response).toMatchSnapshot();
  });
});
