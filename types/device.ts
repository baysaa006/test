import { BaseEntity } from './base';
import { IBranch } from './branch';

export interface IDevice extends BaseEntity {
  branch: IBranch;
  type: string;
  key: string;
}
