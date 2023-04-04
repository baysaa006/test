import { ITag } from './tag';
import { ICategory } from './category';
import { IAttributeValue } from './attribute';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  specification: string;
  categories: ICategory[];
  tags: ITag[];
  image: string;
  upload: string;
  price: number;
  createdAt: Date;
  variants: IVariant[];
}

export interface IVariant {
  id: string;
  name: string;
  price: number;
  salePrice: number;
  discount: number;
  active: boolean;
  attributes?: IAttributeValue[];
}

export interface IMenuVariantOption {
  values: any[];
  type: string;
  name: string;
  price: number;
  id: string;
  active: boolean;
}
