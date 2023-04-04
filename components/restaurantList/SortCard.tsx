import {
  LikeOutlined,
  StarOutlined,
  SortAscendingOutlined,
  FallOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Card, Typography, Button, Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
const { Text } = Typography;

export default function SortCard() {
  const { t, i18n } = useTranslation('language');

  return (
    <>
      <Card className={styles.sortCard} title={<Text> {t('mainPage.SORT')} </Text>}>
        <Space size={0} direction="vertical">
          <Button type="text" icon={<LikeOutlined />}>
            {t('mainPage.ILikedItTheMost')}
          </Button>
          <Button type="text" icon={<SortAscendingOutlined />}>
            {t('mainPage.InAlphabeticalOrder')}
          </Button>
          <Button type="text" icon={<StarOutlined />}>
            {t('mainPage.ByEvaluation')}
          </Button>
          <Button type="text" icon={<FallOutlined />}>
            {t('mainPage.TheCheapest')}
          </Button>
          <Button type="text" icon={<ShoppingCartOutlined />}>
            {t('mainPage.AtTheDeliveryPrice')}
          </Button>
        </Space>
      </Card>
    </>
  );
}
