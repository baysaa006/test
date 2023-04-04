import { CloseOutlined } from '@ant-design/icons';
import { Carousel, Col, Divider, Row, Image, Button, Typography } from 'antd';
import React from 'react';
import restPic from '../../../assets/images/asiana.png';
import RestaurantNews from '../../restaurantNews/restaurantNews';
const { Text } = Typography;

export default function RestarantInfo(props: any) {
  const { onClose, restarantInfoData, orderReviews } = props;

  return (
    <>
      {restarantInfoData && (
        <RestaurantNews orderReviews={orderReviews} onClose={onClose} branchData={restarantInfoData} />
      )}
    </>
  );
}
