import { IMenuVariantOption, IVariant } from './product';
import { ICustomer } from './customer';
import { ITable } from './table';
import { ITransaction } from './transaction';

export default interface IOrders {
  id?: string;
  number: string;
  type: string;
  comment: string;
  deliveryDate: Date;
  address: string;
  isRead: boolean;
  table: ITable;
  items: IOrderItem[];
  charges: IOrderCharge[];
  customer?: ICustomer;
  transactions: ITransaction[];
  totalAmount: number;
  discountAmount: number;
  taxAmount: number;
  paidAmount: number;
  debtAmount: number;
  grandTotal: number;
  state: string;
  paymentState: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  discount: number;
  state: string;
  image: string;
  comment?: string;
  // variant: IVariant;
}

export interface IOrderCharge {
  id?: number;
  type: number;
  name: string;
  value: number;
}
export interface IOrderReview {
  map(arg0: (review: IOrderReview, index: any) => JSX.Element): import('react').ReactNode;
  id: string;
  createdAt: String;
  updatedAt: String;
  type: String;
  liked: Boolean;
  comment: String;
  additional: String;
  pictures: [String];
  uploads: [String];
}

export interface IDraftItem {
  id: string;
  uuid: string;
  name: string;
  salePrice: number;
  quantity: any;
  image: any;
  unitValue: string;
  unitType: string;
  basesPrice: number;
  options: IMenuVariantOption[];
}
