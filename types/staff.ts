import { BaseEntity } from './base';
import { IBranch } from './branch';

export interface IStaff extends BaseEntity {
  branches: IBranch[];
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  roles: string[];
  state: boolean;
  createdAt: Date;
  updatedAt: Date;
}
