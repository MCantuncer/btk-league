import path from 'path';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import { TypegooseMiddleware } from '../config/middlewares';
import { ApolloServer } from 'apollo-server-express';
import { authChecker } from './permissions';
import { GraphQLTimestamp } from 'type-graphql';
import { formatError } from './graphql/helpers';
import { UserHelpers } from './api/user/helpers';

export default async (context?): Promise<ApolloServer> => {
  const schema = await buildFederatedSchema({
    resolvers: [__dirname + '/**/**/*.resolver.ts'],
    orphanedTypes: [],
    scalarsMap: [
      {
        type: Date,
        scalar: GraphQLTimestamp,
      },
    ],
    authChecker,
    globalMiddlewares: [TypegooseMiddleware],
    emitSchemaFile: path.resolve(__dirname, `../schema.gql`),
    dateScalarMode: 'timestamp',
    // authMode: "null", //If we need silent auth guards and don't want to return authorization errors to users
  });

  return new ApolloServer({
    schema: schema,
    context: context
      ? context
      : ({ req, res }) => {
          // Builds context data by using request headers
          if (req) {
            let user;
            if (req.headers.authorization) {
              const [tokenType, token] = req.headers.authorization.split(' ');
              if (tokenType == 'Bearer') user = UserHelpers.verifyToken(token);
            }
            // const user = req.headers.user ? JSON.parse(<string>req.headers.user) : null;
            return { user, req, res };
          }
          return {};
        },
    formatError,
  });
};
