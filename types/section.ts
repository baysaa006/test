import { BaseEntity } from './base';
import { IBranch } from './branch';
import { ICharge } from './charge';
import { IMenu } from './menu';
import { IPayment } from './payment';
import { ITable } from './table';

export interface ISection extends BaseEntity {
  branch: IBranch;
  menu?: IMenu;
  tables: ITable[];
  payments: IPayment[];
  charges: ICharge[];
  changed: boolean;
}
