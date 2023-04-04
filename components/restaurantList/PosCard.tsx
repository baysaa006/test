import { Card, Carousel, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import pos from '../../assets/advertisement/pos.png';
import pos1 from '../../assets/advertisement/pos1.png';
import pos2 from '../../assets/advertisement/pos2.png';
import pos3 from '../../assets/advertisement/pos3.png';
import pos4 from '../../assets/advertisement/pos4.png';
import styles from './style.module.scss';

const { Text } = Typography;
export default function PosCard() {
  const { t, i18n } = useTranslation('language');
  return (
    <>
      <Card className={styles.kdsCard} title={<Text>{t('mainPage.PosScreen')}</Text>} style={{ height: '290px' }}>
        <Carousel autoplay>
          <div>
            <img src={pos1} width="100%" height={180} />
          </div>
          <div>
            <img src={pos} width="100%" height={180} />
          </div>
          <div>
            <img src={pos2} width="100%" height={180} />
          </div>
          <div>
            <img src={pos3} width="100%" height={180} />
          </div>
          <div>
            <img src={pos4} width="100%" height={180} />
          </div>
        </Carousel>
      </Card>
    </>
  );
}
