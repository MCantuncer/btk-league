import { Field, GraphQLTimestamp, InputType, Int } from 'type-graphql';
import { GraphQLScalarType } from 'graphql';
import { Max, Min } from 'class-validator';
import { DocumentQuery } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';

export interface IFilterInput<Model> {
  filterQuery(
    query: DocumentQuery<DocumentType<Model>[], DocumentType<Model>>,
    key: string,
  ): DocumentQuery<DocumentType<Model>[], DocumentType<Model>>;
}

export function BaseFilterInput<T>(ScalarClass: GraphQLScalarType): any {
  @InputType({ isAbstract: true })
  class FilterInput implements IFilterInput<any> {
    @Field(() => [ScalarClass], { nullable: true })
    in?: T[] | null;

    @Field(() => ScalarClass, { nullable: true })
    eq?: T | null;

    @Field(() => ScalarClass, { nullable: true })
    gte?: T | null;

    @Field(() => ScalarClass, { nullable: true })
    gt?: T | null;

    @Field(() => ScalarClass, { nullable: true })
    lte?: T | null;

    @Field(() => ScalarClass, { nullable: true })
    lt?: T | null;

    filterQuery(
      query: DocumentQuery<DocumentType<any>[], DocumentType<any>>,
      key: string,
      merchantId?: string | null,
    ): DocumentQuery<DocumentType<any>[], DocumentType<any>> {
      query = query.where(key);
      for (const filter of Object.keys(this)) {
        const value = this[filter];
        if (value != undefined) {
          switch (filter) {
            case 'eq':
              query.equals(value);
              break;
            case 'in':
              query.in(value);
              break;
            case 'gt':
              query.gt(value);
              break;
            case 'gte':
              query.gte(value);
              break;
            case 'lt':
              query.lt(value);
              break;
            case 'lte':
              query.lte(value);
              break;
            default:
              break;
          }
        }
      }
      return query;
    }
  }

  return FilterInput;
}

export function BaseEnumFilterInput<T>(EnumClass: any): any {
  @InputType({ isAbstract: true })
  class FilterInput implements IFilterInput<T> {
    @Field(() => [EnumClass], { nullable: true })
    in?: T[] | null;

    @Field(() => EnumClass, { nullable: true })
    eq?: T | null;

    filterQuery(
      query: DocumentQuery<DocumentType<T>[], DocumentType<T>>,
      key: string,
      merchantId?: string | null,
    ): DocumentQuery<DocumentType<T>[], DocumentType<T>> {
      query = query.where(key);
      for (const filter of Object.keys(this)) {
        const value = this[filter];
        if (value != undefined) {
          switch (filter) {
            case 'eq':
              query.equals(value);
              break;
            case 'in':
              query.in(value);
              break;
            default:
              break;
          }
        }
      }
      return query;
    }
  }

  return FilterInput;
}

@InputType()
export class StringFilterInput implements IFilterInput<any> {
  @Field(() => [String], { nullable: true })
  in?: string[] | null;

  @Field(() => String, { nullable: true })
  eq?: string | null;

  @Field(() => String, { nullable: true })
  like?: string | null;

  filterQuery(
    query: DocumentQuery<DocumentType<any>[], DocumentType<any>>,
    key: string,
    merchantId?: string | null,
  ): DocumentQuery<DocumentType<any>[], DocumentType<any>> {
    query = query.where(key);
    for (const filter of Object.keys(this)) {
      const value = this[filter];
      if (value != undefined) {
        switch (filter) {
          case 'eq':
            query.equals(value);
            break;
          case 'in':
            query.in(value);
            break;
          case 'like':
            query.regex(new RegExp(value, 'i'));
            break;
          default:
            break;
        }
      }
    }
    return query;
  }
}

@InputType()
export class NumberFilterInput implements IFilterInput<any> {
  @Field(() => [Number], { nullable: true })
  in?: number[] | null;

  @Field(() => Number, { nullable: true })
  eq?: number | null;

  @Field(() => Number, { nullable: true })
  gte?: number | null;

  @Field(() => Number, { nullable: true })
  gt?: number | null;

  @Field(() => Number, { nullable: true })
  lte?: number | null;

  @Field(() => Number, { nullable: true })
  lt?: number | null;

  filterQuery(
    query: DocumentQuery<DocumentType<any>[], DocumentType<any>>,
    key: string,
    merchantId?: string | null,
  ): DocumentQuery<DocumentType<any>[], DocumentType<any>> {
    for (const filter of Object.keys(this)) {
      const value = this[filter];
      if (value != undefined) {
        switch (filter) {
          case 'eq':
            query.where(key).equals(value);
            break;
          case 'in':
            query.where(key).in(value);
            break;
          case 'gt':
            query.where(key).gt(value);
            break;
          case 'gte':
            query.where(key).gte(value);
            break;
          case 'lt':
            query.where(key).lt(value);
            break;
          case 'lte':
            query.where(key).lte(value);
            break;
          case 'like':
            query.where(key).regex(new RegExp(value, 'i'));
            break;
          default:
            break;
        }
      }
    }
    return query;
  }
}

@InputType()
export class DateFilterInput extends BaseFilterInput<Date>(GraphQLTimestamp) {}

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

// JUNK MAYBE USED LATER
// const filterMetadataKey = Symbol('Filter');
//
// export function Filter<Model>(filterClass: BaseFilter<Model>) {
//   return Reflect.metadata(filterMetadataKey, filterClass);
// }
//
// function getFilter(target: any, propertyKey: string) {
//   return Reflect.getMetadata(filterMetadataKey, target, propertyKey);
// }
//
// export enum FilterOperationTypeEnum {
//   NONE,
//   EQ,
//   IN,
//   LIKE,
//   GT,
//   GTE,
//   LT,
//   LTE,
//   BETWEEN,
//   ISNULL,
// }
//
// registerEnumType(FilterOperationTypeEnum, {
//   name: 'FilterOperationTypeEnum',
//   description: 'Filter Operation Type Enums',
// });
//
// class IFilterOptions {
//   targetField?: string;
//   operation?: FilterOperationTypeEnum = FilterOperationTypeEnum.EQ;
//   isArray?: boolean = true;
//   delimiter?: string = ',';
// }
//
// export abstract class BaseFilter<Model> {
//   options: IFilterOptions;
//
//   constructor(options: IFilterOptions = {}) {
//     this.options = options;
//   }
//
//   getValue(value) {
//     if (!!value) {
//       if (this.options.isArray) {
//         value = value.split(this.options.delimiter);
//         return value.map((v) => this.parseValue(v));
//       } else {
//         return this.parseValue(value);
//       }
//     }
//
//     return value;
//   }
//
//   abstract parseValue(value: string | undefined | null): Model | null;
// }
//
// export class StringFilter extends BaseFilter<string> {
//   parseValue(value) {
//     return value || null;
//   }
// }
//
// export class NullBooleanFilter extends BaseFilter<boolean> {
//   parseValue(value) {
//     return value == null ? null : value == 'true' || value == '1';
//   }
// }
//
// export class NumberFilter extends BaseFilter<number> {
//   parseValue(value) {
//     let parsedValue = parseFloat(value);
//     return isNaN(parsedValue) ? null : parsedValue;
//   }
// }
//
// export class DateFilter extends BaseFilter<Date> {
//   parseValue(value) {
//     if (!!value) {
//       value = parseInt(value);
//       return isNaN(value) ? null : new Date(value);
//     }
//     return null;
//   }
// }
