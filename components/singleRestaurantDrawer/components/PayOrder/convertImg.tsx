import cash from './images/cash.png';
import card from './images/card.png';
import qpay from './images/qpay.png';
import monpay from './images/monpay.png';
import socialPay from './images/socialpay.png';
import toki from './images/toki.png';
import { PAYMENT_TYPE } from '../../../../constants/Constant';

export const ConvertPaymentImg = (type: any) => {
  switch (type) {
    case PAYMENT_TYPE.Cash:
      return cash;
    case PAYMENT_TYPE.Kart:
      return card;
    case PAYMENT_TYPE.QPay:
      return qpay;
    case PAYMENT_TYPE.MonPay:
      return monpay;
    case PAYMENT_TYPE.SocialPay:
      return socialPay;
    case PAYMENT_TYPE.Toki:
      return toki;
    default:
      return type;
  }
};
