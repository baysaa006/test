/* eslint-disable @next/next/no-html-link-for-pages */
import { Typography, Button, Layout, Row, Space, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, InfoCircleOutlined, RedoOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import SearchModal from '../../components/searchModal/SearchModal';
import RestaurantInfo from '../../components/restaurantInfo/RestaurantInfo';
import jwt_decode from 'jwt-decode';
import { getAccessToken } from '../../contexts/auth.context';
import { useTranslation } from 'react-i18next';
import OrderHistory from '../../components/OrderHistory/OrderHistory';
import Language from './language';
import { useStoreFoods } from '../../contexts/food.store';

const { Text } = Typography;
const { Header } = Layout;

interface channels {
  channel: any;
}

function Headers(props: any) {
  const { branchData, loading, refetch, setCurrentLanguage, currentLanguage } = props;
  const [stateVisible, setVisible] = useState(false);
  const [stateShowSearch, setShowSearch] = useState(false);
  const [stateShowInfo, setShowInfo] = useState(false);
  const [stateToken, setToken] = useState<channels>();
  const { participant } = useStoreFoods();
  var tokean = getAccessToken();

  const { t } = useTranslation('language');

  useEffect(() => {
    if (tokean) {
      setToken(jwt_decode(tokean));
    }
  }, [tokean]);

  const onSearchClose = () => {
    setShowSearch(false);
  };

  const showSearchModal = () => {
    setShowSearch(true);
  };

  const showDrawer = () => {
    window.location.href = '/';
  };

  const onClose = () => {
    setVisible(false);
  };

  const showInfoDrawer = () => {
    setShowInfo(true);
  };

  const showRestaurantInfo = () => {
    setVisible(true);
  };

  const onCloser = () => {
    setShowInfo(false);
  };

  return (
    <div className={styles.headerStyling}>
      <Header>
        <Row style={{ float: 'right' }}>
          <Space size={30} wrap className={styles.bigmenu}>
            {stateToken?.channel === 'Q' ? (
              <></>
            ) : (
              <>
                {participant?.channel === 'K' ? (
                  <Text style={{ cursor: 'pointer' }} strong onClick={() => refetch()} className={styles.buttonText}>
                    {t('mainPage.RELOAD')}
                  </Text>
                ) : (
                  <Text style={{ cursor: 'pointer' }} strong onClick={showDrawer} className={styles.buttonText}>
                    {t('mainPage.homeLink')}
                  </Text>
                )}
              </>
            )}
            <Text style={{ cursor: 'pointer' }} strong onClick={showRestaurantInfo} className={styles.buttonText}>
              {t(`mainPage.about${branchData?.branch.type}`)}
            </Text>
            <Text style={{ cursor: 'pointer' }} strong onClick={showInfoDrawer} className={styles.buttonText}>
              {t('mainPage.OrderHistory')}
            </Text>
            <div className={styles.languageLogo}>
              <Language setCurrentLanguage={setCurrentLanguage} currentLanguage={currentLanguage} />
            </div>
          </Space>

          <>
            {stateToken?.channel === 'Q' ? (
              <></>
            ) : (
              <>
                <Button
                  className={styles.menubtn}
                  type="primary"
                  shape="circle"
                  icon={<ArrowLeftOutlined />}
                  onClick={showDrawer}
                ></Button>
              </>
            )}
            {participant?.channel === 'K' && (
              <Button
                className={styles.refreshButton}
                type="primary"
                shape="circle"
                onClick={() => refetch()}
                icon={<ReloadOutlined style={{ fontSize: '18px' }} />}
              ></Button>
            )}
            <Button
              className={styles.searchBotton}
              type="primary"
              shape="circle"
              onClick={showSearchModal}
              icon={<SearchOutlined style={{ fontSize: '18px' }} />}
            ></Button>
            <Button
              className={styles.informationButton}
              type="primary"
              shape="circle"
              onClick={showRestaurantInfo}
              icon={<InfoCircleOutlined style={{ fontSize: '18px' }} />}
            ></Button>

            <div className={styles.languageLogoTypes}>
              <Language setCurrentLanguage={setCurrentLanguage} currentLanguage={currentLanguage} />
            </div>
            {branchData && (
              <RestaurantInfo branchData={branchData} placements="right" onClose={onClose} visible={stateVisible} />
            )}
          </>
        </Row>
      </Header>

      <SearchModal loading={loading} branchData={branchData} visible={stateShowSearch} onClose={onSearchClose} />
      {/* {stateShowInfo && (
        // <AboutRestaurantModal
        //   visible={stateShowInfo}
        //   branchData={branchData}
        //   setIsModalVisible={setShowInfo}
        //   onCloser={onCloser}
        //   isKey={1}
        // />
        )} */}
      <OrderHistory branchData={branchData} stateOrderHistory={stateShowInfo} onClose={onCloser} />
    </div>
  );
}

export default Headers;
