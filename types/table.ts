import { BaseEntity } from './base';

export interface ITable extends BaseEntity {
  code: string;
  description: string;
  min: number;
  max: number;
  shape: IShape;
  action: 'C' | 'U' | 'N' | 'D';
  active: boolean;
}

export interface IShape {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  rotation: number;
}
