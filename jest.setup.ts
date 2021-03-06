import { lang } from './locales/i18n/locale.service';
import { closeDatabaseConn, connectDatabase, createCollections } from './src/helpers/database';
import apollo from './src/apollo';
import { ApolloServerTestClient } from 'apollo-server-testing';
import { TEST_USER_ID } from './src/utils/constants';

const { createTestClient } = require('apollo-server-testing');

process.env.NODE_ENV = 'test';

lang.i18nProvider.setLocale('tr');

jest.setTimeout(360000);

class Client {
  static res: ApolloServerTestClient;

  static async getClient(): Promise<ApolloServerTestClient> {
    if (this.res) return this.res;

    const apolloServer = await apollo(() => {
      return {
        user: {
          id: TEST_USER_ID,
          email: 'test@btk.com',
        },
        res: {
          cookie: function (x, y, z) {
            return true;
          },
        },
        req: {
          session: {},
        },
      };
    });

    this.res = createTestClient(apolloServer);
    return this.res;
  }
}

export async function testQuery(queryStr, variables = {}) {
  const { query } = await Client.getClient();
  const graphqlResponse = await query({ query: queryStr, variables });
  if (graphqlResponse.errors && graphqlResponse.errors.length) console.error(JSON.stringify(graphqlResponse.errors));

  return graphqlResponse;
}

export async function testMutate(mutation, variables = {}) {
  const { mutate } = await Client.getClient();
  const graphqlResponse = await mutate({ mutation, variables });
  if (graphqlResponse.errors) console.error(JSON.stringify(graphqlResponse.errors));

  return graphqlResponse;
}

beforeAll(async () => {
  await connectDatabase();
  await createCollections();
});

afterAll(async () => {
  await closeDatabaseConn();
});
