import { registerEnumType } from 'type-graphql';

export enum UserTypeEnum {
  COACH = 1,
  PLAYER = 2,
  SPECTATOR = 3,
}

registerEnumType(UserTypeEnum, {
  name: 'UserTypeEnum',
  description: 'User Types',
});
