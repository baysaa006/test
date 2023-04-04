import { Card, Carousel } from 'antd';
import React from 'react';
import styles from './style.module.scss';
import cola from '../../assets/advertisement/Coca-cola.jpg';

export default function AdvertisementCard() {
  return (
    <>
      <Card className={styles.advertisementCard}>
        <Carousel autoplay>
          <div>
            <img src={cola} width="100%" />
          </div>
        </Carousel>
      </Card>
    </>
  );
}
