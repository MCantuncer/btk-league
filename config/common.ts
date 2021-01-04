import * as dotenv from 'dotenv';
import { getEnvPath } from '../environments/helpers';
import { Algorithm, Secret } from 'jsonwebtoken';

dotenv.config({ path: getEnvPath() });

export default {
  env: process.env.NODE_ENV || 'dev',
  port: parseInt(process.env.PORT as string, 10) || 8081,
  deploy_host: process.env.DEPLOY_HOST || 'localhost',
  deploy_address: process.env.DEPLOY_ADDRESS || 'http://localhost',
  captchaSecret: process.env.CAPTCHA_KEY || '7MegbchzBBBBBEJpiLE9fzdlEJhRfw7WCWPYTemb',

  jwt: {
    secret: (process.env.JWT_SECRET || 'ScqTaVEnc7UEGgE3aKzDDZckshr2UvjCgh6F3zT6') as Secret,
    algorithm: (process.env.JWT_ALGORITHM || 'HS256') as Algorithm,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};
