import path from 'path';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getEnvPath() {
  const envType = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
  return path.join(__dirname, `../environments/${envType}`);
}
