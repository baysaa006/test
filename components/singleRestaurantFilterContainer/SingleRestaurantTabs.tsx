/* eslint-disable @next/next/no-img-element */
import {
  CommentOutlined,
  InfoCircleOutlined,
  IssuesCloseOutlined,
  MenuOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import { List, Tabs, Row, Col, Image, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import OrderFoodCard from '../foodCard/OrderFoodCard';
import styles from './style.module.scss';
import { isEmpty } from 'lodash';
import CardSkelton from '../cardSkelton/CardSkelton';
import emptyLogo from '../../assets/emptyCards.png';
import Feedback from '../aboutRestaurant/component/Feedback';
import MiniSearch from 'minisearch';
import { useSearchStore } from '../../contexts/search.context';
import RestaurantNews from '../restaurantNews/restaurantNews';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../../contexts/cart.store';
import carouselPic3 from './assets/Colaneg.jpg';
import carouselPic4 from './assets/d2.jpg';
import pic1 from './assets/coca.jpg';
import pic2 from './assets/2pic.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useRouter } from 'next/router';

let filteredArray = [];

let resultArray: any[] = [];

const { Text } = Typography;
export default function SingleRestaurantTabs(props: any) {
  const { t, i18n } = useTranslation('language');
  const router = useRouter();
  const { id } = router.query;
  const { catchId, data, loading, branchData } = props;
  const { subCategoryId } = useCartStore();
  const { TabPane } = Tabs;
  const [stateList, setStateList] = useState<any>([]);
  const { searchFields } = useSearchStore();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      paritialVisibilityGutter: 60,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30,
      slidesToSlide: 1,
    },
  };

  const images = [pic1, pic2];
  const smallCarousel = [carouselPic3, carouselPic4];

  useEffect(() => {
    if (isEmpty(branchData?.menu?.categories?.find((val: any) => val?.id === catchId)?.children)) {
      if (data) {
        if (catchId) {
          const listData = data.filter((element: { id: any }) => element?.id === catchId) || [];
          if (!isEmpty(listData)) {
            setStateList(listData[0]?.products);
          }
        }
      }
    } else {
      if (subCategoryId) {
        const listData =
          branchData?.menu?.categories
            ?.find((val: any) => val?.id === catchId)
            ?.children.filter((element: { id: any }) => element?.id === subCategoryId) || [];
        if (!isEmpty(listData)) {
          setStateList(listData[0]?.products);
        }
      }
    }
  }, [catchId, subCategoryId]);

  useEffect(() => {
    if (loading === false) {
      if (branchData) {
        filteredArray = branchData?.menu?.categories;
        branchData.menu?.categories.forEach((val: any, index: any) => {
          if (!isEmpty(val.children)) {
            val.children.map((value: any) => resultArray.push(...value?.products));
          }
          resultArray.push(...val?.products);
        });
      }
    }
  }, [branchData, loading]);

  let miniSearch = new MiniSearch({
    fields: ['name', 'description'], // fields to index for full-text search
    storeFields: ['name', 'specification', 'image', 'variants'], // fields to return with search results
  });

  miniSearch.addAll(resultArray);

  let results = miniSearch.search(searchFields, { prefix: true, boost: { name: 2 }, fuzzy: 0.2 });

  const emptysLoading = (
    <>
      <CardSkelton />
    </>
  );

  const empty = (
    <div className={styles.noDataImage}>
      <Image src={emptyLogo} alt="lgo" preview={false} />
    </div>
  );
  return (
    <div className={styles.singleRestaurantTabs}>
      <Tabs type="card">
        <TabPane
          tab={
            <span>
              <MenuOutlined />
              {t('mainPage.Menu')}
            </span>
          }
          key="1"
        >
          {isEmpty(data) ? (
            <>{emptysLoading}</>
          ) : (
            <>
              <List
                className={styles.list}
                dataSource={stateList}
                locale={{ emptyText: empty }}
                renderItem={(item: any, index) => (
                  <>
                    <List.Item key={item.sort}>
                      <OrderFoodCard key={index} keys={index} items={item} />
                    </List.Item>
                    {id === '45206405-b09b-4eb3-a1d3-d026d96f3180' && (
                      <>
                        d
                        {index === 1 && (
                          <Row className={styles.carouselSpace}>
                            <div className={styles.smallCarousel}>
                              <Carousel infinite ssr arrows autoPlay itemClass="image-item" responsive={responsive}>
                                {smallCarousel.map((image) => {
                                  return <Image preview={false} src={image} />;
                                })}
                              </Carousel>
                            </div>
                          </Row>
                        )}
                      </>
                    )}
                  </>
                )}
              />
              <>
                {/* <div className={styles.webCard}>
                  <Col>
                    {isEmpty(searchFields)
                      ? stateList.map((item: any, index: any) => {
                          return (
                            <Col className={styles.shopCardDiv} xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                              <OrderFoodCard key={index} isList={1} keys={index} items={item} />
                            </Col>
                          );
                        })
                      : results.map((item: any, index: any) => {
                          return (
                            <Col className={styles.shopCardDiv} xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                              <OrderFoodCard key={index} isList={1} keys={index} items={item} />
                            </Col>
                          );
                        })}
                  </Col>
                </div> */}
              </>
              {/* {id === '45206405-b09b-4eb3-a1d3-d026d96f3180' && (
                <>
                  <div className={styles.bigCarousel}>
                    <div className={styles.restaurantCarousel}>
                      <Carousel infinite ssr arrows autoPlay itemClass="image-item" responsive={responsive}>
                        {images.map((image) => {
                          return <Image preview={false} src={image} />;
                        })}
                      </Carousel>
                    </div>
                  </div>
                  <br />
                </>
              )} */}
            </>
          )}
        </TabPane>
        <TabPane
          tab={
            <span>
              <InfoCircleOutlined />
              {t(`mainPage.${branchData?.branch.type}Information`)}
            </span>
          }
          key="3"
        >
          {branchData && <RestaurantNews branchData={branchData} />}
        </TabPane>
        <TabPane
          tab={
            <span>
              <CommentOutlined />
              {t('mainPage.Feedback')}
            </span>
          }
          key="4"
        >
          <Feedback closeIcon feedBackData={branchData?.branch} />
        </TabPane>
      </Tabs>
    </div>
  );
}
