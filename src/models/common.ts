import { EntityWithIdAndDates } from './base';
import { InputType } from 'type-graphql';

@InputType({ isAbstract: true })
export abstract class BaseInputWithId extends EntityWithIdAndDates {}

@InputType({ isAbstract: true })
export abstract class BaseInputWithDate extends EntityWithIdAndDates {}
