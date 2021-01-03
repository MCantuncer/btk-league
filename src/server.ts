import * as http from 'http';

import { expressApp } from './server/express-app';
import apollo from './apollo';
import { connectDatabase, createCollections } from './helpers/database';

const app = expressApp();

export const prepareServer = async () => {
  const apolloServer = await apollo();

  apolloServer.applyMiddleware({ app });

  await connectDatabase();
  await createCollections();

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  return { httpServer, apolloServer };
};

export default async () => await prepareServer();
