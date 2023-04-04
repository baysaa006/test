import { BaseEntity } from './base';

export interface ICustomer extends BaseEntity {
  phone: string;
  email: string;
  gender: string;
  birthday: string;
}
