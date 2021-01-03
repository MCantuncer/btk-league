import * as dotenv from 'dotenv';
import { getEnvPath } from '../../environments/helpers';
dotenv.config({ path: getEnvPath() });

export default {
  mongo: {
    connString: 'YOU_MUST_USE_YOUR_OWN_CONN_STRING',
    dbName: 'btk-league',
  },
};
