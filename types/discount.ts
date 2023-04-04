import { BaseEntity } from './base';
import { IBranch } from './branch';

export interface IDiscount extends BaseEntity {
  branch: IBranch;
  type: string;
  calculation: 'Percent' | 'Constant';
  value: number;
}
