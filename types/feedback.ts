import { BaseEntity } from './base';

export interface IFeedback extends BaseEntity {
  phone: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  isRead: boolean;
}
