/* eslint-disable @next/next/no-html-link-for-pages */
import { Typography, Button, Drawer, Image, Layout, Row, Space, Divider, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import RestaurantInfo from '../../../components/restaurantInfo/RestaurantInfo';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { getAccessToken } from '../../../contexts/auth.context';
import jwt_decode from 'jwt-decode';
import Language from '../../../pages/layout/language';

const { Text } = Typography;
const { Header } = Layout;

interface IFeatures {
  channel: any;
  features: any[];
}

function HeaderKaraoke(props: any) {
  const router = useRouter();
  const { id } = router.query;
  const { branchData, setCurrentLanguage, currentLanguage } = props;
  const [stateVisible, setVisible] = useState(false);
  const [stateToken, setToken] = useState<IFeatures>();

  const showDrawer = () => {
    window.location.href = `/restaurant?id=${id}`;
  };

  const onClose = () => {
    setVisible(false);
  };

  const showRestaurantInfo = () => {
    setVisible(true);
  };

  var token = getAccessToken();

  useEffect(() => {
    if (token) {
      setToken(jwt_decode(token));
    }
    if (stateToken) {
      if (isEmpty(stateToken.features.filter((val) => val === 'KRK'))) {
        window.location.href = `/restaurant?id=${id}`;
      }
    }
  }, []);

  const { t } = useTranslation('language');

  return (
    <div className={styles.headerStyling}>
      <Header>
        <Row style={{ float: 'right' }}>
          <Space size={30} wrap className={styles.bigmenu}>
            <>
              <Text style={{ cursor: 'pointer' }} strong onClick={showDrawer} className={styles.buttonText}>
                {t('mainPage.GoBack')}
              </Text>
            </>
            <Text style={{ cursor: 'pointer' }} strong onClick={showRestaurantInfo} className={styles.buttonText}>
              {t(`mainPage.about${branchData?.branch.type}`)}
            </Text>
            <div className={styles.languageLogo}>
              <Language setCurrentLanguage={setCurrentLanguage} currentLanguage={currentLanguage} />
            </div>
          </Space>
          <>
            <Button
              className={styles.menubtn}
              type="primary"
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={showDrawer}
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
            <RestaurantInfo branchData={branchData} placements="right" onClose={onClose} visible={stateVisible} />
          </>
        </Row>
      </Header>
    </div>
  );
}

export default HeaderKaraoke;
