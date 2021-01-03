import { Field, Int, ObjectType } from 'type-graphql';
import { prop, Ref } from '@typegoose/typegoose';
import { User } from '../user/entity';

@ObjectType()
export class ScoreBoard {
  @prop({ ref: User, type: String })
  @Field(() => String)
  user: Ref<User>;

  @prop()
  @Field(() => Int)
  points: number;
}
