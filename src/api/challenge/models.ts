import { Field, InputType } from 'type-graphql';
import { BaseInputWithDate } from '../../models/common';

@InputType()
export class ChallengeResponseInput extends BaseInputWithDate {
  @Field(() => Boolean)
  accepted: boolean;
}
