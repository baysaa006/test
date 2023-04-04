import { Affix, Col, Divider, Image, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import AdvertisementCard from './AdvertisementCard';
import CardList from './CardList';
import FilterList from './FilterList';
import KdsCard from './KdsCard';
import SortCard from './SortCard';
import styles from './style.module.scss';
import filter from '../../assets/filters.svg';
import sort from '../../assets/sort.svg';
import MainFilterModal from '../mainFilter/MainFilter';
import { useTranslation } from 'react-i18next';
import PosCard from './PosCard';
import KaraokeCard from './KaraokeCard';
interface Branch {
  id: string;
  type: string;
  name: string;
  description: string;
  logo: string;
  dayClose: string;
  phone: string;
  email: string;
  address: string;
}
const { Text } = Typography;
let iskey: number;

export default function RestaurantList() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t, i18n } = useTranslation('language');
  const showModal = (e: any) => {
    if (e === 2) {
      iskey = e;
      setIsModalVisible(true);
    }
    if (e === 3) {
      iskey = e;
      setIsModalVisible(true);
    }
  };
  return (
    <>
      <Affix offsetTop={0}>
        <Row className={styles.filterRow}>
          <Col span={11} className={styles.filterCol} onClick={() => showModal(2)}>
            <Space>
              <Image src={filter} preview={false} className={styles.filterIcon} /> <Text> {t('mainPage.Court')}</Text>
            </Space>
          </Col>
          <Divider type="vertical" />
          <Col span={11} className={styles.filterCol} onClick={() => showModal(3)}>
            <Space>
              <Image src={sort} className={styles.filterIcon} preview={false} />
              <Text>{t('mainPage.SORT')}</Text>
            </Space>
          </Col>
        </Row>
      </Affix>
      <div className={styles.rowMargin}>
        <Row justify="center" gutter={[20, 10]} style={{ margin: '0px 0px 0px 0px ' }}>
          <Col xs={22} sm={24} md={7} lg={6} xl={4} xxl={4}>
            <FilterList />
          </Col>
          <Col xs={23} sm={24} md={9} lg={12} xl={14} xxl={14}>
            <CardList />
          </Col>
          <Col xs={22} sm={24} md={8} lg={6} xl={5} xxl={4}>
            <SortCard />
            <br />
            <AdvertisementCard />
            <br />
            <KdsCard />
            <br />
            <PosCard />
            <br />
            <KaraokeCard />
          </Col>
        </Row>
      </div>
      {isModalVisible && (
        <MainFilterModal visible={isModalVisible} setIsModalVisible={setIsModalVisible} isKey={iskey} />
      )}
    </>
  );
}
