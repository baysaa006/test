import { Card, Row, Typography, Image, Col, Divider } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import expandLogo from '../../../../../assets/orderTypesPic/Expand.png';
import { useStoreFoods } from '../../../../../contexts/food.store';
import { CURRENCY } from '../../../../../helper/constant';
import { numberFormat } from '../../../../../helper/utils';
import { Translate } from 'react-auto-translate';

const { Text } = Typography;

export default function OrderSummary() {
  const { t, i18n } = useTranslation('language');
  const [stateExpand, setExpand] = useState(true);
  const { foods } = useStoreFoods();

  function add(accumulator: any, a: any) {
    return accumulator + a;
  }

  const onClickExpand = (boolean: any) => {
    setExpand(boolean);
  };

  let prices: number[] = foods?.map((val: any) => val.salePrice);
  let quantity: number[] = foods?.map((val: any) => val.quantity);

  const total = prices.reduce(add, 0);
  const totalQuantity = quantity.reduce(add, 0);
  return (
    <>
      <div className={styles.orderSummaryCard}>
        <Card onClick={() => onClickExpand(!stateExpand)} bodyStyle={{ padding: '3px 15px 1px' }}>
          <Row justify="center">
            <Image src={expandLogo} preview={false} />
          </Row>
          {stateExpand ? (
            <>
              <div className={styles.expandRow}>
                <Row justify="space-between">
                  <div className={styles.greyText}>
                    <Text>{t('mainPage.Products')}</Text>
                  </div>
                  <Text strong>
                    {totalQuantity} {t('mainPage.Unit')}
                  </Text>
                </Row>
              </div>
            </>
          ) : (
            <div className={styles.expand}>
              <Row className={styles.orderType} style={{ marginBottom: '10px' }}>
                <Text strong>{t('mainPage.OrderSummary')}</Text>
              </Row>

              {foods.map((item, index) => (
                <>
                  <Row key={index} justify="space-between" style={{ marginBottom: '15px' }}>
                    <Col span={15}>
                      <Text style={{ color: '#363D4E' }}>
                        <Translate>{item.name}</Translate>
                      </Text>
                    </Col>
                    <Col span={3}>
                      <Text style={{ color: '#363D4E' }}>
                        ({item.quantity}
                        {t('mainPage.Unit')})
                      </Text>
                    </Col>
                    <Col span={6} style={{ textAlign: 'end' }}>
                      <Text style={{ color: '#363D4E' }}>{numberFormat.format(item.salePrice)} ₮</Text>
                    </Col>
                  </Row>
                </>
              ))}
              <Row justify="space-between" style={{ marginTop: '10px' }}>
                <Text strong>{t('mainPage.Total')}:</Text>
                <Text strong>{numberFormat.format(total)} ₮</Text>
              </Row>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
