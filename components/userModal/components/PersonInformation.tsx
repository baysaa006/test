import { Drawer, Row, Image, Button, Form, message } from 'antd';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import expand from '../../../assets/orderTypesPic/Expand.png';
import Information from './components/Information';
import { YEAR_FORMAT } from '../../../constants/Constant';
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD, SIGN_UP } from '../../../graphql/mutation/sign';
import { AuthContext } from '../../../contexts/auth.context';
import SuccessModal from './components/SuccessModal';

export default function PersonInformation(props: any) {
  const { isModalVisiblePersonInformation, getSessionId, getPhone, isSessionType, isWeb, noModal, setNoModal } = props;
  const { t, i18n } = useTranslation('language');
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { authenticate } = useContext(AuthContext);
  const [stateSuccessTitle, setSuccessTitle] = useState('');

  let registerButtonLoading = false;

  const [signUp, {}] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      setSuccessTitle('Амжилттай Бүртгүүллээ');
      authenticate(data.signUp.token, () => {
        if (noModal && setNoModal) {
          setNoModal('success');
        } else {
          setIsModalVisible(true);
        }
      });
    },
    onError(err) {
      registerButtonLoading = false;
      message.warning(err.message);
    },
  });

  const [passwordReset, {}] = useMutation(FORGOT_PASSWORD, {
    onCompleted: (data) => {
      registerButtonLoading = false;
      setSuccessTitle(' Нууц үг амжилттай бүртгүүллээ.');
      if (noModal && setNoModal) {
        setNoModal('personForgotSuccess');
      } else {
        setIsModalVisible(true);
      }
    },
    onError(err) {
      registerButtonLoading = false;
    },
  });

  const header = (
    <>
      <Row justify="center" onClick={() => props.closePersonInformationModal()}>
        <Image src={expand} preview={false} />
      </Row>
    </>
  );

  const getRegister = () => {
    form.submit();
  };

  const footer = (
    <Row justify="center" className={styles.continueButton}>
      {(noModal === 'person' || noModal === 'personForgot') && (
        <Button
          style={{
            borderColor: '#007BFF',
            color: '#007BFF',
            backgroundColor: 'white',
            width: '150px',
            marginRight: '15px',
          }}
          onClick={() => (noModal === 'person' ? setNoModal('confirmationCode') : setNoModal('confirmationCodeForgot'))}
        >
          {t('mainPage.GoBack')}
        </Button>
      )}
      <Button loading={registerButtonLoading} onClick={getRegister} style={{ width: noModal ? '150px' : '100%' }}>
        {t('mainPage.register')}
      </Button>
    </Row>
  );

  const onFinish = (values: any) => {
    if (getSessionId) {
      if (isSessionType === 'P') {
        registerButtonLoading = true;
        passwordReset({
          variables: {
            password: values.password,
            session: getSessionId,
          },
        });
      } else {
        if (values.dateYear) {
          let formatDate = Number(values.dateYear);
          registerButtonLoading = true;
          signUp({
            variables: {
              input: {
                email: '',
                gender: values.gender,
                name: values.username,
                password: values.password,
                phone: getPhone,
                session: getSessionId,
                year: formatDate,
              },
            },
          });
        }
      }
    }
  };

  const fullHeight = global.window?.innerHeight;

  return (
    <>
      <div className={styles.confirmationDrawer}>
        {noModal === 'person' || noModal === 'personForgot' ? (
          <>
            <Information isSessionType={isSessionType} form={form} onFinish={onFinish} />
            {footer}
          </>
        ) : (
          <Drawer
            bodyStyle={{ padding: '20px', background: 'white', borderRadius: '10px' }}
            style={{ borderRadius: '10px' }}
            headerStyle={{ padding: '5px 21px' }}
            title={header}
            height={isSessionType === 'P' ? (fullHeight > 742 ? '40%' : '80%') : fullHeight > 742 ? '60%' : '100%'}
            open={isModalVisiblePersonInformation}
            className={isWeb ? styles.confirmationDrawerWeb : styles.confirmationDrawer}
            closable={false}
            placement="bottom"
            footer={footer}
            getContainer={isWeb && false}
          >
            <Information isSessionType={isSessionType} form={form} onFinish={onFinish} />
          </Drawer>
        )}
      </div>
      <SuccessModal
        stayHere={false}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title={stateSuccessTitle}
        noModal={noModal}
        setNoModal={setNoModal}
      />
    </>
  );
}
