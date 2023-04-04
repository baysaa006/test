import { Card, Row, Typography, Image } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import expandLogo from '../../../../../assets/orderTypesPic/Expand.png';
import { CURRENCY } from '../../../../../helper/constant';
import { numberFormat } from '../../../../../helper/utils';
import { isEmpty } from 'lodash';

const { Text } = Typography;

export default function AmountPaid(props: any) {
  const { stateCreateOrderData } = props;
  const { t } = useTranslation('language');
  const [stateExpand, setExpand] = useState(true);

  const onClickExpand = (boolean: any) => {
    setExpand(boolean);
  };
  return (
    <>
      <div className={styles.orderSummaryCard}>
        <Card onClick={() => onClickExpand(!stateExpand)} bodyStyle={{ padding: '3px 15px 1px' }}>
          <Row justify="center" style={{ padding: '6px 0px 7px 0px' }}>
            <Text style={{ color: '#363D4E' }}>{t('mainPage.AmountPaid')}</Text>
          </Row>
          <Row justify="center">
            <Text strong style={{ fontSize: '19px' }}>
              {numberFormat.format(stateCreateOrderData?.debtAmount)} ₮{' '}
            </Text>
          </Row>

          {stateExpand ? (
            <></>
          ) : (
            <div className={styles.expand}>
              <Row justify="space-between" style={{ marginTop: '10px' }}>
                <Text strong>{t('mainPage.SubAmount')}:</Text>
                <Text>{numberFormat.format(stateCreateOrderData?.totalAmount)} ₮</Text>
              </Row>

              <Row justify="space-between" style={{ marginTop: '10px' }}>
                <Text strong>{t('mainPage.Tax')}:</Text>
                <Text>
                  {numberFormat.format(
                    Math.abs(
                      stateCreateOrderData?.taxAmount + stateCreateOrderData?.vatAmount + stateCreateOrderData?.cityTax,
                    ),
                  )}{' '}
                  ₮
                </Text>
              </Row>
              <Row justify="space-between" style={{ marginTop: '10px', marginLeft: '20px' }}>
                <Text> {t('mainPage.VAT')}</Text>
                <Text>{numberFormat.format(stateCreateOrderData?.vatAmount)} ₮</Text>
              </Row>
              <Row justify="space-between" style={{ marginTop: '10px', marginLeft: '20px' }}>
                <Text> {t('mainPage.NHT')}</Text>
                <Text>{numberFormat.format(stateCreateOrderData?.cityTax)} ₮</Text>
              </Row>

              {!isEmpty(stateCreateOrderData?.charges) && (
                <>
                  {stateCreateOrderData?.charges
                    .filter((item: any) => item.state === 'A')
                    .map((val: any) => (
                      <Row justify="space-between" style={{ marginTop: '10px', marginLeft: '20px' }}>
                        <Text>{val.name}:</Text>
                        <Text>{numberFormat.format(val?.amount)} ₮</Text>
                      </Row>
                    ))}
                </>
              )}

              <Row justify="space-between" style={{ marginTop: '10px' }}>
                <Text strong>{t('mainPage.Discount')}:</Text>
                <Text>{numberFormat.format(stateCreateOrderData?.discountAmount)} ₮</Text>
              </Row>

              {!isEmpty(stateCreateOrderData?.discounts) && (
                <>
                  {stateCreateOrderData?.discounts
                    .filter((item: any) => item.state === 'A')
                    .map((val: any) => (
                      <Row justify="space-between" style={{ marginTop: '10px', marginLeft: '20px' }}>
                        <Text>{val.name}:</Text>
                        <Text>{numberFormat.format(val?.amount)} ₮</Text>
                      </Row>
                    ))}
                </>
              )}

              <Row justify="space-between" style={{ marginTop: '10px' }}>
                <Text strong>{t('mainPage.Total')}:</Text>
                <Text>{numberFormat.format(stateCreateOrderData?.grandTotal)} ₮</Text>
              </Row>

              <Row justify="space-between" style={{ marginTop: '10px' }}>
                <Text strong>{t('mainPage.AmountPaid2')}:</Text>
                <Text>{numberFormat.format(stateCreateOrderData?.paidAmount)} ₮</Text>
              </Row>

              <Row justify="space-between" style={{ marginTop: '10px' }}>
                <Text strong>{t('mainPage.AmountPaid')}:</Text>
                <Text strong>{numberFormat.format(stateCreateOrderData?.debtAmount)} ₮</Text>
              </Row>
            </div>
          )}
          <Row justify="center">
            <Image src={expandLogo} preview={false} />
          </Row>
        </Card>
      </div>
    </>
  );
}
