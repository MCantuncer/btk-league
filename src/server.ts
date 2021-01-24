import * as http from 'http';

import { expressApp } from './server/express-app';
import apollo from './apollo';
import { connectDatabase, createCollections } from './helpers/database';

import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

const app = expressApp();

export const prepareServer = async () => {
  const apolloServer = await apollo();

  let RedisStore = connectRedis(session);
  let redisClient = redis.createClient();

  app.use(
    session({
      name: 'btkId',
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10, // 10 days
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // cookie only works in https,
      },
      saveUninitialized: false,
      secret: 'btk-league-will-rock',
      resave: false,
    }),
  );

  apolloServer.applyMiddleware({ app });

  await connectDatabase();
  await createCollections();

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  return { httpServer, apolloServer };
};

export default async () => await prepareServer();
