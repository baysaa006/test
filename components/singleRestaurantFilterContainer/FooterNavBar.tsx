import React, { useEffect, useState } from 'react';
import { Affix, Row, Card, Image, Badge, Col } from 'antd';
import styles from './style.module.scss';
import { useStoreFoods } from '../../contexts/food.store';
import vector from '../../assets/Home.svg';
import list from '../../assets/Order.svg';
import user from '../../assets/Profile.svg';
import searchIcon from '../../assets/Search.svg';
import WaiterModal from '../WaiterModal/WaiterModal';
import SearchModal from '../searchModal/SearchModal';
import { useRouter } from 'next/router';
import { getAccessToken } from '../../contexts/auth.context';
import jwt_decode from 'jwt-decode';
import UserModal from '../userModal/userModal';
import UserWebModal from '../userModal/useWebModal';
import OrderHistory from '../OrderHistory/OrderHistory';
import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import KaraokeAffix from '../karaokeAffix/KaraokeAffix';
import waiterPng from './assets/waiter-icon.png';
import { useActiveMenuStore } from '../../contexts/activeMenuContext';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_SONG_CATEGORIES } from '../../graphql/query/karaoke.qeury';
interface channels {
  channel: any;
  role: any;
  userData: any;
}

export default function FooterNavBar(props: any) {
  const { setVisible, branchData, loading, isMain, userData, loadingUser } = props;
  const router = useRouter();
  const { id } = router.query;
  const { foods, getSale, participant } = useStoreFoods();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateShowSearch, setShowSearch] = useState(false);
  const [stateToken, setToken] = useState<channels>();
  const [visibleWeb, setVisibleWeb] = useState(false);
  const [visibleApp, setVisibleApp] = useState(false);
  const [stateProfileDrawer, setProfileDrawer] = useState(false);
  const [stateOrderHistory, setOrderHistory] = useState(false);

  const { t, i18n } = useTranslation('language');
  const filteredNewArray = foods.filter((z: any) => z.status === 'NEW');
  const fullwidth = global.window?.innerWidth;

  const { data: getSongCategories } = useQuery(GET_SONG_CATEGORIES, {
    skip: !id,
  });

  let prices: number[] = filteredNewArray?.map((val: any) => val.salePrice);

  useEffect(() => {
    function add(accumulator: any, a: any) {
      return accumulator + a;
    }

    let prices: number[] = foods?.map((val: any) => val.salePrice);

    const total = prices.reduce(add, 0);
  }, [prices, foods]);

  const showDrawer = () => {
    setVisible(true);
  };

  const showWaiter = () => {
    setIsModalVisible(true);
  };
  const showSearchModal = () => {
    if (isMain === true) {
      return window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setShowSearch(true);
  };

  const onSearchClose = () => {
    setShowSearch(false);
    changeActiveMenu();
  };

  const goHome = () => {
    if (stateToken?.channel === 'W') {
      router.push('/');
    }
    if (stateToken?.channel === 'Q') {
      router.push(`/restaurant?id=${id}`);
    }
  };

  var token = getAccessToken();

  useEffect(() => {
    if (token) {
      setToken(jwt_decode(token));
    }
  }, [token]);

  const closeModalApp = () => {
    setVisibleApp(false);
    changeActiveMenu();
  };

  const showUserModal = () => {
    if (fullwidth > 742) {
      setVisibleWeb(true);
    } else {
      setVisibleApp(true);
    }
  };

  const onCloseWebModal = () => {
    setVisibleWeb(false);
    changeActiveMenu();
  };

  const onCloseOrderHistory = () => {
    setOrderHistory(false);
    changeActiveMenu();
  };

  const showOrderHistory = () => {
    setOrderHistory(true);
  };

  const onCloseProfile = () => {
    setProfileDrawer(false);
    changeActiveMenu();
  };
  const showProfile = () => {
    setProfileDrawer(true);
  };

  const { menuItemId, setActiveMenu, checkKaraokeActive, setKaraokeActive } = useActiveMenuStore();

  const changeActiveMenu = () => {
    checkKaraokeActive ? setActiveMenu(4) : setActiveMenu(0);
  };

  return (
    <>
      <div className={styles.navBarAffix}>
        <Affix offsetBottom={0} className={styles.navAffixone}>
          <Row justify="center" style={{ padding: '0px', position: 'fixed', zIndex: 11, bottom: 0, width: '100%' }}>
            <Card>
              <Row justify="space-around">
                <Col
                  className={menuItemId === 0 ? 'active' : ''}
                  onClick={() => {
                    goHome();
                    setActiveMenu(0);
                    setKaraokeActive(false);
                  }}
                >
                  <Image src={vector} height={22} preview={false} />
                  {t('mainPage.homeLinkShort')}
                </Col>

                <Col
                  className={menuItemId === 1 ? 'active' : ''}
                  onClick={() => {
                    showSearchModal(), setActiveMenu(1);
                  }}
                >
                  <Image src={searchIcon} height={22} preview={false} />
                  {t('mainPage.SearchForFoodShort')}
                </Col>

                {/* {stateToken?.channel === 'Q' ? (
                  <>
                    {participant && participant.waiter && (
                      <div className={styles.bellImgContainer} onClick={showWaiter}>
                        <Badge
                          status="processing"
                          style={{
                            filter:
                              'brightness(0) saturate(100%) invert(46%) sepia(70%) saturate(2093%) hue-rotate(341deg) brightness(98%) contrast(93%)',
                          }}
                        />
                        <Image src={waiterPng} height={37} width={37} preview={false} id="bellImage" />
                      </div>
                    )}
                  </>
                ) : (
                  <></>
                )}
                {getSongCategories && <KaraokeAffix menuItemId={menuItemId} setActiveMenu={setActiveMenu} />} */}

                <Col
                  className={menuItemId === 2 ? 'active' : ''}
                  onClick={() => {
                    showOrderHistory();
                    setActiveMenu(2);
                  }}
                >
                  <Image src={list} height={22} width={25} preview={false} />
                  <Badge
                    style={{ padding: '0px 0px' }}
                    count={
                      getSale?.filter((value: any) => value.state !== 'COMPLETED' && value.state !== 'CANCELLED').length
                    }
                  ></Badge>
                  {t('mainPage.OrderHistoryShort')}
                </Col>

                {/* <Col
                  className={menuItemId === 3 ? 'active' : ''}
                  onClick={() => {
                    if (stateToken?.role === 'customer') {
                      showProfile();
                      setActiveMenu(3);
                    } else {
                      showUserModal();
                      setActiveMenu(3);
                    }
                  }}
                >
                  <Image src={user} height={22} preview={false} />
                  {t('mainPage.User')}
                </Col> */}
              </Row>
            </Card>
          </Row>
        </Affix>
      </div>
      <WaiterModal setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
      <SearchModal loading={loading} branchData={branchData} visible={stateShowSearch} onClose={onSearchClose} />
      <UserModal isModalVisible={visibleApp} closeModal={closeModalApp} />
      <ProfileDrawer
        visible={stateProfileDrawer}
        onClose={onCloseProfile}
        userData={userData}
        loadingUser={loadingUser}
      />
      <UserWebModal visible={visibleWeb} onClose={onCloseWebModal} />
      <OrderHistory branchData={branchData} stateOrderHistory={stateOrderHistory} onClose={onCloseOrderHistory} />
    </>
  );
}
