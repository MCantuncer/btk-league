import { Field, InputType } from 'type-graphql';
import { BaseInputWithDate } from '../common';
import { ValidateObjectId } from '../../helpers/validators';
import { User } from '../user/entity';

@InputType()
export class ChallengeInput extends BaseInputWithDate {
  @Field(() => String)
  @ValidateObjectId(User)
  challenger: string;

  @Field(() => String)
  @ValidateObjectId(User)
  challenged: string;

  @Field(() => Boolean, { nullable: true })
  accepted?: boolean | null;
}
