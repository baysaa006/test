import { List, Card, Row, Typography, Space, Rate, Image, Divider, Tag, Menu, Dropdown } from 'antd';
import React, { useEffect } from 'react';
import styles from './style.module.scss';
import noLogo from '../../assets/noReal.png';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_BRANCHES } from '../../graphql/query/branch.qeury';
import MiniSearch from 'minisearch';
import { useRestaurantSearchStore } from '../../contexts/restaurant.search.context';
import { HeartFilled, StarFilled } from '@ant-design/icons';
import { useStore, useStoreFoods } from '../../contexts/food.store';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import logoLoader from '../../assets/loader/logoLoader.gif';
const { Paragraph, Text } = Typography;

let filteredArray = [];

let resultArray: any[] = [];

export const getOpenOrClosedBranches = (nowDate: string, result: any[], open: boolean) => {
  if (open) {
    switch (nowDate) {
      case 'Sunday':
        return result.filter((arr) => arr.timetable?.sun);
      case 'Monday':
        return result.filter((arr) => arr.timetable?.mon);
      case 'Tuesday':
        return result.filter((arr) => arr.timetable?.tue);
      case 'Wednesday':
        return result.filter((arr) => arr.timetable?.wed);
      case 'Thursday':
        return result.filter((arr) => arr.timetable?.thu);
      case 'Friday':
        return result.filter((arr) => arr.timetable?.fri);
      case 'Saturday':
        return result.filter((arr) => arr.timetable?.sat);
      default:
        return result;
    }
  } else {
    switch (nowDate) {
      case 'Sunday':
        return result.filter((arr) => !arr.timetable?.sun);
      case 'Monday':
        return result.filter((arr) => !arr.timetable?.mon);
      case 'Tuesday':
        return result.filter((arr) => !arr.timetable?.tue);
      case 'Wednesday':
        return result.filter((arr) => !arr.timetable?.wed);
      case 'Thursday':
        return result.filter((arr) => !arr.timetable?.thu);
      case 'Friday':
        return result.filter((arr) => !arr.timetable?.fri);
      case 'Saturday':
        return result.filter((arr) => !arr.timetable?.sat);
      default:
        return result;
    }
  }
};

export default function CardList() {
  const router = useRouter();

  const { t, i18n } = useTranslation('language');

  const { editFoods, setCreateOrderID } = useStoreFoods();
  const { addAFish } = useStore();
  const { loading, error, data } = useQuery(GET_BRANCHES);
  const { searchFields, filter } = useRestaurantSearchStore();
  var date2 = new Date();
  const dateTime = moment(date2).format('dddd');

  useEffect(() => {
    if (loading === false) {
      if (data) {
        const branches = data.getParticipantBuyers.map((p: any) => p.branch);
        resultArray.push(...branches);
      }
    }
  }, [data, loading]);

  let miniSearch = new MiniSearch({
    fields: ['name', 'description', 'type'], // fields to index for full-text search
    storeFields: ['name', 'logo', 'address', 'timetable', 'services'], // fields to return with search results
  });

  miniSearch.addAll(resultArray);

  const getFilteredArray = (nowDate: string, result: any[]) => {
    switch (filter.type) {
      case 'restaurant':
        return result.filter((arr) => arr.type === filter.text);
      case 'active':
        if (filter.text === 'open') {
          return getOpenOrClosedBranches(nowDate, result, true);
        } else {
          return getOpenOrClosedBranches(nowDate, result, false);
        }
      case 'delivery':
        switch (filter.text) {
          case 'yes':
            return result.filter((arr) => arr.services.includes('Delivery'));
          case 'no':
            return result.filter((arr) => !arr.services.includes('Delivery'));
          default:
            result;
        }
        return result.filter((arr) => arr.type);
      default:
        return result;
    }
  };

  const convertOpenClose = (nowDate: any, booleanType: any) => {
    switch (nowDate) {
      case 'Sunday':
        return (
          <>
            {booleanType?.sun ? (
              <Tag color="#87d068">{t('mainPage.Open')}</Tag>
            ) : (
              <Tag color="#f50">{t('mainPage.Closed')}</Tag>
            )}
          </>
        );
      case 'Monday':
        return (
          <>
            {booleanType?.mon ? (
              <Tag color="#87d068">{t('mainPage.Open')}</Tag>
            ) : (
              <Tag color="#f50">{t('mainPage.Closed')}</Tag>
            )}
          </>
        );
      case 'Tuesday':
        return (
          <>
            {booleanType?.tue ? (
              <Tag color="#87d068">{t('mainPage.Open')}</Tag>
            ) : (
              <Tag color="#f50">{t('mainPage.Closed')}</Tag>
            )}
          </>
        );
      case 'Wednesday':
        return (
          <>
            {booleanType?.wed ? (
              <Tag color="#87d068">{t('mainPage.Open')}</Tag>
            ) : (
              <Tag color="#f50">{t('mainPage.Closed')}</Tag>
            )}
          </>
        );
      case 'Thursday':
        return (
          <>
            {booleanType?.thu ? (
              <Tag color="#87d068">{t('mainPage.Open')}</Tag>
            ) : (
              <Tag color="#f50">{t('mainPage.Closed')}</Tag>
            )}
          </>
        );
      case 'Friday':
        return (
          <>
            {booleanType?.fri ? (
              <Tag color="#87d068">{t('mainPage.Open')}</Tag>
            ) : (
              <Tag color="#f50">{t('mainPage.Closed')}</Tag>
            )}
          </>
        );
      case 'Saturday':
        return (
          <>
            {booleanType?.sat ? (
              <Tag color="#87d068">{t('mainPage.Open')}</Tag>
            ) : (
              <Tag color="#f50">{t('mainPage.Closed')}</Tag>
            )}
          </>
        );
      default:
        return nowDate;
    }
  };

  const cardCoverCard = (item: any) => (
    <div className={styles.cardTags}>
      <div className={styles.cardStatusTag}>{convertOpenClose(dateTime, item.timetable)}</div>

      <Rate character={<HeartFilled />} count={1} />
      <div className={styles.cardKmNumber}>
        <Card bodyStyle={{ padding: '0px 0px 0px 0px' }}>
          {isEmpty(item.logo) ? (
            <img src={noLogo} height={100} />
          ) : (
            <Image preview={false} fallback={noLogo} src={item.logo} alt="no logo"></Image>
          )}
          <Row justify="space-between" className={styles.cardTagDiv}>
            {/* <Tag color="#D92663"> 20% off</Tag> */}
            {/* <Tag color="rgb(250 250 250 / 82%)" style={{ color: 'black' }}>
              1.2km
            </Tag> */}
          </Row>
        </Card>
      </div>
    </div>
  );

  const fullwidth = global.window?.innerWidth;

  const menu = (e: any) => (
    <Menu>
      <Menu.Item>{e}</Menu.Item>
    </Menu>
  );

  const handleRestaurant = (key: any) => {
    data.getParticipantBuyers.forEach((element: any, index: any) => {
      if (element.branch.id === key) {
        router.push(`/restaurant?id=${element.id}`);
        editFoods([]);
        addAFish(0);
        setCreateOrderID('');
      }
    });
  };

  const loaderRestaurant = (
    <>
      <Row justify="center">
        <Image src={logoLoader} alt="loader" height={50} width={50} preview={false} />
      </Row>
    </>
  );

  const onChangePagination = () => {
    window.scrollTo({
      top: 500,
      behavior: 'smooth',
    });
  };

  const getServices = (service: string) => {
    switch (service) {
      case 'Dining':
        return (
          <Dropdown overlay={menu(`${t('mainPage.TableReservation')}`)} placement="topLeft">
            <div className="post-time">
              <i className="icon-food"></i>
            </div>
          </Dropdown>
        );
      case 'PreOrder':
        return (
          <Dropdown overlay={menu(`${t('mainPage.PreOrder')}`)} placement="topLeft">
            <div className="post-time" style={{ marginLeft: '5px' }}>
              <i className="icon-clock4"></i>
            </div>
          </Dropdown>
        );
      case 'TakeAway':
        return (
          <Dropdown overlay={menu(`${t('mainPage.GoAndGetIt')}`)} placement="topLeft">
            <div className="post-time" style={{ marginLeft: '5px' }}>
              <i className="icon-shopping-bag"></i>
            </div>
          </Dropdown>
        );
      case 'Delivery':
        return (
          <Dropdown overlay={menu(`${t('mainPage.Delivery')}`)} placement="topLeft">
            <div className="post-time" style={{ marginLeft: '5px' }}>
              <i className="icon-motorcycle"></i>
            </div>
          </Dropdown>
        );
    }
  };

  return (
    <>
      <List
        grid={{
          gutter: 15,
          xs: 2,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 4,
        }}
        dataSource={
          isEmpty(searchFields)
            ? getFilteredArray(
                dateTime,
                data?.getParticipantBuyers.map((p: any) => p.branch).sort((a: any, b: any) => 0.5 - Math.random()),
              )
            : miniSearch.search(searchFields, { prefix: true, boost: { name: 1 }, fuzzy: 0.2 })
        }
        locale={{ emptyText: loaderRestaurant }}
        className={styles.listItem}
        pagination={{
          pageSize: 20,
          showLessItems: true,
          responsive: true,
          onChange: onChangePagination,
        }}
        renderItem={(item: any) => (
          <List.Item onClick={() => handleRestaurant(item.id)}>
            <Card cover={cardCoverCard(item)} className={styles.cardDiv} hoverable>
              <Paragraph
                ellipsis={fullwidth > 752 ? true : { rows: 2 }}
                style={
                  fullwidth > 752
                    ? {
                        fontSize: '1.9rem',
                        margin: '0px 0px 6px 0px ',
                        fontWeight: '400px',
                      }
                    : {
                        fontSize: '17px',
                        textAlign: 'center',
                        margin: '0px 0px 0px 0px',
                        height: '40px',
                        fontWeight: '400px',
                        lineHeight: '18px',
                      }
                }
              >
                {item.name}
              </Paragraph>
              <Space size={9} wrap className={styles.rankSpace} style={{ placeContent: 'center' }}>
                <div className={styles.rankStyling}>
                  <Space className={styles.rankText} size={3}>
                    <Text>1.2</Text>
                    <StarFilled />
                  </Space>
                  <Text style={{ marginLeft: '3px' }}>(14)</Text>
                </div>
                <Divider style={{ margin: '0px 0px 0px 0px' }} type="vertical" />
                <Paragraph ellipsis style={{ margin: '0px 0px 0px 0px ' }}>
                  {item.type}
                </Paragraph>
              </Space>
              <Paragraph
                ellipsis={{ rows: 2 }}
                style={{
                  fontSize: '14px',
                  margin: '10px 0px 0px 0px ',
                  height: '48px',
                }}
              >
                <span>{item.description} </span>
              </Paragraph>
              <div className="listing simple">
                <div className="text-holder">
                  <div className="delivery-potions">
                    {item.services?.map((service: string) => getServices(service))}
                  </div>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
