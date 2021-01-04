import { MiddlewareFn } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import { copyFields } from '../src/utils/dataUtils';

export const TypegooseMiddleware: MiddlewareFn = async (_, next) => {
  try {
    const result = await next();
    copyFields(result, '_id', 'id');

    return result;
  } catch (e) {
    if (!(e instanceof ApolloError)) console.trace(e);
    throw e;
  }
};

// function convertDocument(doc: Document) {
//   const convertedDocument = doc.toObject();
//   const DocumentClass = getClassForDocument(doc)!;
//   Object.setPrototypeOf(convertedDocument, DocumentClass.prototype);
//   return convertedDocument;
// }
