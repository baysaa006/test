import { Col, Row, Typography } from 'antd';
import React from 'react';
import styles from './style.module.scss';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import FoodCards from '../foodCard/FoodCards';
import logo from '../assets/extra-images/cover-photo20-359x212.jpg';
import logo1 from '../assets/extra-images/cover-photo17-359x212.jpg';
import logo2 from '../assets/extra-images/cover-photo18-1-1-359x212.jpg';
import logo3 from '../assets/extra-images/cover-photo19-359x212.jpg';

export default function SpecialOrderFood() {
  const speaCialsFoods = [
    {
      title: 'Цуйван',
      itemCategorys: 'Мах, Гурил, Сонгино,Төмс, Байцаа, Лууван',
      price: 1500,
      img: logo,
    },
    {
      title: 'Хуурга',
      itemCategorys: 'Мах, Гурил, Сонгино,Төмс, Байцаа, Лууван',
      price: 1200,
      img: logo1,
    },
    {
      title: 'BBQ',
      itemCategorys: 'Мах, Гурил, Сонгино,Төмс, Байцаа, Лууван',
      price: 1200,
      img: logo2,
    },
    {
      title: 'Mexican',
      itemCategorys: 'Мах, Гурил, Сонгино,Төмс, Байцаа, Лууван',
      price: 1200,
      img: logo3,
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1300 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1300, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <Row justify="center" className={styles.specialOrderFood}>
        <Col xs={21} sm={21} md={21} lg={17} xl={17} xxl={17}>
          <Typography.Text strong>Хамгийн их захиалсан хоолууд:</Typography.Text>
          <Carousel
            swipeable={true}
            ssr={false}
            arrows
            autoPlay
            itemClass="item-class"
            autoPlaySpeed={3000}
            responsive={responsive}
            slidesToSlide={1}
          >
            {speaCialsFoods.map((item, key) => {
              return <FoodCards key={key} itemData={item} />;
            })}
          </Carousel>
        </Col>
      </Row>
    </>
  );
}
