import {
  CloseOutlined,
  CopyOutlined,
  FileDoneOutlined,
  LoginOutlined,
  PhoneOutlined,
  RightOutlined,
  TeamOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Divider, Drawer, Image, Menu, Row, Space, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AboutRestaurantModal from '../aboutRestaurant/aboutRestaurant';
import styles from './style.module.scss';
import list from '../../assets/Order.svg';
import history from '../../assets/mobileDrawerPic/history.svg';
import user from '../../assets/Profile.svg';
import question from '../../assets/mobileDrawerPic/Question.svg';
import qr from '../../assets/mobileDrawerPic/QR.svg';
import note from '../../assets/mobileDrawerPic/Note.svg';
import jwt_decode from 'jwt-decode';
import { getAccessToken } from '../../contexts/auth.context';
import UserModal from '../userModal/userModal';
import UserWebModal from '../userModal/useWebModal';
import { useTranslation } from 'react-i18next';
import FeedBackConfirm from '../aboutRestaurant/component/FeedBackConfirm';
import { GET_ORDER_REVIEWS } from '../../graphql/query/order.qeury';

interface channels {
  channel: any;
}

const { Text } = Typography;
export default function RestaurantInfo(props: any) {
  const { t, i18n } = useTranslation('language');
  const { onClose, visible, placements, branchData } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateToken, setToken] = useState<channels>();
  const [visibleWeb, setVisibleWeb] = useState(false);
  const [visibleApp, setVisibleApp] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [isKey, setkey] = useState(1);
  const fullwidth = global.window?.innerWidth;
  const router = useRouter();

  const [orderReviews, setOrderReviews] = useState();
  const { id } = router.query;
  // const [getOrderReviews] = useLazyQuery(GET_ORDER_REVIEWS, {
  //   onCompleted: (data: any) => {
  //     setOrderReviews(data.getOrderReviewsByLimit);
  //   },
  // });

  const onClickInfo = (e: any) => {
    if (Number(e.key) === 1) {
      setIsModalVisible(true);
      setkey(Number(e.key));
    }
    if (Number(e.key) === 2) {
      setIsModalVisible(true);
      setkey(Number(e.key));
    }
    if (Number(e.key) === 5) {
      setIsModalVisible(true);
      setkey(Number(e.key));
    }
    if (Number(e.key) === 4) {
      setIsModalVisible(true);
      setkey(Number(e.key));
    }
  };

  const menuData = [
    {
      key: '2',
      name: `${t(`mainPage.${branchData?.branch.type}Information`)}`,
      icon: list,
    },
    {
      key: '4',
      name: `${t('mainPage.Feedback')}`,
      icon: question,
    },
    {
      key: '5',
      name: `${t('mainPage.ConnectWithQmenu')}`,
      icon: qr,
    },
    {
      key: '6',
      name: `${t('mainPage.FillOutCustomerSurvey')}`,
      icon: note,
    },
  ];

  const menuDataWeb = [
    {
      key: '2',
      name: `${t(`mainPage.${branchData?.branch.type}Information`)}`,
      icon: list,
    },
    {
      key: '3',
      name: `${t('mainPage.UserLogin')}`,
      icon: user,
    },
    {
      key: '4',
      name: `${t('mainPage.Feedback')}`,
      icon: question,
    },
    {
      key: '5',
      name: `${t('mainPage.ConnectWithQmenu')}`,
      icon: qr,
    },
    {
      key: '6',
      name: `${t('mainPage.FillOutCustomerSurvey')}`,
      icon: note,
    },
  ];

  var tokean = getAccessToken();

  useEffect(() => {
    if (tokean) {
      setToken(jwt_decode(tokean));
      // getOrderReviews();
    }
  }, [tokean]);
  const ModalTitile = (
    <div className={styles.drawerHeader}>
      <Row justify="end">
        <CloseOutlined style={{ fontSize: 20 }} onClick={onClose} />
      </Row>
      <Image preview={false} src={branchData?.branch?.logo} alt="logo" width="100%" />
    </div>
  );

  const closeModalApp = () => {
    if (fullwidth > 742) {
      setVisibleWeb(false);
    } else {
      setVisibleApp(false);
    }
  };

  return (
    <>
      <Drawer
        size="default"
        title={ModalTitile}
        bodyStyle={
          id === '7d78f82b-e661-4636-b83d-d0d278256413' ? { fontFamily: 'italic, serif', fontStyle: 'italic' } : {}
        }
        placement={placements}
        visible={visible}
        closable={false}
      >
        <div style={{ flexDirection: 'column' }} className={styles.mobileDiv}>
          <Menu onClick={onClickInfo} mode="vertical">
            {menuData.map((item) => {
              return (
                <>
                  <Menu.Item key={item.key}>
                    <Row justify="space-between">
                      <Space>
                        <Image src={item.icon} />
                        <Text>{item.name}</Text>
                      </Space>
                      <Space>
                        <RightOutlined style={{ background: 'transparent', fontSize: 13, color: '#5C616F' }} />
                      </Space>
                    </Row>
                  </Menu.Item>
                  <Divider style={{ margin: '0px 0px 0px 0px ' }} />
                </>
              );
            })}
          </Menu>
        </div>
      </Drawer>
      {isModalVisible && (
        <AboutRestaurantModal
          orderReviews={orderReviews}
          visible={isModalVisible}
          modalConfirm={modalConfirm}
          setModalConfirm={setModalConfirm}
          setIsModalVisible={setIsModalVisible}
          isClassComponent={false}
          isKey={isKey}
        />
      )}

      <UserModal isModalVisible={visibleApp} closeModal={closeModalApp} />
      <UserWebModal visible={visibleWeb} onClose={closeModalApp} />
      <FeedBackConfirm onClose={onClose} isModalVisible={modalConfirm} setIsModalVisible={setModalConfirm} />
    </>
  );
}
