import React, { useEffect } from 'react';
import styles from './style.module.scss';
import singleRestBanner from '../assets/extra-images/cover-photo01.jpg';
import { Col, Input, Row, Space, Tooltip, Typography } from 'antd';
import isEmpty from 'lodash';
import { FieldTimeOutlined, SearchOutlined } from '@ant-design/icons';
import Banner from './component/banner';
export default function SingleRestaurantBanner(props: any) {
  const { restaurantInfo, loading } = props;
  const { Text } = Typography;
  useEffect(() => {
    if (isEmpty(restaurantInfo)) {
      return;
    }
    restaurantInfo;
  }, [restaurantInfo]);

  return (
    <Banner stateOnfocus={false} restaurantInfo={restaurantInfo} loading={loading} bannerImgUrl={singleRestBanner} />
  );
}
