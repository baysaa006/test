import { Moment } from 'moment';
import { BaseEntity } from './base';

export interface IBranch extends BaseEntity {
  type: string;
  description: string;
  domain: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  upload?: string;
  banner?: string;
  dayClose: Moment;
  active: boolean;
  background?: string;
}
