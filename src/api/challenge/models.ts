import { Field, InputType } from 'type-graphql';
import { ValidateObjectId } from '../../helpers/validators';
import { User } from '../../models/user/entity';
import { Challenge } from '../../models/challenge/entity';
import { BaseInputWithDate } from '../../models/common';

@InputType()
export class ChallengeResponseInput {
  @Field(() => String)
  @ValidateObjectId(Challenge)
  challengeId: string;

  @Field(() => Boolean)
  accepted: boolean;
}

@InputType()
export class MakeChallengeInput extends BaseInputWithDate {
  @Field(() => String)
  @ValidateObjectId(User)
  challenged: string;
}
