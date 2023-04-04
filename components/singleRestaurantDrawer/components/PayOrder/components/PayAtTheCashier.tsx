import { Button, Modal, Result, Row, Space, Image, Typography, Spin, Input, DatePicker } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import orderPic from '../../../../../assets/images/Order.png';
import { CURRENCY } from '../../../../../helper/constant';
import { handleInputClick, numberFormat } from '../../../../../helper/utils';
import { useRouter } from 'next/router';
import { useStore, useStoreFoods } from '../../../../../contexts/food.store';
import { LoadingOutlined } from '@ant-design/icons';
import { DATE_FORMAT } from '../../../../../constants/Constant';

const { Text } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#007BFF' }} spin />;
export default function PayAtTheCashier(props: any) {
  const router = useRouter();
  const { id } = router.query;
  const {
    isModalVisibleCashier,
    selectedItem,
    onCloseCashier,
    confirmOrder,
    isShow,
    loading,
    setIsShow,
    payOrderOnclose,
    onCloseTermsOfOrder,
    onCloseDraft,
    saleInputs,
    setSaleInputs,
  } = props;
  const { editFoods, setCreateOrderID, participant } = useStoreFoods();
  const { addAFish } = useStore();
  const [stateTimeOut, setTimeOut] = useState(false);
  const { t, i18n } = useTranslation('language');

  const goBack = () => {
    editFoods([]);
    addAFish(0);
    setTimeOut(true);
    setCreateOrderID('');
    setTimeout(() => {
      setTimeOut(false);
      onCloseCashier();
      payOrderOnclose();
      onCloseTermsOfOrder();
      onCloseDraft();
      setTimeOut(false);
      setIsShow(false);
    }, 1000);
  };

  const Footer = (
    <div
      style={id === '7d78f82b-e661-4636-b83d-d0d278256413' ? { fontFamily: 'italic, serif', fontStyle: 'italic' } : {}}
    >
      <Spin indicator={antIcon} spinning={loading}>
        <Row justify="center" style={{ padding: '0px 0px 15px 0px' }}>
          <Space direction="vertical">
            <div className={styles.nowPayokButton}>
              <Button onClick={confirmOrder} size="large">
                {t('mainPage.Yes')}
              </Button>
            </div>
            <div className={styles.nowPayCancelButton}>
              <Button onClick={() => onCloseCashier()} size="large">
                {t('mainPage.No')}{' '}
              </Button>
            </div>
          </Space>
        </Row>
      </Spin>
    </div>
  );

  const successTitle = (
    <>
      <Row justify="center" className={styles.successTitle}>
        <Text>{t('mainPage.YourOrderSuccess')} </Text>
      </Row>
      <Row justify="center" className={styles.successTitle}>
        <Text>{t('mainPage.YourOrderNumber')}: </Text>
        <Text style={{ color: '#007BFF', marginLeft: 10 }} strong>
          {selectedItem?.number.slice(-4)}
        </Text>
      </Row>
    </>
  );

  return (
    <>
      <div className={styles.nowPayDiv}>
        <Modal
          visible={isModalVisibleCashier}
          className="modalStyle"
          closable={false}
          centered
          footer={isShow === false && Footer}
          bodyStyle={
            id === '7d78f82b-e661-4636-b83d-d0d278256413' ? { fontFamily: 'italic, serif', fontStyle: 'italic' } : {}
          }
        >
          <Spin indicator={antIcon} spinning={loading || stateTimeOut}>
            {isShow ? (
              <>
                <Result
                  status="success"
                  title={successTitle}
                  extra={
                    <div className={styles.nowPayokButton}>
                      <Button style={{ width: '100%' }} loading={stateTimeOut} onClick={goBack} type="primary">
                        {t('mainPage.GoBack')}
                      </Button>
                    </div>
                  }
                />
              </>
            ) : (
              <>
                <Row justify="center">
                  <Image src={orderPic} preview={false} alt="logo" />
                </Row>
                <Row justify="center">
                  <Text strong>{t('mainPage.PayAtTheBoxOffice')} ?</Text>
                </Row>
                <Row justify="space-between" style={{ marginTop: '10px' }}>
                  <Text>{t('mainPage.PaymentType')}:</Text>
                  <Text strong>
                    <Text>{t('mainPage.Invoice')}</Text>
                  </Text>
                </Row>
                <Row justify="space-between" style={{ marginTop: '10px' }}>
                  <Text>{t('mainPage.Total')}:</Text>
                  <Text strong>{numberFormat.format(selectedItem?.grandTotal)} ₮</Text>
                </Row>
                <Row justify="space-between" style={{ marginTop: '10px' }}>
                  <Text>{t('mainPage.Feedback')}:</Text>
                  <Input
                    className={styles.input}
                    defaultValue={saleInputs?.comment}
                    onChange={(event) => setSaleInputs({ ...saleInputs, comment: event.target.value })}
                  />
                </Row>
                <Row justify="space-between" style={{ marginTop: '10px' }}>
                  <Text>Захиалга авах өдөр:</Text>
                  <DatePicker
                    style={{ width: '150px', borderRadius: '5px' }}
                    defaultValue={saleInputs?.preOrderDate}
                    onChange={(value) => setSaleInputs({ ...saleInputs, preOrderDate: value })}
                  />
                </Row>
                <Row justify="space-between" style={{ marginTop: '10px' }}>
                  <Text>Пин:</Text>
                  <Input.Password
                    className={styles.input}
                    required={true}
                    onClick={handleInputClick}
                    style={{}}
                    type="number"
                    defaultValue={saleInputs?.pin}
                    onChange={(event) => setSaleInputs({ ...saleInputs, pin: event.target.value })}
                  />
                </Row>
              </>
            )}
          </Spin>
        </Modal>
      </div>
    </>
  );
}
