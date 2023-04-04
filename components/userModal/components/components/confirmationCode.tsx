import { useMutation } from '@apollo/client';
import { Button, Input, message, Row, Space, Typography } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { PATTERN_CODE } from '../../../../constants/Pattern';
import { GET_SESSION } from '../../../../graphql/mutation/getSession';
import styles from '../style.module.scss';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;
export default function ConfirmationCode(props: any) {
  const {
    stateVal,
    setVal,
    stateVal1,
    setVal1,
    stateVal2,
    setVal2,
    stateVal3,
    setVal3,
    getPhone,
    setStart,
    start,
    setSessionId,
  } = props;
  const verifyInput = useRef<HTMLInputElement>(null);
  const verifyInput1 = useRef<HTMLInputElement>(null);
  const verifyInput2 = useRef<HTMLInputElement>(null);
  const verifyInput3 = useRef<HTMLInputElement>(null);
  const { t } = useTranslation('language');
  const [firstFocus, setFirstFocus] = useState([]);
  const [getSession, { loading }] = useMutation(GET_SESSION, {
    onCompleted: (data) => {
      setTime(60000);
      setStart(true);
      setSessionId(data.getSession);
    },
    onError(err) {
      message.warning(t('mainPage.WaitTryAgain'));
      props.closeConfirmationModal();
    },
  });

  const [time, setTime] = useState(60000);

  useEffect(() => {
    let interval: any = null;
    if (verifyInput.current && !stateVal && firstFocus.length < 3) {
      verifyInput.current.focus();
      const arr: any = ['1'];
      setFirstFocus(firstFocus.concat(arr));
    }
    if (start) {
      if (time < 1) {
        setStart(false);
      } else {
        interval = setInterval(() => {
          setTime((preTime) => preTime - 10);
        }, 10);
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start, time]);

  const onChangeMask = (e: any) => {
    if (!isEmpty(e.currentTarget.value)) {
      if (!isNaN(e.currentTarget.value)) {
        if (e.currentTarget.value.length === 1) {
          setVal(e.currentTarget.value);
          verifyInput1?.current?.focus();
        }
      }
    } else {
      setVal(e.currentTarget.value);
    }
  };
  const onChangeMask1 = (e: any) => {
    if (!isEmpty(e.currentTarget.value)) {
      if (!isNaN(e.currentTarget.value)) {
        if (e.currentTarget.value.length === 1) {
          setVal1(e.currentTarget.value);
          verifyInput2?.current?.focus();
        }
      }
    } else {
      verifyInput?.current?.focus();
      setVal1(e.currentTarget.value);
    }
  };
  const onChangeMask2 = (e: any) => {
    if (!isEmpty(e.currentTarget.value)) {
      if (!isNaN(e.currentTarget.value)) {
        if (e.currentTarget.value.length === 1) {
          setVal2(e.currentTarget.value);
        }
        verifyInput3?.current?.focus();
      }
    } else {
      verifyInput1?.current?.focus();
      setVal2(e.currentTarget.value);
    }
  };
  const onChangeMask3 = (e: any) => {
    if (!isEmpty(e.currentTarget.value)) {
      if (!isNaN(e.currentTarget.value)) {
        if (e.currentTarget.value.length === 1) {
          setVal3(e.currentTarget.value);
        }
      }
    } else {
      verifyInput2?.current?.focus();
      setVal3(e.currentTarget.value);
    }
  };

  const tryCode = () => {
    setFirstFocus([]);
    getSession({ variables: { phone: getPhone, type: 'R' } });
  };

  return (
    <>
      <div className={styles.phoneNumberContainer}>
        <Row>
          <Text strong className={styles.header}>
            {t('mainPage.Confirmation')}
          </Text>
        </Row>
        <br />
        <Row>
          <Text className={styles.description}>
            {t('mainPage.EnterVerificationCodePhone')} <br />{' '}
            <p style={{ color: 'hsla(223, 18%, 26%, 1)', fontWeight: 600 }}> +(976) {getPhone}</p>
          </Text>
        </Row>
        <Row justify="space-around" className={styles.confirmationInputs}>
          <input
            value={stateVal}
            className={styles.inputMaskStyle}
            ref={verifyInput}
            required
            inputMode="numeric"
            pattern={PATTERN_CODE}
            onChange={onChangeMask}
            data-format="0"
          />
          <input
            value={stateVal1}
            inputMode="numeric"
            pattern={PATTERN_CODE}
            className={styles.inputMaskStyle}
            required
            ref={verifyInput1}
            onChange={onChangeMask1}
          />
          <input
            ref={verifyInput2}
            inputMode="numeric"
            required
            pattern={PATTERN_CODE}
            value={stateVal2}
            className={styles.inputMaskStyle}
            onChange={onChangeMask2}
          />
          <input
            ref={verifyInput3}
            inputMode="numeric"
            required
            pattern={PATTERN_CODE}
            value={stateVal3}
            className={styles.inputMaskStyle}
            onChange={onChangeMask3}
          />
        </Row>
        <br />

        <Row style={{ alignItems: 'center' }} className={styles.reCodeRow}>
          <Text style={{ color: '#363D4E' }} strong>
            {t('mainPage.CodeNotReceived')}
          </Text>
          <Button
            loading={loading}
            disabled={time === 0 ? false : true}
            type="text"
            style={{ fontWeight: '600', color: time === 0 ? '#f26536' : 'hsla(223, 18%, 66%, 1)' }}
            onClick={tryCode}
          >
            <Space size={2}>
              {t('mainPage.GETITAGAIN')}
              {time === 0 ? (
                <></>
              ) : (
                <>
                  <Text style={{ color: 'hsla(223, 18%, 66%, 1)' }}>
                    ({('' + Math.floor((time / 1000) % 60)).slice(-2)})
                  </Text>
                </>
              )}
            </Space>
          </Button>
        </Row>
      </div>
    </>
  );
}
