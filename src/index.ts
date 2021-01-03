import server from './server';
import 'reflect-metadata';

process.env.TZ = 'UTC';

server().then(({ httpServer, apolloServer }) =>
  httpServer.listen('8081', () => {
    console.log(`🚀 Server ready at http://localhost:8081${apolloServer.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:8081${apolloServer.subscriptionsPath}`);
  }),
);
