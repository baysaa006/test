import { IBranch } from './branch';
import { BaseEntity } from './base';
import { IChannelSection } from './channel.section';

export interface IChannel extends BaseEntity {
  type: string;
  services: string[];
  branch: IBranch;
  active: boolean;
  sections: IChannelSection[];
}
