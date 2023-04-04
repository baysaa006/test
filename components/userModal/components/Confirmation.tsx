import { Drawer, Row, Image, Button, Form, message } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import expand from '../../../assets/orderTypesPic/Expand.png';
import PhoneNumber from './components/phoneNumber';
import ConfirmationCodeModal from './ConfirmationCode';
import { useMutation } from '@apollo/client';
import { GET_SESSION } from '../../../graphql/mutation/getSession';

const Confirmation = forwardRef<void, any>((props, ref) => {
  const {
    isModalVisibleConfirmation,
    isSessionType,
    closeConfirmationModal,
    isWeb,
    noModal,
    setLoadingRegister,
    setNoModal,
    children,
  } = props;
  const { t, i18n } = useTranslation('language');
  const [isModalVisibleConfirmationCode, setIsModalVisibleConfirmationCode] = useState(false);
  const [form] = Form.useForm();
  const [start, setStart] = useState(false);

  const [getSessionId, setSessionId] = useState();
  const [getPhone, setPhone] = useState();

  const warning = (errMessage: any) => {
    message.warning({
      content: errMessage,
      style: {
        marginTop: '50vh',
      },
    });
  };

  const [getSession, { loading }] = useMutation(GET_SESSION, {
    onCompleted: (data) => {
      setSessionId(data.getSession);
      if (noModal === 'register') {
        setNoModal('confirmationCode');
        setLoadingRegister(false);
      } else if (noModal === 'forgot') {
        setNoModal('confirmationCodeForgot');
        setLoadingRegister(false);
      } else {
        ConfirmationCodeShow();
      }
    },
    onError(err) {
      if (noModal) setLoadingRegister(false);
      warning(err.message);
    },
  });

  const ConfirmationCodeShow = () => {
    setIsModalVisibleConfirmationCode(true);
  };

  const closeConfirmationCodeModal = () => {
    setIsModalVisibleConfirmationCode(false);
  };

  const onFinish = (values: any) => {
    if (values.phone) {
      setPhone(values.phone);
      getSession({ variables: { phone: values.phone, type: isSessionType } });
      setStart(true);
    }
  };

  const header = (
    <>
      <Row justify="center" onClick={() => props.closeConfirmationModal()}>
        <Image src={expand} preview={false} />
      </Row>
    </>
  );

  const footer = (
    <Row justify="center" className={styles.continueButton}>
      {noModal === 'forgot' && (
        <Button
          style={{
            borderColor: '#007BFF',
            color: '#007BFF',
            backgroundColor: 'white',
            width: '150px',
            marginRight: '15px',
          }}
          onClick={() => setNoModal('login')}
        >
          {t('mainPage.GoBack')}
        </Button>
      )}
      <Button
        htmlType="submit"
        loading={loading}
        onClick={() => form.submit()}
        style={{ width: noModal ? '150px' : '100%' }}
      >
        {t('mainPage.ToBeContinued')}
      </Button>
    </Row>
  );

  useImperativeHandle(ref, () => ({
    submit: async () => {
      await form.validateFields();
      onFinish(form.getFieldsValue());
      if (noModal) setLoadingRegister(true);
    },
  }));

  return (
    <>
      <div className={styles.confirmationDrawer}>
        {noModal === 'register' ? (
          <>
            <PhoneNumber form={form} onFinish={onFinish} />
            {children}
          </>
        ) : noModal === 'forgot' ? (
          <>
            <PhoneNumber form={form} onFinish={onFinish} />
            {footer}
          </>
        ) : (
          <Drawer
            bodyStyle={{ padding: '20px', background: 'white', borderRadius: '10px' }}
            style={{ borderRadius: '10px' }}
            headerStyle={{ padding: '5px 21px' }}
            title={header}
            className={isWeb ? styles.confirmationDrawerWeb : styles.confirmationDrawer}
            open={isModalVisibleConfirmation}
            onClose={() => closeConfirmationModal()}
            closable={false}
            placement="bottom"
            footer={footer}
            getContainer={isWeb && false}
          >
            <PhoneNumber form={form} onFinish={onFinish} />
          </Drawer>
        )}
      </div>

      <ConfirmationCodeModal
        start={start}
        setSessionId={setSessionId}
        setStart={setStart}
        closeConfirmationModal={closeConfirmationModal}
        getSessionId={getSessionId}
        isSessionType={isSessionType}
        getPhone={getPhone}
        closeConfirmationCodeModal={closeConfirmationCodeModal}
        isModalVisibleConfirmationCode={isModalVisibleConfirmationCode}
        isWeb={isWeb}
        noModal={noModal}
        setNoModal={setNoModal}
      />
    </>
  );
});

export default Confirmation;
