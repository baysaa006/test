import { Drawer, Row, Image, Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import expand from '../../../assets/orderTypesPic/Expand.png';
import ConfirmationCode from './components/confirmationCode';
import PersonInformation from './PersonInformation';
import { isEmpty } from 'lodash';
import { useMutation } from '@apollo/client';
import { UPDATE_PHONE, VERIFY_SESSION } from '../../../graphql/mutation/getSession';
import SuccessModal from './components/SuccessModal';

export default function ConfirmationCodeModal(props: any) {
  const {
    isModalVisibleConfirmationCode,
    getSessionId,
    getPhone,
    start,
    setStart,
    setSessionId,
    isSessionType,
    closeConfirmationModal,
    closeConfirmationCodeModal,
    isWeb,
    noModal,
    setNoModal,
  } = props;
  const [isModalVisiblePersonInformation, setIsModalVisiblePersonInformation] = useState(false);
  let pinCode: string;

  const [stateLoading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateSuccessTitle, setSuccessTitle] = useState('');
  const { t } = useTranslation('language');

  const [stateVal, setVal] = useState('');
  const [stateVal1, setVal1] = useState('');
  const [stateVal2, setVal2] = useState('');
  const [stateVal3, setVal3] = useState('');

  const [updatePhone, { loading: loadingPhone }] = useMutation(UPDATE_PHONE, {
    onCompleted: (data) => {
      setSuccessTitle(t('mainPage.SuccessfullyUpdated'));
      if (noModal && setNoModal) {
        setNoModal('success');
      } else {
        setIsModalVisible(true);
      }
      setVal('');
      setVal1('');
      setVal2('');
      setVal3('');
      setLoading(false);
    },
    onError(err) {
      message.warning(t('mainPage.FailedTryAgain'));
      setVal('');
      setVal1('');
      setVal2('');
      setVal3('');
      setLoading(false);
    },
  });

  const [verifySession, { loading }] = useMutation(VERIFY_SESSION, {
    onCompleted: (data) => {
      if (noModal === 'confirmationCode') {
        setNoModal('person');
      } else if (noModal === 'confirmationCodeForgot') {
        setNoModal('personForgot');
      } else {
        setIsModalVisiblePersonInformation(data.verifySession);
      }
      setVal('');
      setVal1('');
      setVal2('');
      setVal3('');
      setLoading(false);
    },
    onError(err) {
      message.warning(t('mainPage.FailedTryAgain'));
      setVal('');
      setVal1('');
      setVal2('');
      setVal3('');
      setLoading(false);
    },
  });

  useEffect(() => {
    if (!isEmpty(stateVal && stateVal1 && stateVal && stateVal3)) {
      if (stateVal) {
        pinCode = stateVal + stateVal1 + stateVal2 + stateVal3;
      }
      if (getSessionId) {
        setLoading(true);
        if (isSessionType === 'C') {
          updatePhone({ variables: { pin: pinCode, session: getSessionId } });
        } else {
          verifySession({ variables: { id: getSessionId, pin: pinCode } });
        }
      }
    }
  }, [stateVal, stateVal1, stateVal2, stateVal3]);

  const closePersonInformationModal = () => {
    setIsModalVisiblePersonInformation(false);
  };

  const showPersonInformation = () => {
    if (noModal === 'confirmationCode') {
      setNoModal('person');
    } else if (noModal === 'confirmationCodeForgot') {
      setNoModal('personForgot');
    } else {
      setIsModalVisiblePersonInformation(true);
    }
  };

  const header = (
    <>
      <Row justify="center" onClick={() => closeConfirmationCodeModal()}>
        <Image src={expand} preview={false} />
      </Row>
    </>
  );

  const footer = (
    <Row justify="center" className={styles.continueButton}>
      {(noModal === 'confirmationCode' || noModal === 'confirmationCodeForgot') && (
        <Button
          style={{
            borderColor: '#007BFF',
            color: '#007BFF',
            backgroundColor: 'white',
            width: '150px',
            marginRight: '15px',
          }}
          onClick={() => (noModal === 'confirmationCode' ? setNoModal('register') : setNoModal('forgot'))}
        >
          {t('mainPage.GoBack')}
        </Button>
      )}
      <Button
        loading={stateLoading}
        disabled={isEmpty(stateVal && stateVal1 && stateVal2 && stateVal3)}
        style={
          isEmpty(stateVal && stateVal1 && stateVal2 && stateVal3)
            ? {
                borderColor: '#e8ebee',
                backgroundColor: '#e8ebee',
                width: noModal ? '150px' : '100%',
              }
            : { width: noModal ? '150px' : '100%' }
        }
        onClick={showPersonInformation}
      >
        {t('mainPage.ToBeContinued')}
      </Button>
    </Row>
  );

  const fullHeight = global.window?.innerHeight;

  return (
    <>
      <div className={styles.confirmationDrawer}>
        {noModal === 'confirmationCode' || noModal === 'confirmationCodeForgot' ? (
          <>
            <ConfirmationCode
              getPhone={getPhone}
              start={start}
              setStart={setStart}
              setSessionId={setSessionId}
              stateVal={stateVal}
              stateVal1={stateVal1}
              stateVal2={stateVal2}
              stateVal3={stateVal3}
              setVal={setVal}
              setVal1={setVal1}
              setVal2={setVal2}
              setVal3={setVal3}
            />
            {footer}
          </>
        ) : (
          <Drawer
            bodyStyle={{ padding: '20px', background: 'white', borderRadius: '10px' }}
            style={{ borderRadius: '10px' }}
            headerStyle={{ padding: '5px 21px' }}
            title={header}
            className={isWeb ? styles.confirmationDrawerWeb : styles.confirmationDrawer}
            open={isModalVisibleConfirmationCode}
            closable={false}
            placement="bottom"
            footer={footer}
            getContainer={isWeb && false}
          >
            <ConfirmationCode
              getPhone={getPhone}
              start={start}
              setStart={setStart}
              setSessionId={setSessionId}
              stateVal={stateVal}
              stateVal1={stateVal1}
              stateVal2={stateVal2}
              stateVal3={stateVal3}
              setVal={setVal}
              setVal1={setVal1}
              setVal2={setVal2}
              setVal3={setVal3}
            />
          </Drawer>
        )}
      </div>

      <PersonInformation
        closeConfirmationModal={closeConfirmationModal}
        isSessionType={isSessionType}
        getPhone={getPhone}
        getSessionId={getSessionId}
        closePersonInformationModal={closePersonInformationModal}
        isModalVisiblePersonInformation={isModalVisiblePersonInformation}
        isWeb={isWeb}
        noModal={noModal}
        setNoModal={setNoModal}
      />

      <SuccessModal
        stayHere={false}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title={stateSuccessTitle}
      />
    </>
  );
}
