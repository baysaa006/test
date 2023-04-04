import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRestaurantSearchStore } from '../../contexts/restaurant.search.context';
import styles from './style.module.scss';
import downArrow from '../../assets/downArrow.svg';
import { Image } from 'antd';
import { GET_BRANCHES } from '../../graphql/query/branch.qeury';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { getOpenOrClosedBranches } from './CardList';
import MiniSearch from 'minisearch';
import isEmpty from 'lodash';

let resultArray: any[] = [];

export default function FilterList() {
  const { t, i18n } = useTranslation('language');
  const { loading, error, data } = useQuery(GET_BRANCHES);
  var date2 = new Date();
  const dateTime = moment(date2).format('dddd');
  const { setFilter, filter, setFeilds, searchFields } = useRestaurantSearchStore();
  const [openOrClose, setOpenOrClose] = useState<any>([]);
  const [deliveryType, setDeliveryType] = useState<any>([]);
  const [restaurantTypes, setRestaurantTypes] = useState<any>([]);

  let miniSearch = new MiniSearch({
    fields: ['name', 'description', 'type'],
  });

  useEffect(() => {
    if (loading === false) {
      if (data) {
        const branches = data.getParticipantBuyers.map((p: any) => p.branch);
        resultArray.push(...branches);
        miniSearch.addAll(resultArray);
        setOpenOrClose([
          {
            key: '1',
            name: 'Open',
            count: getOpenOrClosedBranches(dateTime, resultArray, true).length,
            field: 'open',
          },
          {
            key: '2',
            name: 'Closed',
            count: getOpenOrClosedBranches(dateTime, resultArray, false).length,
            field: 'closed',
          },
        ]);
        setDeliveryType([
          {
            key: '1',
            name: 'Yes',
            count: resultArray.filter((arr) => arr.services.includes('Delivery')).length,
            field: 'yes',
          },
          {
            key: '2',
            name: 'No',
            count: resultArray.filter((arr) => !arr.services.includes('Delivery')).length,
            field: 'no',
          },
        ]);
        setRestaurantTypes([
          {
            key: '1',
            field: 'Restaurant',
            count: miniSearch.search('Restaurant', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
          },
          {
            key: '2',
            field: 'Canteen',
            count: miniSearch.search('Canteen', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
          },
          {
            key: '3',
            field: 'Pub',
            count: miniSearch.search('Pub', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
          },
          {
            key: '4',
            field: 'Cafe',
            count: miniSearch.search('Cafe', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
          },
          {
            key: '5',
            field: 'Club',
            count: miniSearch.search('Club', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
          },
          {
            key: '6',
            field: 'CoffeeShop',
            count: miniSearch.search('CoffeeShop', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
          },
          {
            key: '7',
            field: 'Karaoke',
            count: miniSearch.search('Karaoke', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
          },
          {
            key: '8',
            field: 'Hotel',
            count: miniSearch.search('Hotel', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
          },
          {
            key: '9',
            field: 'Resort',
            count: miniSearch.search('Resort', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
          },
          {
            key: '10',
            field: 'Warehouse',
            count: miniSearch.search('Warehouse', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
          },
          {
            key: '11',
            field: 'Other',
            count: miniSearch.search('Other', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
          },
        ]);
      }
    }
  }, [data, loading]);

  const foodTypes = [
    {
      key: '1',
      name: `${t('mainPage.AppleJuice')}`,
      count: 5,
      field: 'AppleJuice',
    },
    {
      key: '2',
      name: `BB.Q`,
      count: 5,
      field: 'BB.Q',
    },
    {
      key: '3',
      name: `Beef Roast`,
      count: 5,
      field: 'Beef Roast',
    },
    {
      key: '4',
      name: `Carrot Juice`,
      count: 5,
      field: 'Carrot Juice',
    },
    {
      key: '5',
      name: `Cheese Burger`,
      count: 5,
      field: 'Cheese Burger',
    },
    {
      key: '6',
      name: `Cheicken Roast`,
      count: 5,
      field: 'Cheicken Roast',
    },
  ];

  const onClick = (e: string, type: string) => {
    if (e === filter.text) {
      setFilter({ type: '', text: '' });
    } else {
      setFilter({ type: type, text: e });
    }
  };

  return (
    <div className={styles.restaurantFilter}>
      <div className={styles.category}>
        <div className={styles.head}>
          <div>
            <i className="icon-restaurant_menu"></i>
            <span> {t('mainPage.RestaurantType')}</span>
          </div>
          <Image src={downArrow} preview={false} />
        </div>
        <div onClick={() => setFeilds('')} className={searchFields === '' ? styles.itemActive : styles.item}>
          <>
            {t('mainPage.All')}
            <span>({resultArray.length})</span>
          </>
        </div>
        {restaurantTypes.map((item: any, index: any) => {
          return (
            <div
              key={index}
              onClick={() => {
                if (item.count > 0) {
                  if (searchFields !== item.field) {
                    setFeilds(item.field);
                  } else {
                    setFeilds('');
                  }
                }
              }}
              className={searchFields === item.field ? styles.itemActive : styles.item}
            >
              <>
                {t(`mainPage.${item.field}`)}
                <span>({item.count})</span>
              </>
            </div>
          );
        })}
      </div>
      <div className={styles.category}>
        <div className={styles.head}>
          <div>
            <i className="icon-food"></i>
            <span>{t('mainPage.Meals')}</span>
          </div>
          <Image src={downArrow} preview={false} />
        </div>
        {foodTypes.map((item: any, index: any) => {
          return (
            <div
              key={index}
              // onClick={() => onClick(item.field, 'food')}
              className={filter.text === item.field ? styles.itemActive : styles.item}
            >
              <>
                {item.name}
                {/* <span>({item.count})</span> */}
              </>
            </div>
          );
        })}
        <li className={styles.more}>{t('mainPage.SeeOtherDishes')}</li>
      </div>
      <div className={styles.category}>
        <div className={styles.head}>
          <div>
            <i className="icon-clock4"></i>
            <span>{t('mainPage.Open')}</span>
          </div>
          <Image src={downArrow} preview={false} />
        </div>
        {openOrClose.map((item: any, index: any) => {
          return (
            <div
              key={index}
              onClick={() => onClick(item.field, 'active')}
              className={filter.text === item.field ? styles.itemActive : styles.item}
            >
              <>
                {t(`mainPage.${item.name}`)}
                <span>({item.count})</span>
              </>
            </div>
          );
        })}
      </div>
      <div className={styles.category}>
        <div className={styles.head}>
          <div>
            <i className="icon-external-link"></i>
            <span>{t('mainPage.FreeShipping')}</span>
          </div>
          <Image src={downArrow} preview={false} />
        </div>
        {deliveryType.map((item: any, index: any) => {
          return (
            <div
              key={index}
              onClick={() => onClick(item.field, 'delivery')}
              className={filter.text === item.field ? styles.itemActive : styles.item}
            >
              <>
                {t(`mainPage.${item.name}`)}
                <span>({item.count})</span>
              </>
            </div>
          );
        })}
      </div>
    </div>
  );
}
