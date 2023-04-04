/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './style.module.scss';
import { Carousel } from 'antd';
import SearchContent from './SearchContent';
import party from './assets/images/party.jpg';
import dinnertable2 from './assets/images/dinnertable2.jpg';
import dinnertable1 from './assets/images/dinnertable1.jpg';
import karoake1 from './assets/images/karoake1.jpg';
import karoake2 from './assets/images/karoake2.jpg';

export default function BigCarousel() {
  return (
    <>
      <Carousel effect="fade" autoplay dots={false}>
        <div>
          <img src={dinnertable1} alt="1" className={styles.bigCarousel} />
        </div>
        <div>
          <img src={karoake1} alt="2" className={styles.bigCarousel} />
        </div>
        <div>
          <img src={party} alt="3" className={styles.bigCarousel} />
        </div>
        <div>
          <img src={dinnertable2} alt="4" className={styles.bigCarousel} />
        </div>
        <div>
          <img src={karoake2} alt="5" className={styles.bigCarousel} />
        </div>
      </Carousel>
      <SearchContent />
    </>
  );
}
