import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export interface IPaginationResponse<TItem> {
  page: number;
  limit: number;
  count: number;
  data: TItem[];
  hasNext: boolean;
}

export function BasePaginationResponse<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType({ isAbstract: true })
  class PaginationClass implements IPaginationResponse<TItem> {
    constructor(page: number, limit: number, count: number, data: TItem[], hasNext: boolean) {
      this.page = page;
      this.limit = limit;
      this.count = count;
      this.data = data;
      this.hasNext = hasNext;
    }

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    count: number;

    @Field(() => [TItemClass])
    data: TItem[];

    @Field(() => Boolean)
    hasNext: boolean;
  }

  return PaginationClass;
}
