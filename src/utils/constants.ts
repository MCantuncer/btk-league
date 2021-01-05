import { CookieOptions } from 'express';

export const SESSION_COOKIE_NAME = '_session_identity';
export const COOKIE_OPTIONS: CookieOptions = { httpOnly: true, sameSite: true };

export interface ITokenData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  iat?: number;
  exp?: number;
  sub?: string;
  aud?: string;
  iss?: string;
}

export interface IPasswordResetTokenData {
  email: string;
  iat?: number;
  exp?: number;
  sub?: string;
  aud?: string;
  iss?: string;
}
