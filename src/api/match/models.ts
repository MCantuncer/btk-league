import { Field, InputType } from 'type-graphql';
import { ValidateObjectId } from '../../helpers/validators';
import { User } from '../../models/user/entity';

@InputType()
export class MatchSearchInput {
  @Field(() => String)
  @ValidateObjectId(User)
  home?: string;

  @Field(() => String)
  @ValidateObjectId(User)
  visitor?: string;

  @Field(() => Date)
  matchDate?: Date;
}
