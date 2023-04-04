import { Card, Carousel, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import karaoke1 from '../../assets/advertisement/karaoke1.png';
import karaoke2 from '../../assets/advertisement/karaoke2.png';
import styles from './style.module.scss';

const { Text } = Typography;
export default function KaraokeCard() {
  const { t, i18n } = useTranslation('language');
  return (
    <>
      <Card className={styles.kdsCard} title={<Text>{t('mainPage.KaraokeScreen')}</Text>}>
        <Carousel autoplay>
          <div>
            <img src={karaoke1} width="100%" />
          </div>
          <div>
            <img src={karaoke2} width="100%" />
          </div>
        </Carousel>
      </Card>
    </>
  );
}
