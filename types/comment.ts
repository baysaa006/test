import IOrders from './order';
import { IStaff } from './staff';

export interface IComment {
  id?: number;
  commentDate: Date;
  order?: IOrders;
  user?: IStaff;
  comment: string;
}
