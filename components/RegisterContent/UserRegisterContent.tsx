import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { Button, Row, Col, Card, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import UseCarousel from '../userModal/userCarousel';
import Confirmation from '../userModal/components/Confirmation';
import Login from '../userModal/components/Login';
import { useRouter } from 'next/router';
interface Props {
  visible: boolean;
  onClose: () => void;
  type: string;
}

export default function UserRegisterContent({ visible, onClose, type }: Props) {
  const { t } = useTranslation('language');
  const [noModal, setNoModal] = useState(type);
  const registerRef = useRef<any>();
  const loginRef = useRef<any>();
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (type) {
      setNoModal(type);
    } else {
      setNoModal('login');
    }
  }, [type]);

  useEffect(() => {
    switch (noModal) {
      case 'success':
        message.success('Амжилттай', 0.1).then((res) => {
          router.reload();
        });
        break;
      case 'personForgotSuccess':
        message.success('Амжилттай');
        setNoModal('login');
        break;
    }
  }, [noModal]);

  const registerComp = () => {
    return (
      <>
        <Confirmation
          isSessionType={
            noModal === 'forgot' || noModal === 'confirmationCodeForgot' || noModal === 'personForgot' ? 'P' : 'R'
          }
          noModal={noModal}
          ref={registerRef}
          setLoadingRegister={setLoadingRegister}
          setNoModal={setNoModal}
        >
          {noModal === 'register' && (
            <Row justify="center" wrap={false} style={{ marginTop: '35px' }}>
              <div className={styles.deActiveButton}>
                <Button size="large" onClick={() => setNoModal('login')} style={{ width: '150px' }}>
                  {t('mainPage.GoBack')}
                </Button>
              </div>
              <div className={styles.activeButton}>
                <Button
                  size="large"
                  onClick={() => {
                    registerRef.current && registerRef.current.submit();
                  }}
                  style={{ width: '150px' }}
                  loading={loadingRegister}
                >
                  {t('mainPage.ToBeContinued')}
                </Button>
              </div>
            </Row>
          )}
        </Confirmation>
      </>
    );
  };

  const loginComp = () => {
    return (
      <>
        <Login noModal={noModal} setNoModal={setNoModal} ref={loginRef} setLoadingLogin={setLoadingLogin}>
          {noModal === 'login' && (
            <Row justify="center" wrap={false} style={{ marginTop: '15px' }}>
              <div className={styles.activeButton}>
                <Button
                  onClick={() => loginRef.current && loginRef.current.submit()}
                  size="large"
                  loading={loadingLogin}
                >
                  {t('mainPage.login')}
                </Button>
              </div>
              <div className={styles.deActiveButton}>
                <Button size="large" onClick={() => setNoModal('register')}>
                  {t('mainPage.register')}
                </Button>
              </div>
            </Row>
          )}
        </Login>
      </>
    );
  };

  return (
    <>
      <Modal
        className={styles.userRegister}
        closable={false}
        open={visible}
        footer={false}
        bodyStyle={{ padding: '0px' }}
        onCancel={onClose}
      >
        <Card className={styles.registerCard}>
          <Row justify="center" className={styles.carousel}>
            <Col span={21}>
              <UseCarousel />
            </Col>
          </Row>
          {noModal === 'login' ? loginComp() : registerComp()}
        </Card>
      </Modal>
    </>
  );
}
