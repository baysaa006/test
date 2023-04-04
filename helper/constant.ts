/************ CONSTANTS ***********/
import moment from 'moment';
import { getPayload } from '../contexts/auth.context';
const currency = getPayload()?.currency;
export const CURRENCY = currency ? currency : 'MNT';

export const dateFormat = (date: Date, format: string) => moment(date).format(format);

export const moneyFormat = (value: number) =>
  new Intl.NumberFormat('mn-MN', { style: 'currency', currency: 'MNT' }).format(value).replace('MNT', '');
