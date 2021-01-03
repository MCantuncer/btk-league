import { AuthChecker } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';

export interface Context {
  user?: any;
}

export const authChecker: AuthChecker<Context> = ({ context: { user } }, roles): boolean | Promise<boolean> => {
  let result = false;
  if (roles.length === 0) {
    result = !!user;
  } else if (!user) {
    result = false;
  } else if (user.features && user.features.length && user.features.some((feature) => roles.includes(feature))) {
    result = true;
  }

  if (!result) {
    throw new ApolloError('UNAUTHORIZED', 'UNAUTHORIZED');
  }

  return result;
};
