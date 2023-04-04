/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
import { Col, Image, Row, Space, Typography } from 'antd';
import React from 'react';
import item from '../assets/extra-images/fb-restaurant-01.jpg';
import item1 from '../assets/extra-images/fb-restaurant-02.jpg';
import item2 from '../assets/extra-images/fb-restaurant-06.jpg';
import item3 from '../assets/extra-images/fb-restaurant-11.png';
import item4 from '../assets/extra-images/fb-restaurant-12.png';
import item5 from '../assets/extra-images/fb-restaurant-13.png';
import item6 from '../assets/extra-images/fb-restaurant-15.png';
import item7 from '../assets/extra-images/fb-restaurant-17.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './style.module.scss';

export default function RestaurantCarousel() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      paritialVisibilityGutter: 30,
    },
  };

  const images = [item, item1, item2, item3, item4, item5, item6, item7];

  return (
    <Row justify="center" className={styles.restaurantCarousel}>
      <Col xs={21} sm={21} md={22} lg={17} xl={17} xxl={17}>
        <Typography.Text strong>Санал болгох ресторан:</Typography.Text>
        <br />
        <br />
        <div className={styles.restaurantCarouselDiv}>
          <Carousel ssr arrows itemClass="image-item" responsive={responsive}>
            {images.map((image) => {
              return <Image preview={false} src={image} />;
            })}
          </Carousel>
        </div>
      </Col>
    </Row>
  );
}
