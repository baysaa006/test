import { useMutation } from '@apollo/client';
import { Button, Col, Form, Image, Input, message, Modal, Row, Space, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { useStore, useStoreFoods } from '../../contexts/food.store';
import { CURRENT_TOKEN } from '../../graphql/mutation/scan';
import styles from '../layout/style.module.scss';
import logoLoader from '../../assets/loader/logoLoader.gif';
import { handleInputClick, numberFormat } from '../../helper/utils';
import sheild from '../../assets/icons/shield.png';
const Qr = () => {
  const router = useRouter();
  const { id } = router.query;
  const { editFoods, setCreateOrderID } = useStoreFoods();
  const { addAFish, setCompleteOrderID } = useStore();
  const [verified, setVerified] = useState(false);
  const [pinCode, setPinCode] = useState<any>(['', '', '', '']);
  const inputRefs: any = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const pinCodeString = pinCode.join('');

  const { authenticate, changeQr } = useContext(AuthContext);
  const [getCurrentToken, { data }] = useMutation(CURRENT_TOKEN, {
    onCompleted: (data) => {
      editFoods([]);
      addAFish(0);
      setCreateOrderID('');
      setCompleteOrderID('');
      authenticate(data.getBuyerToken.token, () => router.push(`/restaurant`));
    },
    onError(err) {
      if (err.message === 'PIN буруу байна!') message.warning('Та пин кодоо дахин оруулана уу!');
      setVerified(false);
    },
  });

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
      }
      changeQr(id.toString());
      getCurrentToken({ variables: { pin: pinCodeString, code: id } });
      setPinCode(['', '', '', '']);
      inputRefs[0].current.focus();
    }
  }, [verified]);
  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  const handleInputChange = (event: any, index: any) => {
    const { value } = event.target;
    const newPin = [...pinCode];
    newPin[index] = value;
    setPinCode(newPin);
    if (index < inputRefs.length - 1 && value) {
      inputRefs[index + 1].current.focus();
    } else if (index > 0 && !value) {
      inputRefs[index - 1].current.focus();
    }
    if (index === 3) {
      setVerified(true);
    }
  };
  return (
    <>
      <div className={styles.qmenuLoader}>
        <Row justify="center">
          <Image src={logoLoader} alt="loader" height={50} width={50} preview={false} />
        </Row>
      </div>
      <Modal
        centered
        title={<Typography>Та нууц үгээ оруулана уу.</Typography>}
        closable={false}
        style={{ borderRadius: '25px' }}
        width={300}
        footer={null}
        visible={!verified}
      >
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Image src={sheild} height={70} />
        </Col>
        <Row gutter={24} justify="center" style={{ marginTop: '10px' }}>
          <Col span={24} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Space size={10}>
              {pinCode.map((e: any, index: any) => (
                <Input.Password
                  id="pinCode1"
                  value={pinCode[index] || ''}
                  inputMode="numeric"
                  size="small"
                  maxLength={1}
                  ref={inputRefs[index]}
                  className={styles.input}
                  onClick={handleInputClick}
                  onChange={(event) => handleInputChange(event, index)}
                />
              ))}
            </Space>
          </Col>
          <Col style={{ marginTop: '20px' }}>
            <Button onClick={() => setVerified(true)} style={{ borderRadius: '5px', background: '#007bff' }}>
              <Typography style={{ color: 'white' }}>Баталгаажуулах</Typography>{' '}
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Qr;
