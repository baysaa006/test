import { Card, Carousel, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import kds1 from '../../assets/advertisement/kds1.png';
import kds2 from '../../assets/advertisement/kds2.png';
import styles from './style.module.scss';

const { Text } = Typography;
export default function KdsCard() {
  const { t, i18n } = useTranslation('language');
  return (
    <>
      <Card className={styles.kdsCard} title={<Text>{t('mainPage.KDS')}</Text>}>
        <Carousel autoplay>
          <div>
            <img src={kds1} width="100%" />
          </div>
          <div>
            <img src={kds2} width="100%" />
          </div>
        </Carousel>
      </Card>
    </>
  );
}
