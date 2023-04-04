import { PlusOutlined } from '@ant-design/icons';
import { Button, List, Row, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreFoods } from '../../../../contexts/food.store';
import FoodMediumCard from '../../../foodCard/FoodMediumCard';
import styles from './style.module.scss';

const { Text } = Typography;

export default function DraftOrder(props: any) {
  const { onClose } = props;
  const { t, i18n } = useTranslation('language');
  const { foods } = useStoreFoods();

  return (
    <>
      <Row justify="end" className={styles.draftHeaderRow}>
        {/* <Text className={styles.yourOrderText} strong>
          {t('mainPage.NewOrder')}
        </Text> */}
        <div className={styles.draftMoreOrder}>
          <Button onClick={onClose} type="text" icon={<PlusOutlined />}>
            <Text strong> {t('mainPage.OrderMore')}</Text>
          </Button>
        </div>
      </Row>
      {foods.length === 0 ? (
        <></>
      ) : (
        <>
          <List
            className={styles.foodMediumCard}
            itemLayout="vertical"
            dataSource={foods}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 1,
              xxl: 1,
            }}
            renderItem={(item, index) => (
              <List.Item>
                <FoodMediumCard key={index} keys={item.uuid} items={item} />
              </List.Item>
            )}
          />
        </>
      )}
    </>
  );
}
