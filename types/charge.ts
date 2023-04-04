import { BaseEntity } from './base';
import { IBranch } from './branch';

export interface ICharge extends BaseEntity {
  branch: IBranch;
  type: 'C' | 'V';
  calculation: 'P' | 'C';
  value: number;
}
