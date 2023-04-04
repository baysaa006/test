import { Button, Carousel, Col, Image, Row, Space, Typography } from 'antd';
import one from '../../assets/userPic/1.png';
import two from '../../assets/userPic/2.png';
import three from '../../assets/userPic/3.png';
import styles from './style.module.scss';

import React from 'react';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

export default function UseCarousel() {
  const { t, i18n } = useTranslation('language');
  return (
    <>
      <div className={styles.carouselStyling}>
        <Carousel autoplay>
          <div>
            <Image src={one} width="90%" height={250} preview={false} />
            <Row justify="center" className={styles.title}>
              <Text strong>{t('mainPage.digtalMenu')}</Text>
            </Row>
            <Row justify="center" className={styles.description}>
              <Col span={20} style={{ textAlign: 'center' }}>
                <Text>{t('mainPage.loginCarousel1')}</Text>
              </Col>
            </Row>
          </div>

          <div>
            <Image src={two} width="100%" height={250} preview={false} />
            <Row justify="center" className={styles.title}>
              <Text strong>{t('mainPage.FastDelivery')} </Text>
            </Row>
            <Row justify="center" className={styles.description}>
              <Col span={20} style={{ textAlign: 'center' }}>
                <Text>{t('mainPage.loginCarousel2')}</Text>
              </Col>
            </Row>
          </div>

          <div>
            <Image src={three} width="100%" height={250} preview={false} />
            <Row justify="center" className={styles.title}>
              <Text strong>{t('mainPage.PreOrder')}</Text>
            </Row>
            <Row justify="center" className={styles.description}>
              <Col span={20} style={{ textAlign: 'center' }}>
                <Text>{t('mainPage.loginCarousel3')}</Text>
              </Col>
            </Row>
          </div>
        </Carousel>
      </div>
    </>
  );
}
