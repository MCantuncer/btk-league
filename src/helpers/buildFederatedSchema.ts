import { buildFederatedSchema as buildApolloFederationSchema, printSchema } from '@apollo/federation';
import { buildSchema, BuildSchemaOptions, createResolversMap } from 'type-graphql';
import { addResolversToSchema, GraphQLResolverMap } from 'apollo-graphql';
import { GraphQLSchema } from 'graphql';
import gql from 'graphql-tag';

export async function buildFederatedSchema(
  options: Omit<BuildSchemaOptions, 'skipCheck'>,
  referenceResolvers?: GraphQLResolverMap<any>,
): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    ...options,
  });

  const federatedSchema = buildApolloFederationSchema({
    typeDefs: gql(printSchema(schema)),
    resolvers: createResolversMap(schema) as any,
  });

  if (referenceResolvers) {
    addResolversToSchema(federatedSchema, referenceResolvers);
  }
  return federatedSchema;
}
