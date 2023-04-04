import { BaseEntity } from './base';

export interface ICategory extends BaseEntity {
  products: [{ id: string; name: string }];
}
