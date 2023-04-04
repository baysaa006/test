import { Drawer, Row, Image, Button, Typography, Form, message } from 'antd';
import React, { useContext, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import expand from '../../../assets/orderTypesPic/Expand.png';
import LoginInput from './components/LoginInput';
import Confirmation from './Confirmation';
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../../../graphql/mutation/sign';
import { AuthContext } from '../../../contexts/auth.context';
import SuccessModal from './components/SuccessModal';
import { forwardRef } from 'react';

const Login = forwardRef<void, any>((props, ref) => {
  const { isModalVisibleLogin, isWeb, noModal, setNoModal, setLoadingLogin, children } = props;
  const { Text } = Typography;
  const { t, i18n } = useTranslation('language');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleConfirmation, setIsModalVisibleConfirmation] = useState(false);
  const [form] = Form.useForm();

  const { authenticate } = useContext(AuthContext);

  const [signIn, { loading }] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      authenticate(data.signIn.token, () => {
        if (noModal && setNoModal) {
          setLoadingLogin(false);
          setNoModal('success');
        } else {
          setIsModalVisible(true);
        }
      });
    },
    onError(err) {
      message.warning(err.message);
      if (noModal) setLoadingLogin(false);
    },
  });

  const onFinish = (values: any) => {
    signIn({
      variables: {
        password: values.password,
        phone: values.phone,
      },
    });
  };

  const header = (
    <>
      <Row justify="center" onClick={() => props.closeLoginModal()}>
        <Image src={expand} preview={false} />
      </Row>
    </>
  );

  const footer = (
    <Row justify="center" className={styles.continueButton}>
      <Button loading={loading} onClick={() => form.submit()}>
        {t('mainPage.login')}
      </Button>
    </Row>
  );

  const closeConfirmationModal = () => {
    setIsModalVisibleConfirmation(false);
  };

  const registerModal = () => {
    setIsModalVisibleConfirmation(true);
  };

  useImperativeHandle(ref, () => ({
    submit: async () => {
      await form.validateFields();
      onFinish(form.getFieldsValue());
      if (noModal) setLoadingLogin(true);
    },
    loading: loading,
  }));

  return (
    <>
      <div className={styles.confirmationDrawer}>
        {noModal === 'login' ? (
          <>
            <LoginInput form={form} onFinish={onFinish} />
            <Row justify="end">
              <Text
                style={{ color: '#007BFF', cursor: 'pointer' }}
                onClick={() => (noModal === 'login' ? setNoModal('forgot') : registerModal())}
              >
                {t('mainPage.ForgotPassword')}
              </Text>
            </Row>
            {children}
          </>
        ) : (
          <Drawer
            bodyStyle={{ padding: '20px', background: 'white', borderRadius: '10px' }}
            style={{ borderRadius: '10px' }}
            headerStyle={{ padding: '5px 21px' }}
            title={header}
            className={isWeb ? styles.confirmationDrawerWeb : styles.confirmationDrawer}
            open={isModalVisibleLogin}
            onClose={() => props.closeLoginModal()}
            closable={false}
            placement="bottom"
            footer={footer}
            getContainer={isWeb && false}
          >
            <LoginInput form={form} onFinish={onFinish} />
            <Row justify="end">
              <Text style={{ color: '#007BFF' }} onClick={registerModal}>
                {t('mainPage.ForgotPassword')}
              </Text>
            </Row>
          </Drawer>
        )}

        <Confirmation
          isModalVisibleConfirmation={isModalVisibleConfirmation}
          closeConfirmationModal={closeConfirmationModal}
          isSessionType={'P'}
          noModal={noModal}
          isWeb={isWeb}
        />

        <SuccessModal
          stayHere={false}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          title={t('mainPage.LoginSuccess')}
          noModal={noModal}
          setNoModal={setNoModal}
        />
      </div>
    </>
  );
});
export default Login;
