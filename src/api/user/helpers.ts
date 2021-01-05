import { User } from '../../models/user/entity';
import * as jwt from 'jsonwebtoken';
import common from '../../../config/common';
import { ITokenData } from '../../utils/constants';

export class UserHelpers {
  static getToken(user: User, audience: string | undefined = undefined) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      } as ITokenData,
      common.jwt.secret,
      {
        algorithm: common.jwt.algorithm,
        subject: user.email,
        expiresIn: common.jwt.expiresIn,
        issuer: common.deploy_host,
        audience: audience,
      },
    );
  }

  static verifyToken(token: string): ITokenData | undefined {
    try {
      return jwt.verify(token, common.jwt.secret) as ITokenData;
    } catch (e) {
      return;
    }
  }
}
