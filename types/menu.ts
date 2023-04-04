import { BaseEntity } from './base';

export interface IData {
  getMenus: IMenu[];
}

export interface IMenu extends BaseEntity {
  description: string;
  categories: IMenuCategory[];
}

export interface IMenuCategory {
  id: string;
  icon: string;
  name: string;
  sort: number;
  color: string;
  active: boolean;
  children: any;
  products?: IMenuProduct[];
}

export interface IMenuProduct extends BaseEntity {
  description: string;
  specification: string;
  image: string;
  variants?: IMenuVariant[];
  sort?: number;
  active: boolean;
  productId: string;
}

export interface IMenuVariant extends BaseEntity {
  price: number;
  salePrice: number;
  discount: number;
  active: boolean;
  unitValue: string;
  unitType: string;
}
