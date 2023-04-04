import { CloseOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Modal, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Confirmation from './components/Confirmation';
import Login from './components/Login';

import styles from './style.module.scss';
import UseCarousel from './userCarousel';

const { Text } = Typography;

export default function UserWebModal(props: any) {
  const { visible, onClose } = props;
  const { t, i18n } = useTranslation('language');
  const headerTitle = (
    <>
      <Row justify="start">
        <Text className={styles.foodNameModal} strong>
          {t('mainPage.register')}
        </Text>
      </Row>
    </>
  );
  const [isModalVisibleConfirmation, setIsModalVisibleConfirmation] = useState(false);
  const [isModalVisibleLogin, setIsModalVisibleLogin] = useState(false);
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
      <div className={styles.webTypeModals}>
        <Modal
          title={headerTitle}
          onOk={onClose}
          onCancel={onClose}
          className={styles.webTypeModals}
          open={visible}
          style={{ top: 10, borderRadius: '11px ', overflow: 'auto', minHeight: '700px' }}
          footer={null}
          bodyStyle={{ borderRadius: '11px', minHeight: '700px' }}
          width={400}
        >
          <Row justify="center">
            <Col span={21}>
              <UseCarousel />
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <Row justify="center" style={{ padding: '0px 0px 0px 0px', margin: '0px 0px 0px 0px' }}>
            <Space direction="vertical">
              <div className={styles.nowPayokButton}>
                <Button size="large" onClick={registerModal}>
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
          <Confirmation
            isModalVisibleConfirmation={isModalVisibleConfirmation}
            closeConfirmationModal={closeConfirmationModal}
            isSessionType={'R'}
            isWeb
          />
          <Login closeLoginModal={closeLoginModal} isModalVisibleLogin={isModalVisibleLogin} isWeb />
        </Modal>
      </div>
    </>
  );
}
