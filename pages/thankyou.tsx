import { useQuery } from '@apollo/client';
import { Button, Result, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore, useStoreFoods } from '../contexts/food.store';
import { GET_ORDER } from '../graphql/query/order.qeury';
import styles from './layout/style.module.scss';

const { Text } = Typography;

export default function TankYou() {
  const { t } = useTranslation('language');
  const router = useRouter();
  const { id } = router.query;
  const { participant, editFoods, setCreateOrderID } = useStoreFoods();
  const { addAFish, setCompleteOrderID } = useStore();

  const goBack = () => {
    editFoods([]);
    addAFish(0);
    setCreateOrderID('');
    router.push(`restaurant?id=${participant?.id}`);
  };

  const { data, loading, error } = useQuery(GET_ORDER, { skip: !id, variables: { id: id } });

  const successTitle = (
    <>
      <Row justify="center" className={styles.successTitle}>
        <Text>{t('mainPage.YourOrderSuccess')} </Text>
      </Row>
      <Row className={styles.successTitle} justify="center">
        <Text>{t('mainPage.YourOrderNumber')}: </Text>
        <Text style={{ color: '#007BFF', marginLeft: 10 }} strong>
          {data && data.getOrder?.number.slice(-4)}
        </Text>
      </Row>
    </>
  );

  return (
    <>
      <div className={styles.thankyou}>
        <Result
          status="success"
          style={{ padding: '10px 32px 15px 32px' }}
          title={successTitle}
          extra={
            <Button
              style={{
                background: '#007BFF',
                borderColor: '#007BFF;',
                color: 'white',
                borderRadius: '10px',
                width: '100%',
                height: '40px',
              }}
              onClick={goBack}
            >
              {t('mainPage.GoBack')}
            </Button>
          }
        />
      </div>
    </>
  );
}
