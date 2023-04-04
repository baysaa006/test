import React, { useEffect, useState } from 'react';
import styles from '../style.module.scss';
import { Col, Row, Select, Space, Typography } from 'antd';
import {
  ArrowRightOutlined,
  FieldTimeOutlined,
  LikeFilled,
  LikeOutlined,
  SearchOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useSearchStore } from '../../../contexts/search.context';
import MiniSearch from 'minisearch';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import AboutRestaurantModal from '../../aboutRestaurant/aboutRestaurant';
import { useLazyQuery } from '@apollo/client';
import { GET_ORDER_REVIEWS } from '../../../graphql/query/order.qeury';

let filteredArray = [];

let resultArray: any[] = [];

export default function Banner(props: any) {
  const { restaurantInfo, bannerImgUrl, IsSearchShow, loading, stateOnfocus } = props;
  const { Text } = Typography;
  const { Option } = Select;
  const [orderReviews, setOrderReviews] = useState<any>();
  const [stateVisible, setVisible] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const { setFeilds } = useSearchStore();
  const [stateValue, setValue] = useState('');
  const { t, i18n } = useTranslation('language');
  // const [getOrderReviews] = useLazyQuery(GET_ORDER_REVIEWS, {
  //   // variables:{offset:0, limit:10},
  //   onCompleted: (data: any) => {
  //     setOrderReviews(data.getOrderReviewsByLimit);
  //   },
  // });
  useEffect(() => {
    if (loading === false) {
      if (restaurantInfo) {
        filteredArray = restaurantInfo.menu.categories;
        filteredArray.map((items: any) => {
          if (!isEmpty(items.children)) {
            items.children.map((value: any) => resultArray.push(...value.products));
          }
          resultArray.push(...items.products);
        });
      }
    }
  }, [restaurantInfo, loading, stateValue]);

  let miniSearch = new MiniSearch({
    fields: ['name', 'description'], // fields to index for full-text search
    storeFields: ['name', 'specification', 'image', 'variants'], // fields to return with search results
  });

  miniSearch.addAll(resultArray);

  let results = miniSearch.autoSuggest(stateValue, { prefix: true, boost: { name: 2 }, fuzzy: 0.2 });
  // function reviewPrecentage() {
  //   if (orderReviews?.length == 0) return '';
  //   let count = orderReviews?.filter((x: any) => x.liked === 1).length;
  //   let percentage = (count / orderReviews?.length) * 100;
  //   if (percentage === 0) return '';
  //   return (
  //     <span>
  //       {Math.floor(percentage) + '%'} ({orderReviews?.length})
  //     </span>
  //   );
  // }

  const onSearch = (e: any) => {
    setValue(e);
  };

  const inputKey = (e: any) => {
    if (e.code === 'Enter') {
      if (!isEmpty(results)) {
        setFeilds(e.currentTarget.value);
      }
    }
  };

  const onSelect = (e: any) => {
    setFeilds(e);
  };

  const onClear = () => {
    setFeilds('');
  };
  const emptyText = (
    <>
      <Row justify="center" className={styles.searchNoIconDiv}>
        <Space direction="vertical">
          <Text strong>Үр дүн олдсонгүй...</Text>
        </Space>
      </Row>
    </>
  );

  const placeholder = (
    <>
      <Space className={styles.placeHolder}>
        <SearchOutlined />
        <Text>{t('mainPage.WhatDoYouWantToEat')}...</Text>
      </Space>
    </>
  );

  var date2 = new Date();
  const dateTime = moment(date2).format('dddd');

  const getTimeForm = (props: string) => {
    if (!props) return <>{moment('12:00', 'h:mm a').format('h:mm a')}</>;
    return <>{moment(props, 'h:mm a').format('h:mm a')}</>;
  };

  const convertWeeks = (type: any) => {
    switch (type) {
      case 'Sunday':
        return (
          <span className="reviews">
            {t('mainPage.Sunday')} ({getTimeForm(restaurantInfo?.branch?.timetable?.sunOpen)} -
            {getTimeForm(restaurantInfo?.branch?.timetable?.sunClose)})
          </span>
        );
      case 'Monday':
        return (
          <span className="reviews">
            {t('mainPage.Monday')} ({getTimeForm(restaurantInfo?.branch?.timetable?.monOpen)} -
            {getTimeForm(restaurantInfo?.branch?.timetable?.monClose)})
          </span>
        );
      case 'Tuesday':
        return (
          <span className="reviews">
            {t('mainPage.Tuesday')} ({getTimeForm(restaurantInfo?.branch?.timetable?.tueOpen)} -
            {getTimeForm(restaurantInfo?.branch?.timetable?.tueClose)})
          </span>
        );
      case 'Wednesday':
        return (
          <span className="reviews">
            {t('mainPage.Wednesday')} ({getTimeForm(restaurantInfo?.branch?.timetable?.wedOpen)} -
            {getTimeForm(restaurantInfo?.branch?.timetable?.wedClose)})
          </span>
        );
      case 'Thursday':
        return (
          <span className="reviews">
            {t('mainPage.Thursday')} ({getTimeForm(restaurantInfo?.branch?.timetable?.thuOpen)} -
            {getTimeForm(restaurantInfo?.branch?.timetable?.thuClose)})
          </span>
        );
      case 'Friday':
        return (
          <span className="reviews">
            {t('mainPage.Friday')} ({getTimeForm(restaurantInfo?.branch?.timetable?.friOpen)} -
            {getTimeForm(restaurantInfo?.branch?.timetable?.friClose)})
          </span>
        );
      case 'Saturday':
        return (
          <span className="reviews">
            {t('mainPage.Saturday')} ({getTimeForm(restaurantInfo?.branch?.timetable?.satOpen)} -
            {getTimeForm(restaurantInfo?.branch?.timetable?.satClose)})
          </span>
        );
      default:
        return type;
    }
  };
  return (
    <>
      <div
        className="page-section restaurant-detail-image-section"
        style={
          stateOnfocus
            ? {
                background: `url(${
                  isEmpty(restaurantInfo?.branch?.banner) ? bannerImgUrl : restaurantInfo?.branch?.banner
                }) no-repeat scroll 0 0 / cover`,
                height: 10,
                backgroundPosition: 'center',
                padding: 25,
                scrollBehavior: 'smooth',
                overscrollBehaviorBlock: 'inherit',
              }
            : {
                background: `url(${
                  isEmpty(restaurantInfo?.branch?.banner) ? bannerImgUrl : restaurantInfo?.branch?.banner
                }) no-repeat scroll 0 0 / cover`,
                height: 10,
                backgroundPosition: 'center',
                scrollBehavior: 'smooth',
                overscrollBehaviorBlock: 'inherit',
              }
        }
      >
        {restaurantInfo?.buyer?.logo && (
          <div className={styles.logoHolder}>
            <div className="company-info-detail">
              <div className="company-info">
                <div className="img-holder">
                  <figure>
                    <img src={restaurantInfo?.buyer?.logo} alt="" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        )}

        {stateOnfocus === false && (
          <div className="container" style={{ position: 'absolute', top: 50, width: '100%' }}>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="company-info-detail">
                  <div className="company-info">
                    <div className="img-holder">
                      <figure>
                        <img src={restaurantInfo?.branch?.logo} alt="" />
                      </figure>
                    </div>
                    <div className="text-holder">
                      <span className="restaurant-title">{restaurantInfo?.branch?.name}</span>
                      <span className="reviews">{restaurantInfo?.branch?.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {restaurantInfo && (
          <AboutRestaurantModal
            orderReviews={orderReviews}
            visible={stateVisible}
            modalConfirm={modalConfirm}
            setModalConfirm={setModalConfirm}
            setIsModalVisible={setVisible}
            isClassComponent={false}
            isKey={2}
          />
        )}
      </div>
    </>
  );
}
