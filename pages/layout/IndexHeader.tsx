import React, { useState } from 'react';
import styles from './style.module.scss';
import { Button, Col, Row, Space, Typography, Dropdown, Menu, Card, Image } from 'antd';
import {
  UnorderedListOutlined,
  CompassOutlined,
  HomeOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';
import qmenuLogo from '../../assets/newQ.png';
import { useTranslation } from 'react-i18next';
import Language from './language';
import ProfileDrawer from '../../components/ProfileDrawer/ProfileDrawer';
import UserRegisterContent from '../../components/RegisterContent/UserRegisterContent';
const { Text } = Typography;

interface Props {
  userData?: any;
  loadingUser?: boolean;
}

export default function IndexHeader({ userData, loadingUser }: Props) {
  const handleLink = (e: any) => {
    window.location.href = e;
  };
  const [visibleUserModal, setVisibleUserModal] = useState(false);
  const [visibleProfile, setVisibleProfile] = useState(false);
  const [loginOrSignin, setLoginOrSignin] = useState('');
  const onCloseProfile = () => {
    setVisibleProfile(false);
  };
  const { t } = useTranslation('language');

  const onOpenUserModal = (e: string) => {
    setLoginOrSignin(e);
    setVisibleUserModal(true);
  };

  const onCloseUserModal = () => {
    setLoginOrSignin('');
    setVisibleUserModal(false);
  };

  const menu = (
    <Menu style={{ borderRadius: '10px', padding: '0px 0px' }}>
      <Card style={{ borderRadius: '10px' }} className={styles.dropDownMenu}>
        <Space direction="vertical">
          <Menu.Item key="1" icon={<CompassOutlined />}>
            <Text onClick={() => handleLink('http://about.qmenu.mn/')}> {t('mainPage.AboutQmenu')}</Text>
          </Menu.Item>
          <Menu.Item key="2" icon={<HomeOutlined />}>
            <Text onClick={() => handleLink('/')}>{t('mainPage.homeLink')}</Text>
          </Menu.Item>
          {userData?.me?.verified ? (
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Text onClick={() => setVisibleProfile(true)}>{userData?.me?.firstName}</Text>
            </Menu.Item>
          ) : (
            <>
              <Menu.Item key="3" icon={<UserOutlined />}>
                <Text onClick={() => onOpenUserModal('login')}>{t('mainPage.login')}</Text>
              </Menu.Item>
              <Menu.Item key="4" icon={<UsergroupAddOutlined />}>
                <Text onClick={() => onOpenUserModal('register')}>{t('mainPage.register')}</Text>
              </Menu.Item>
            </>
          )}
          <Menu.Item key="5" icon={<ReconciliationOutlined />}>
            <Text onClick={() => handleLink('/restaurantRegister')}>{t('mainPage.RestaurantRegistration')}</Text>
          </Menu.Item>
        </Space>
      </Card>
    </Menu>
  );

  return (
    <>
      <Row justify="space-around" className={styles.headerStyles}>
        <Col xs={24} sm={24} md={24} lg={13} xl={12} xxl={14} className={styles.navCol}>
          <Space size={10}>
            <img src={qmenuLogo} onClick={() => handleLink('/')} className={styles.mobileTypeLogo} />
            <Dropdown overlay={menu} trigger={['click']} className={styles.mobileTypeNav}>
              <Button className={styles.dropDownButtonStyle}>
                <UnorderedListOutlined style={{ fontSize: '20px' }} />
              </Button>
            </Dropdown>
            <div className={styles.language}>
              <Language
                setCurrentLanguage={() => {
                  console.log('');
                }}
                currentLanguage={'mn'}
              />
            </div>
            <div className="main-location">
              <ul>
                <li className="location-has-children">
                  <a href="http://about.qmenu.mn/" target={'_blank'}>
                    <i className="icon-compass"></i>
                    {t('mainPage.AboutQmenu')}
                  </a>
                </li>
              </ul>
            </div>
            <div className="main-location">
              <ul>
                <li className="location-has-children">
                  <a href="/">
                    <i className="icon-home"></i>
                    {t('mainPage.homeLink')}
                  </a>
                </li>
              </ul>
            </div>
          </Space>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={9}
          xl={8}
          xxl={5}
          style={{ alignSelf: 'center', textAlign: 'center' }}
          className={styles.registerButton}
        >
          {userData?.me?.verified ? (
            <Text className={styles.loginStyle} onClick={() => setVisibleProfile(true)}>
              {userData?.me?.firstName}
            </Text>
          ) : (
            <>
              <Text className={styles.loginStyle} onClick={() => onOpenUserModal('login')}>
                {t('mainPage.login')}
              </Text>{' '}
              <Text>/</Text>{' '}
              <Text className={styles.loginStyle} onClick={() => onOpenUserModal('register')}>
                {t('mainPage.register')}
              </Text>
            </>
          )}

          <Button onClick={() => handleLink('/restaurantRegister')} className={styles.registerButtonStyle}>
            {t('mainPage.RestaurantRegistration')}
          </Button>
        </Col>

        <Col span={1} className={styles.webLanguage}>
          <Language
            setCurrentLanguage={() => {
              console.log('');
            }}
            currentLanguage={'mn'}
          />
        </Col>
      </Row>
      <UserRegisterContent visible={visibleUserModal} onClose={() => onCloseUserModal()} type={loginOrSignin} />
      <ProfileDrawer
        visible={visibleProfile}
        onClose={onCloseProfile}
        userData={userData}
        loadingUser={loadingUser}
        isWeb
      />
    </>
  );
}
