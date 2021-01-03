import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-server-express';

export const formatError = (error: GraphQLError) => {
  const formatValidationError = (e, errorBag, path = '') => {
    if (e.property) path += path === '' ? e.property : `.${e.property}`;

    if (e.children && e.children.length) {
      for (let child of e.children) {
        formatValidationError(child, errorBag, path);
      }
    }

    if (e.constraints)
      errorBag.push({
        path,
        errors: Object.values(e.constraints).filter((v) => v && v !== ''),
      });
  };

  const errorBag = [];
  if (error.extensions && error.extensions.exception && error.extensions.exception.validationErrors) {
    for (let err of error.extensions.exception.validationErrors) {
      formatValidationError(err, errorBag);
    }

    return new ApolloError('Argument Validation Error', 'ARGUMENT_VALIDATION_ERROR', {
      validationErrors: errorBag,
    });
  }

  return error;
};

// export function populateFields<T>(
//   refFields: string[] | undefined,
//   fields: object,
//   query: DocumentQuery<DocumentType<T>[], DocumentType<T>, {}>,
// ) {
//   // query.select(Object.keys(fields).join(' '));
//   if (refFields && fields) {
//     for (const refField of refFields) {
//       if (fields.hasOwnProperty(refField)) {
//         query = query.populate(refField);
//       }
//     }
//   }
//
//   return query;
// }
