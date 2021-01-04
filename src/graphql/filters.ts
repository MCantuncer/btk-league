import { Field, GraphQLTimestamp, InputType, Int } from 'type-graphql';
import { GraphQLScalarType } from 'graphql';
import { Max, Min } from 'class-validator';

export function BaseFilterInput<T>(ScalarClass: GraphQLScalarType): any {
  @InputType({ isAbstract: true })
  class FilterInput {
    @Field(() => [ScalarClass], { nullable: true })
    in: T[] | null;

    @Field(() => ScalarClass, { nullable: true })
    eq: T | null;

    @Field(() => ScalarClass, { nullable: true })
    gte: T | null;

    @Field(() => ScalarClass, { nullable: true })
    gt: T | null;

    @Field(() => ScalarClass, { nullable: true })
    lte: T | null;

    @Field(() => ScalarClass, { nullable: true })
    lt: T | null;
  }

  return FilterInput;
}

@InputType()
export class StringFilterInput {
  @Field(() => [String], { nullable: true })
  in: string[] | null;

  @Field(() => String, { nullable: true })
  eq: string | null;

  @Field(() => String, { nullable: true })
  like: string | null;
}

@InputType()
export class NumberFilterInput {
  @Field(() => [Number], { nullable: true })
  in: number[] | null;

  @Field(() => Number, { nullable: true })
  eq: number | null;

  @Field(() => Number, { nullable: true })
  gte: number | null;

  @Field(() => Number, { nullable: true })
  gt: number | null;

  @Field(() => Number, { nullable: true })
  lte: number | null;

  @Field(() => Number, { nullable: true })
  lt: number | null;
}

@InputType()
export class PaginationInput {
  @Field(() => Int)
  page = 1;

  @Field(() => Int)
  @Min(1)
  @Max(200)
  limit = 50;

  public get skip(): number {
    return this.page > 1 ? this.limit * (this.page - 1) : 0;
  }
}

@InputType()
export class DateFilterInput extends BaseFilterInput<Date>(GraphQLTimestamp) {}
