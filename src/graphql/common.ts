import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class BaseArgs {
  @Field(() => Boolean, { nullable: true })
  includeDeleted?: boolean;
}
