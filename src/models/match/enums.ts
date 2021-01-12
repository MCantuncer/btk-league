import { registerEnumType } from 'type-graphql';

export enum WinnerEnum {
  HOME = 1,
  VISITOR = 2,
}

registerEnumType(WinnerEnum, {
  name: 'WinnerEnum',
  description: 'Winner Enums',
});
