import { DRAFT_TYPE, PAYMENT_TYPE, TYPE } from '../constants/Constant';
import qpay from '../assets/images/qpayd.png';
import monPay from '../assets/images/mon.png';
import { Tag, Typography } from 'antd';
import dining from '../assets/typesPic/dinig.svg';
import preOrder from '../assets/typesPic/preOrder.svg';
import takeAway from '../assets/typesPic/takeAway.svg';
import delivery from '../assets/typesPic/delivery.svg';
import socialPay from '../assets/socialPay.png';
import toki from '../assets/toki.png';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

const { Text } = Typography;

export const convertPaymentType = (type: any) => {
  switch (type) {
    case PAYMENT_TYPE.QPay:
      return qpay;
    case PAYMENT_TYPE.MonPay:
      return monPay;
    case PAYMENT_TYPE.SocialPay:
      return socialPay;
    case PAYMENT_TYPE.Toki:
      return toki;
    default:
      return type;
  }
};

export const convertDraftType = (type: any) => {
  const { t } = useTranslation('language');

  switch (type) {
    case DRAFT_TYPE.DRAFT:
      return <Tag color="#2db7f5">{t('mainPage.draft')}</Tag>;
    case DRAFT_TYPE.NEW:
      return <Text style={{ color: '#007BFF', fontSize: 12, marginTop: 2 }}>{t('mainPage.Received')}</Text>;
    case DRAFT_TYPE.ACCEPTED:
      return <Tag color="#0BB8E4">{t('mainPage.Received')}</Tag>;
    case DRAFT_TYPE.COOKING:
      return <Tag color="#0BB8E4">{t('mainPage.COOKING')}</Tag>;
    case DRAFT_TYPE.READY:
      return <Tag color="#00B167">{t('mainPage.READY')}</Tag>;
    case DRAFT_TYPE.COMPLETED:
      return <Tag color="#00B167">{t('mainPage.ACCEPTED')}</Tag>;
    case DRAFT_TYPE.CANCELLED:
      return <Tag color="#F55053">{t('mainPage.CANCELLED')}</Tag>;
    case DRAFT_TYPE.RETURN:
      return <Tag color="#F55053">{t('mainPage.RETURN')}</Tag>;
    default:
      return type;
  }
};

export const convertDraftTypeText = (type: any) => {
  const { t } = useTranslation('language');
  switch (type) {
    case DRAFT_TYPE.DRAFT:
      return (
        <Text strong style={{ color: '#007BFF' }}>
          {t('mainPage.NotPaid2')}
        </Text>
      );
    case DRAFT_TYPE.NEW:
      return (
        <Text strong style={{ color: '#007BFF', fontSize: 12, marginTop: 2 }}>
          {t('mainPage.Received')}
        </Text>
      );
    case DRAFT_TYPE.ACCEPTED:
      return (
        <Text strong style={{ color: '#007BFF' }}>
          {t('mainPage.Received')}
        </Text>
      );
    case DRAFT_TYPE.COOKING:
      return (
        <Text strong style={{ color: '#007BFF' }}>
          {t('mainPage.COOKING')}
        </Text>
      );
    case DRAFT_TYPE.READY:
      return (
        <Text strong style={{ color: '#007BFF' }}>
          {t('mainPage.READY')}
        </Text>
      );
    case DRAFT_TYPE.COMPLETED:
      return (
        <Text strong style={{ color: '#007BFF' }}>
          {t('mainPage.FulfilledOrder')}
        </Text>
      );
    case DRAFT_TYPE.CANCELLED:
      return (
        <Text strong style={{ color: '#007BFF' }}>
          {t('mainPage.CANCELLED')}
        </Text>
      );
    case DRAFT_TYPE.RETURN:
      return (
        <Text strong style={{ color: '#007BFF' }}>
          {t('mainPage.RETURN')}
        </Text>
      );
    default:
      return type;
  }
};

export const convertType = (type: any) => {
  switch (type) {
    case TYPE.DINIG:
      return dining;
    case TYPE.PRE_ORDER:
      return preOrder;
    case TYPE.DELIVERY:
      return delivery;
    case TYPE.TAKE_AWAY:
      return takeAway;
    default:
      return type;
  }
};

export const optionsCalc = (options: any) => {
  if (isEmpty(options)) {
    return [];
  } else {
    return options
      .map((option: any) => option.price)
      .reduce((acc: any, a: any) => {
        return acc + a;
      }, 0);
  }
};
