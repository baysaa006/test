import { Button, Modal, Row, Space, Image, Typography, message, Spin, Alert, Result } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import contact from '../../../../../assets/bancksIcon/Bubble.png';
import { useStore, useStoreFoods } from '../../../../../contexts/food.store';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { CANCEL_ORDER } from '../../../../../graphql/mutation/payOrder';
import { isEmpty } from 'lodash';
import { useReactToPrint } from 'react-to-print';
import PrintOrder from '../../printOrder/printOrder';
import QRCode from 'qrcode';
import { GET_SALES } from '../../../../../graphql/query/sale.qeury';

const { Text } = Typography;

export default function ApprovedOrderModal(props: any) {
  const {
    value,
    isModalVisible,
    setQPayImage,
    orderType,
    stateQPayImage,
    payOrderOnclose,
    setIsModalVisible,
    stateCreateOrderData,
    onCloseDraft,
    onCloseTermsOfOrder,
  } = props;
  const { setCreateOrderID, editFoods, participant } = useStoreFoods();
  const [stateTimeOut, setTimeOut] = useState(false);
  const { addAFish, setCompleteOrderID } = useStore();
  const [qrUrl, setQrUrl] = useState('');
  const [printOrder, setPrintOrder] = useState<any>();
  const printRef = useRef(null);

  const onPrint = useReactToPrint({
    content: () => printRef.current,
  });

  const onClickPrint = async (order: any) => {
    var qrData = [{ data: isEmpty(order.vatData) ? '' : order.vatData, mode: 'numeric' }];
    try {
      await QRCode.toDataURL(qrData, { errorCorrectionLevel: 'M' })
        .then((url) => {
          setQrUrl(url);
          console.log(url);
          setPrintOrder(order);
        })
        .catch((err) => {
          console.error(err);
        });
    } finally {
      onPrint();
    }
  };

  const router = useRouter();
  const { id } = router.query;

  const { t, i18n } = useTranslation('language');

  const [stateSuccess, setSuccess] = useState(true);

  const {
    loading: orderLoading,
    error,
    data,
    refetch,
  } = useQuery(GET_SALES, {
    skip: !stateCreateOrderData?.id,
    onCompleted: (data) => {
      if (data.getSales.find((item: any) => item.id === stateCreateOrderData.id)?.paymentState === 'PAID') {
        setSuccess(false);
        if (participant?.channel === 'K') {
          onClickPrint(data.getSales.find((item: any) => item.id === stateCreateOrderData.id));
        }
      }
    },
  });

  const [cancelOrder] = useMutation(CANCEL_ORDER, {
    onCompleted: (data) => {
      editFoods([]);
      addAFish(0);
      setCreateOrderID('');
      setTimeout(() => {
        setTimeOut(false);
        router.reload();
      }, 3000);
    },
    onError(err) {
      editFoods([]);
      addAFish(0);
      message.error('амжилтгүй');
    },
  });

  const cancel = () => {
    editFoods([]);
    addAFish(0);
    setCreateOrderID('');
    router.reload();
    setPrintOrder(null);
    setQrUrl('');
  };

  const onClose = () => {
    setIsModalVisible(false);
  };

  const checkOrder = () => {
    refetch();
    if (data && data.getSales.find((item: any) => item.id === stateCreateOrderData.id)?.paymentState !== 'PAID') {
      message.info('Таны төлбөр төлөгдөөгүй байна.');
    }
    if (data && data.getSales.find((item: any) => item.id === stateCreateOrderData.id)?.paymentState === 'PAID') {
      setSuccess(false);
      if (participant?.channel === 'K') {
        onClickPrint(data.getSales.find((item: any) => item.id === stateCreateOrderData.id));
      }
    }
  };

  const addOrder = () => {
    editFoods([]);
    addAFish(0);

    if (participant?.channel === 'Q') {
      setIsModalVisible(false);
      setSuccess(true);
      payOrderOnclose();
      onCloseTermsOfOrder();
      onCloseDraft();
    }
    if (participant?.channel === 'K') {
      setTimeOut(true);
      setPrintOrder(null);
      setQrUrl('');
      setTimeout(() => {
        setTimeOut(false);
        router.reload();
      }, 3000);
    }
  };

  const finishOrder = () => {
    if (participant?.channel === 'Q') {
      setCompleteOrderID(stateCreateOrderData?.id);
      setIsModalVisible(false);
      setSuccess(true);
      payOrderOnclose();
      onCloseTermsOfOrder();
      onCloseDraft();
    }
    editFoods([]);
    addAFish(0);
    setCreateOrderID('');

    if (participant?.channel === 'K') {
      setPrintOrder(null);
      setTimeOut(true);
      setTimeout(() => {
        setTimeOut(false);
        router.reload();
      }, 3000);
    }
  };

  const successTitle = (
    <>
      <Row justify="center" className={styles.successTitle}>
        <Text>{t('mainPage.YourOrderSuccess')} </Text>
      </Row>
      <Row className={styles.successTitle} justify="center">
        <Text>{t('mainPage.YourOrderNumber')}: </Text>
        <Text className={styles.successNum} strong>
          {stateCreateOrderData?.number.slice(-4)}
        </Text>
      </Row>
    </>
  );

  const footers = (
    <div
      style={id === '7d78f82b-e661-4636-b83d-d0d278256413' ? { fontFamily: 'italic, serif', fontStyle: 'italic' } : {}}
    >
      <Row justify="center" style={{ padding: '0px 0px 15px 0px' }}>
        <Space direction="vertical">
          <div className={styles.nowPayCancelButton}>
            <Button onClick={cancel} size="large">
              {t('mainPage.GoBack')}
            </Button>
          </div>
          <div className={styles.nowPayokButton}>
            <Button loading={orderLoading} onClick={checkOrder} size="large">
              Төлсөн
            </Button>
          </div>
        </Space>
      </Row>
    </div>
  );

  const successFooter = (
    <div
      style={id === '7d78f82b-e661-4636-b83d-d0d278256413' ? { fontFamily: 'italic, serif', fontStyle: 'italic' } : {}}
    >
      <Row justify="center" style={{ padding: '0px 0px 15px 0px' }}>
        <Space direction="vertical">
          {participant?.channel === 'K' ? (
            <div className={styles.nowPayokButton}>
              <Button loading={stateTimeOut} size="large" onClick={finishOrder}>
                Гарах
              </Button>
            </div>
          ) : (
            <>
              <div className={styles.nowPayokButton}>
                <Button loading={stateTimeOut} size="large" onClick={addOrder}>
                  Нэмж захиалах
                </Button>
              </div>
              <div className={styles.nowPayokButton}>
                <Button loading={stateTimeOut} onClick={finishOrder} size="large">
                  {' '}
                  Үндсэн цэсрүү буцах{' '}
                </Button>
              </div>
            </>
          )}
        </Space>
      </Row>
    </div>
  );

  return (
    <>
      <div className={styles.nowPayDiv}>
        <Modal
          visible={isModalVisible}
          className="modalStyle"
          closable={false}
          centered
          footer={stateSuccess ? footers : successFooter}
          bodyStyle={
            id === '7d78f82b-e661-4636-b83d-d0d278256413' ? { fontFamily: 'italic, serif', fontStyle: 'italic' } : {}
          }
        >
          {printOrder && (
            <div>
              <PrintOrder
                ref={printRef}
                order={printOrder}
                withVat={printOrder?.vatState === 'G' ? true : false}
                qrUrl={qrUrl}
              />
            </div>
          )}

          <>
            {stateSuccess ? (
              <>
                {isEmpty(stateQPayImage) ? (
                  <>
                    <div>
                      <Row justify="center">
                        <Image src={contact} preview={false} />
                      </Row>

                      <Row justify="center" style={{ marginBottom: '10px' }}>
                        <Text style={{ fontWeight: '700', fontSize: '18px' }} strong>
                          Гүйлгээ хүлээгдэж байна
                        </Text>
                      </Row>
                      <Row justify="center">
                        <Text style={{ textAlign: 'center', color: 'hsla(224, 9%, 40%, 1)' }}>
                          Гүйлгээ хийгдсэнээр таны захиалга баталгаажна
                        </Text>
                      </Row>
                    </div>
                  </>
                ) : (
                  <>
                    <Row justify="center">
                      <img src={orderType ? `data:image/jpeg;base64,${stateQPayImage} ` : stateQPayImage} />
                    </Row>

                    <Row justify="center">
                      <Alert
                        message="Та банкны апп-аа нээж QR-аа уншуулна уу."
                        style={{ fontSize: 17 }}
                        type="info"
                        showIcon
                      />
                    </Row>
                  </>
                )}
              </>
            ) : (
              <div>
                <Result style={{ padding: '10px 32px 15px 32px' }} status="success" title={successTitle} />
              </div>
            )}
          </>
        </Modal>
      </div>
    </>
  );
}
