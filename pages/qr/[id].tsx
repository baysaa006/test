import { useMutation } from '@apollo/client';
import { Button, Col, Form, Image, Input, message, Modal, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { useStore, useStoreFoods } from '../../contexts/food.store';
import { CURRENT_TOKEN } from '../../graphql/mutation/scan';
import styles from '../layout/style.module.scss';
import logoLoader from '../../assets/loader/logoLoader.gif';
import { handleInputClick, numberFormat } from '../../helper/utils';
import { t } from 'i18next';
const Qr = () => {
  const router = useRouter();
  const { id } = router.query;
  const { editFoods, setCreateOrderID } = useStoreFoods();
  const { addAFish, setCompleteOrderID } = useStore();
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState<any>();

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
      message.warning(err.message);
      // router.push('/notfound');
    },
  });

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
      }
      changeQr(id.toString());
      getCurrentToken({ variables: { pin: password, code: id } });
    }
  }, [verified]);

  return (
    <>
      <div className={styles.qmenuLoader}>
        <Row justify="center">
          <Image src={logoLoader} alt="loader" height={50} width={50} preview={false} />
        </Row>
      </div>
      <Modal
        centered
        title={<Typography>Та нууц үгээ оруулна уу.</Typography>}
        closable={false}
        style={{ borderRadius: '15px' }}
        footer={null}
        visible={!verified}
      >
        <Row gutter={24} justify="center" style={{ marginTop: '10px' }}>
          <Input.Password
            size="small"
            required={true}
            onClick={handleInputClick}
            type="number"
            onChange={(event) => setPassword(event.target.value)}
          />
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
