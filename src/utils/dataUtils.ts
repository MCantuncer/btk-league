import { isNullOrUndefined } from '@typegoose/typegoose/lib/internal/utils';
import * as uuid from 'uuid';

export function copyFields(obj, from, to) {
  if (!isNullOrUndefined(obj) && typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      if (key === from) {
        obj[to] = obj[from];
      } else if (typeof value === 'object' && key != '__parentArray' && key[0] != '$') {
        copyFields(value, from, to);
      }
    }
  }
}

export function createUUID() {
  return uuid.v4();
}
