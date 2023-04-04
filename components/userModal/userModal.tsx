import { CloseOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import UseCarousel from './userCarousel';
import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';
import Confirmation from './components/Confirmation';
import Login from './components/Login';

const { Text } = Typography;

export default function UserModal(props: any) {
  const { isModalVisible, closeModalApp } = props;
  const { t, i18n } = useTranslation('language');
  const [isModalVisibleConfirmation, setIsModalVisibleConfirmation] = useState(false);
  const [isModalVisibleLogin, setIsModalVisibleLogin] = useState(false);
  const headerTitle = (
    <>
      <Row justify="space-between">
        <Text strong></Text>
        <CloseOutlined onClick={() => props.closeModal()} />
      </Row>
    </>
  );

  const showLogin = () => {
    setIsModalVisibleLogin(true);
  };

  const closeLoginModal = () => {
    setIsModalVisibleLogin(false);
  };

  const registerModal = () => {
    setIsModalVisibleConfirmation(true);
  };

  const closeConfirmationModal = () => {
    setIsModalVisibleConfirmation(false);
  };

  return (
    <>
      <Drawer
        bodyStyle={{ padding: '20px', background: 'white' }}
        height={'100%'}
        title={headerTitle}
        visible={isModalVisible}
        onClose={() => props.closeModal()}
        closable={false}
        placement="bottom"
      >
        <Row justify="center">
          <Col span={21}>
            <UseCarousel />
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row justify="center" style={{ padding: '0px 0px 0px 0px', margin: '0px 0px 8px 0px' }}>
          <Space direction="vertical">
            <div className={styles.nowPayokButton}>
              <Button onClick={registerModal} size="large">
                {t('mainPage.register')}
              </Button>
            </div>
            <div className={styles.nowPayCancelButton}>
              <Button onClick={showLogin} size="large">
                {t('mainPage.login')}
              </Button>
            </div>
          </Space>
        </Row>
      </Drawer>

      <Confirmation
        isModalVisibleConfirmation={isModalVisibleConfirmation}
        closeConfirmationModal={closeConfirmationModal}
        isSessionType={'R'}
      />
      <Login closeLoginModal={closeLoginModal} isModalVisibleLogin={isModalVisibleLogin} />
    </>
  );
}
