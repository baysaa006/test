import { isEmpty } from 'lodash';
import React from 'react';
import Banner from '../../components/singleRestaurantBanner/component/banner';
import banner from '../assets/images/karaokeNew.jpg';

export default function KaraokeBanner(props: any) {
  const { branchData, stateOnfocus } = props;
  return (
    <>
      <Banner stateOnfocus={stateOnfocus} restaurantInfo={branchData} bannerImgUrl={banner} IsSearchShow />{' '}
    </>
  );
}
