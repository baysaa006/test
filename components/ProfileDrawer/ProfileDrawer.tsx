import { CloseOutlined, LoadingOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { Drawer, Row, Image, Avatar, Menu, Space, Typography, Divider, List, Spin, message } from 'antd';
import React, { useContext, useState } from 'react';
import styles from './style.module.scss';
import note from '../../assets/mobileDrawerPic/Note.svg';
import { useTranslation } from 'react-i18next';
import userInfo from '../../assets/singIn/userInfo.png';
import heart from '../../assets/singIn/heart.png';
import discount from '../../assets/singIn/Discount.svg';
import Calories from '../../assets/singIn/Calories.svg';
import Camera from '../../assets/singIn/Camera.svg';
import logout from '../../assets/singIn/logout.png';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import UserInformation from './components/UserInformation';
import { CURRENT_TOKEN } from '../../graphql/mutation/scan';
import router from 'next/router';
import { AuthContext } from '../../contexts/auth.context';
import { deleteAllCookies, getCookie } from '../../helper/utils';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#007BFF' }} spin />;
export default function ProfileDrawer(props: any) {
  const { onClose, visible, userData, loadingUser, isWeb } = props;
  const { t, i18n } = useTranslation('language');
  const [isKey, setkey] = useState(1);
  const [stateUserInfo, setUserInfo] = useState(false);
  const { authenticate } = useContext(AuthContext);
  const [getCurrentToken, { loading }] = useMutation(CURRENT_TOKEN, {
    onCompleted: (data) => {
      authenticate(data.getToken.token, () => router.reload());
    },
    onError(err) {
      message.warning(err.message);
      router.push('/notfound');
    },
  });
  const { Text } = Typography;
  const ModalTitile = (
    <div className={styles.drawerHeader}>
      {userData && (
        <>
          <CloseOutlined style={{ fontSize: 20, position: 'absolute', right: '18px', top: '16px' }} onClick={onClose} />
          <br />
          <List.Item.Meta
            avatar={<Avatar size={64} icon={userData.me.icon ? userData.me.icon : <UserOutlined />} />}
            title={userData.me.firstName}
            description={userData.me.phone}
          />
        </>
      )}
    </div>
  );

  const menuUser = [
    {
      key: '1',
      name: t('mainPage.CustomerInformation'),
      icon: userInfo,
    },
    {
      key: '2',
      name: t('mainPage.MyFavorite'),
      icon: heart,
    },

    {
      key: '3',
      name: t('mainPage.DiscountCards'),
      icon: discount,
    },
    {
      key: '4',
      name: t('mainPage.GiftCoupon'),
      icon: Calories,
    },
    {
      key: '5',
      name: t('mainPage.ShareWithOthers'),
      icon: Camera,
    },
    {
      key: '6',
      name: t('mainPage.FoodDonation'),
      icon: note,
    },
    {
      key: '7',
      name: t('mainPage.Signout'),
      icon: logout,
    },
  ];

  const onClickInfo = (e: any) => {
    if (Number(e.key) === 1) {
      setUserInfo(true);
      setkey(Number(e.key));
    } else if (Number(e.key) === 2) {
      setkey(Number(e.key));
    } else if (Number(e.key) === 3) {
      setkey(Number(e.key));
    } else if (Number(e.key) === 4) {
      setkey(Number(e.key));
    } else if (Number(e.key) === 5) {
      setkey(Number(e.key));
    } else if (Number(e.key) === 6) {
      setkey(Number(e.key));
    } else if (Number(e.key) === 7) {
      const id = getCookie('qr');
      deleteAllCookies();
      if (id) {
        getCurrentToken({ variables: { code: id, type: 'Q' } });
      } else {
        window.location.href = '/';
      }
    }
  };

  const onCloseUserInfo = () => {
    setUserInfo(false);
  };

  return (
    <div className={styles.DrawerStyling}>
      <Spin indicator={antIcon} spinning={loadingUser}>
        {userData && (
          <Drawer
            width={isWeb ? '350px' : '100%'}
            zIndex={1}
            size="default"
            title={ModalTitile}
            visible={visible}
            closable={false}
          >
            <div style={{ flexDirection: 'column' }} className={styles.mobileDiv}>
              <Row style={{ marginLeft: '17px' }}>
                <Text style={{ fontSize: '15px' }}>{t('mainPage.PersonalSettings')}</Text>
              </Row>
              <Menu onClick={onClickInfo} mode="vertical">
                {menuUser.map((item, key) => {
                  return (
                    <>
                      <Menu.Item key={item.key}>
                        <Row justify="space-between">
                          <Space>
                            <Image preview={false} src={item.icon} />
                            <Text>{item.name}</Text>
                          </Space>
                          <Space>
                            <RightOutlined style={{ background: 'transparent', fontSize: 13, color: '#5C616F' }} />
                          </Space>
                        </Row>
                      </Menu.Item>
                    </>
                  );
                })}
              </Menu>
              <br />
            </div>
          </Drawer>
        )}
      </Spin>

      <UserInformation
        onClose={onCloseUserInfo}
        visible={stateUserInfo}
        userData={userData && userData.me}
        loadingUser={loadingUser}
        isWeb={isWeb}
      />
    </div>
  );
}
