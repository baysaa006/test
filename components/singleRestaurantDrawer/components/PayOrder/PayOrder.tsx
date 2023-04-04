import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Card, Col, Drawer, Radio, Row, Typography, Image, message, Spin, Form, Modal, Alert } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import { useStore, useStoreFoods } from '../../../../contexts/food.store';
import { CURRENCY } from '../../../../helper/constant';
import { numberFormat } from '../../../../helper/utils';
import AmountPaid from './components/AmountPaid';
import khaanBank from '../../../../assets/bancksIcon/khanbank.png';
import bogdbank from '../../../../assets/bancksIcon/bogdbank.png';
import capitronbank from '../../../../assets/bancksIcon/capitronbank.png';
import ckbank from '../../../../assets/bancksIcon/ckbank.png';
import most from '../../../../assets/bancksIcon/most.png';
import nibank from '../../../../assets/bancksIcon/nibank.png';
import statebank from '../../../../assets/bancksIcon/statebank.png';
import tdbbank from '../../../../assets/bancksIcon/tdbbank.png';
import xacbank from '../../../../assets/bancksIcon/xacbank.png';
import { Translate } from 'react-auto-translate';

import check from '../../../../assets/bancksIcon/Check.png';
import { useMutation } from '@apollo/client';
import { GET_PAY_ORDER } from '../../../../graphql/mutation/payOrder';
import { isEmpty } from 'lodash';
import ApprovedOrderModal from './components/ApprovedOrderModal';
import PayAtTheCashier from './components/PayAtTheCashier';
import { useRouter } from 'next/router';
import VATReceipt from '../TermsOfOrder/component/VATReceipt';
import { ConvertPaymentImg } from './convertImg';
import PhoneNumberModal from './components/PhoneNumberModal';
import { useReactToPrint } from 'react-to-print';
import PrintOrder from '../printOrder/printOrder';
import InfoAlert from '../../../InfoAlert/InfoAlert';

const { Text } = Typography;

let orderType: boolean = true;

interface IFeatures {
  channel: any;
  branch: string;
}

export default function PayOrderDrawer(props: any) {
  const { onClose, statePayOrderOrderDrawer, branchData, stateCreateOrderData, onCloseTermsOfOrder, onCloseDraft } =
    props;
  const { t, i18n } = useTranslation('language');

  const { editFoods, setCreateOrderID, participant } = useStoreFoods();
  const [value, setValue] = useState('');
  const { addAFish } = useStore();
  const router = useRouter();
  const printRef = useRef(null);
  const { id } = router.query;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleCashier, setIsModalVisibleCashier] = useState(false);
  const [stateValueVat, setValueVat] = useState(stateCreateOrderData?.vatType);
  const [isShow, setIsShow] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [isModalPhoneNumber, setIsModalPhoneNumber] = useState(false);
  const [stateOrderChoice, setOrderChoice] = useState(true);
  const [stateQPayImage, setQPayImage] = useState();

  const fullwidth = global.window?.innerWidth;

  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#007BFF' }} spin />;

  const onChange = (e: any) => {
    setValue(e.target.value);
    orderType = true;
  };

  const onChangeWallet = (e: any) => {
    setValue(e.target.value);
    orderType = false;
  };

  const [payOrder, { loading: paying }] = useMutation(GET_PAY_ORDER, {
    onCompleted: (data) => {
      if (participant?.channel === 'K') {
        setQPayImage(data.payOrder.transaction.image);
      } else if (participant?.channel === 'Q') {
        let findBank = data.payOrder.transaction.links.find((z: any) => z.name.toUpperCase() === value.toUpperCase());
        window.location.href = findBank.link;
      }
      setIsModalVisible(true);
      setIsModalPhoneNumber(false);
    },
    onError(err) {
      editFoods([]);
      addAFish(0);
      setIsModalPhoneNumber(false);
      message.error('Төлбөр төлөлт амжилтгүй');
    },
  });

  const [payCashier, { loading: loadCash }] = useMutation(GET_PAY_ORDER, {
    onCompleted: (data) => {
      setIsShow(true);
      editFoods([]);
      addAFish(0);
      setCreateOrderID('');
    },
    onError(err) {
      editFoods([]);
      addAFish(0);
      message.error('Төлбөр төлөлт амжилтгүй');
    },
  });

  const onPrint = useReactToPrint({
    content: () => printRef.current,
  });

  const confirmOrder = () => {
    setOrderChoice(false);
    form.submit();
    if (stateValueVat === 1 || stateValueVat === 0) {
      if (stateCreateOrderData?.id) {
        if (participant?.channel === 'K') {
          onPrint();
        }
        payCashier({
          variables: {
            input: {
              order: stateCreateOrderData?.id,
              payment: '',
              confirm: true,
              vatType: stateValueVat,
              buyer: companyName,
            },
          },
        });
      }
    }
  };

  const onClickConfirmOrder = () => {
    setIsModalVisibleCashier(true);
  };

  const onCloseCashier = () => {
    setIsModalVisibleCashier(false);
  };

  const onClosePhoneNumber = () => {
    setIsModalPhoneNumber(false);
  };
  const onFinish = (values: any) => {
    if (stateOrderChoice === true) {
      if (!isEmpty(branchData?.payments)) {
        const findObj = orderType
          ? branchData?.payments.find((val: any) => val.type === 'QPay')
          : branchData?.payments.find((val: any) => val.type === value);
        payOrder({
          variables: {
            input: {
              order: stateCreateOrderData?.id,
              payment: findObj?.id,
              confirm: false,
              ...values,
              vatType: stateValueVat,
              buyer: companyName,
            },
          },
        });
      } else {
        message.info('Төлбөрөө касс дээр төлнө үү...');
      }
    } else {
      if (participant?.channel === 'K') {
        onPrint();
      }
      payCashier({
        variables: {
          input: {
            order: stateCreateOrderData?.id,
            payment: '',
            confirm: true,
            ...values,
            vatType: stateValueVat,
            buyer: companyName,
          },
        },
      });
    }
  };

  const onFinishToki = (values: any) => {
    const findToki = branchData?.payments.find((val: any) => val.type === value);

    payOrder({
      variables: {
        input: {
          order: stateCreateOrderData?.id,
          payment: findToki?.id,
          confirm: false,
          phone: values.phone,
          ...values,
          vatType: stateValueVat,
          buyer: companyName,
        },
      },
    });
  };

  const getPayOrder = () => {
    if (value === 'Toki') {
      setIsModalPhoneNumber(true);
    } else {
      form.submit();
      if (!isEmpty(branchData?.payments)) {
        const findObj = orderType
          ? branchData?.payments.find((val: any) => val.type === 'QPay')
          : branchData?.payments.find((val: any) => val.type === value);
        payOrder({
          variables: {
            input: {
              order: stateCreateOrderData?.id,
              payment: findObj?.id,
              confirm: false,
              vatType: stateValueVat,
              buyer: companyName,
            },
          },
        });
      } else {
        message.info('Төлбөрөө касс дээр төлнө үү...');
      }
    }
  };

  const onChangeVat = (e: any) => {
    setValueVat(e.target.value);
  };

  const headerTitle = (
    <>
      <div
        style={
          id === '7d78f82b-e661-4636-b83d-d0d278256413' ? { fontFamily: 'italic, serif', fontStyle: 'italic' } : {}
        }
      >
        <div style={{ padding: '0px 16px 16px 16px ' }}>
          <div className={styles.closeButton}>
            <ArrowLeftOutlined style={{ fontSize: '20px' }} onClick={onClose} />
          </div>
          <Row justify="center">
            <Text style={{ fontSize: '17px' }} strong>
              {t('mainPage.Payment')}
            </Text>
          </Row>
        </div>
        <AmountPaid stateCreateOrderData={stateCreateOrderData} />
      </div>
    </>
  );

  const drawerFooter = (
    <>
      <div
        style={
          id === '7d78f82b-e661-4636-b83d-d0d278256413' ? { fontFamily: 'italic, serif', fontStyle: 'italic' } : {}
        }
      >
        {branchData?.advancePayment === false && (
          <Row justify="center" style={{ padding: '0px 0px 0px 0px' }}>
            <div className={styles.nowPayCancelButton}>
              <Button onClick={onClickConfirmOrder} size="large">
                {t('mainPage.PayAtTheBoxOffice')}
              </Button>
            </div>
          </Row>
        )}
        {branchData?.payments?.length === 0 ? (
          <></>
        ) : (
          <Spin indicator={antIcon} spinning={paying}>
            <Row justify="center" className={isEmpty(value) ? styles.disabledrawtButton : styles.drawtButton}>
              <Col span={24}>
                <Button disabled={isEmpty(value)} onClick={getPayOrder}>
                  <Row justify="space-between">
                    <Text className={styles.text} strong>
                      {t('mainPage.Payment')}
                    </Text>
                    <Text className={styles.totalText}>{numberFormat.format(stateCreateOrderData?.debtAmount)} ₮</Text>
                  </Row>
                </Button>
              </Col>
            </Row>
          </Spin>
        )}
      </div>
    </>
  );

  const content = (
    <>
      <div>
        <PrintOrder ref={printRef} order={stateCreateOrderData} withVat={false} />
      </div>
      <Spin indicator={antIcon} spinning={paying}>
        <div className={styles.banksRadioCard}>
          {branchData?.vat === true && (
            <VATReceipt
              onChangeVat={onChangeVat}
              stateValueVat={stateValueVat}
              setCompanyName={setCompanyName}
              companyName={companyName}
              form={form}
              onFinish={onFinish}
            />
          )}
          <br />
          {/* {!isEmpty(branchData?.payments.filter((val: any) => val.type !== 'QPay')) && (
            <Card style={{ borderRadius: '14px', marginBottom: '17px', textAlign: 'center' }}>
              <Radio.Group onChange={onChangeWallet} value={value}>
                {branchData?.payments
                  .filter((val: any) => val.type !== 'QPay')
                  .map((item: any, index: any) => (
                    <Radio
                      value={item.type}
                      className={value === item.type ? styles.bankSelectedCard : styles.banksNormalCard}
                    >
                      <Image
                        width={70}
                        style={{ padding: '0px 0px 0px 0px' }}
                        src={ConvertPaymentImg(item.type)}
                        preview={false}
                      />
                      <img src={check} className={value === item.type ? styles.checkBank : styles.unCheckBan} />
                    </Radio>
                  ))}
              </Radio.Group>
            </Card>
          )} */}
          {/* {!isEmpty(branchData?.payments) && (
            <>
              {branchData?.payments.filter((val: any) => val.type === ' QPay') && (
                <Card style={{ borderRadius: '14px', marginBottom: '17px' }}>
                  <Radio.Group onChange={onChange} value={value}>
                    <Row justify="space-around" gutter={[30, 24]}>
                      <Col style={{ textAlign: 'center' }} xs={24} sm={14} md={21} lg={23} xl={22} xxl={23}>
                        <Radio
                          value={'Khan bank'}
                          className={value === 'Khan bank' ? styles.bankSelectedCard : styles.banksNormalCard}
                        >
                          <Image width={70} src={khaanBank} preview={false} />
                          <img src={check} className={value === 'Khan bank' ? styles.checkBank : styles.unCheckBan} />
                        </Radio>

                        <Radio
                          value={'Bogd bank'}
                          className={value === 'Bogd bank' ? styles.bankSelectedCard : styles.banksNormalCard}
                        >
                          <Image width={70} src={bogdbank} preview={false} />
                          <img src={check} className={value === 'Bogd bank' ? styles.checkBank : styles.unCheckBan} />
                        </Radio>

                        <Radio
                          value={'Capitron bank'}
                          className={value === 'Capitron bank' ? styles.bankSelectedCard : styles.banksNormalCard}
                        >
                          <Image width={70} src={capitronbank} preview={false} />
                          <img
                            src={check}
                            className={value === 'Capitron bank' ? styles.checkBank : styles.unCheckBan}
                          />
                        </Radio>

                        <Radio
                          value={'Chinggis khaan bank'}
                          className={value === 'Chinggis khaan bank' ? styles.bankSelectedCard : styles.banksNormalCard}
                        >
                          <Image width={70} src={ckbank} preview={false} />
                          <img
                            src={check}
                            className={value === 'Chinggis khaan bank' ? styles.checkBank : styles.unCheckBan}
                          />
                        </Radio>

                        <Radio
                          value={'Most money'}
                          className={value === 'Most money' ? styles.bankSelectedCard : styles.banksNormalCard}
                        >
                          <Image width={70} src={most} preview={false} />
                          <img src={check} className={value === 'Most money' ? styles.checkBank : styles.unCheckBan} />
                        </Radio>

                        <Radio
                          value={'National investment bank'}
                          className={
                            value === 'National investment bank' ? styles.bankSelectedCard : styles.banksNormalCard
                          }
                        >
                          <Image width={70} src={nibank} preview={false} />
                          <img
                            src={check}
                            className={value === 'National investment bank' ? styles.checkBank : styles.unCheckBan}
                          />
                        </Radio>
                        <Radio
                          value={'State bank'}
                          className={value === 'State bank' ? styles.bankSelectedCard : styles.banksNormalCard}
                        >
                          <Image width={70} src={statebank} preview={false} />
                          <img src={check} className={value === 'State bank' ? styles.checkBank : styles.unCheckBan} />
                        </Radio>
                        <Radio
                          value={'Trade and Development bank'}
                          className={
                            value === 'Trade and Development bank' ? styles.bankSelectedCard : styles.banksNormalCard
                          }
                        >
                          <Image width={70} src={tdbbank} preview={false} />
                          <img
                            src={check}
                            className={value === 'Trade and Development bank' ? styles.checkBank : styles.unCheckBan}
                          />
                        </Radio>
                        <Radio
                          value={'Xac bank'}
                          className={value === 'Xac bank' ? styles.bankSelectedCard : styles.banksNormalCard}
                        >
                          <Image width={70} src={xacbank} preview={false} />
                          <img src={check} className={value === 'Xac bank' ? styles.checkBank : styles.unCheckBan} />
                        </Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Card>
              )}
            </>
          )} */}
        </div>
      </Spin>
    </>
  );

  const contentQr = (
    <>
      <Spin indicator={antIcon} spinning={paying}>
        {!isEmpty(branchData?.payments.filter((val: any) => val.type === 'QPay')) && (
          <InfoAlert
            text={<Translate> Та төлбөрөө төлөөд энэхүү дэлгэцрүү буцан орж захиалгаа баталгаажуулаарай.</Translate>}
            mode="info"
          />
        )}

        {branchData?.vat === true && (
          <VATReceipt
            onChangeVat={onChangeVat}
            setCompanyName={setCompanyName}
            companyName={companyName}
            stateValueVat={stateValueVat}
            stateCreateOrderData={stateCreateOrderData}
            form={form}
            onFinish={onFinish}
          />
        )}
        <br />
        <div className={styles.banksRadioCard}>
          {!isEmpty(branchData?.payments.filter((val: any) => val.type !== 'QPay')) && (
            <Card style={{ borderRadius: '14px', marginBottom: '17px', textAlign: 'center' }}>
              <Radio.Group onChange={onChangeWallet} value={value}>
                {branchData?.payments
                  .filter((val: any) => val.type !== 'QPay')
                  .map((item: any, index: any) => (
                    <Radio
                      value={item.type}
                      className={value === item.type ? styles.bankSelectedCard : styles.banksNormalCard}
                    >
                      <Image
                        width={70}
                        style={{ padding: '0px 0px 0px 0px' }}
                        src={ConvertPaymentImg(item.type)}
                        preview={false}
                      />
                      <img src={check} className={value === item.type ? styles.checkBank : styles.unCheckBan} />
                    </Radio>
                  ))}
              </Radio.Group>
            </Card>
          )}
          {!isEmpty(branchData?.payments) && (
            <>
              {branchData?.payments.filter((val: any) => val.type === 'QPay') && (
                <Card style={{ borderRadius: '14px', marginBottom: '17px' }}>
                  <Radio.Group onChange={onChange} value={value}>
                    <Row justify="space-around" gutter={[30, 24]}>
                      <Col style={{ textAlign: 'center' }} xs={24} sm={14} md={21} lg={23} xl={22} xxl={23}>
                        <Radio
                          value={'Khan bank'}
                          className={value === 'Khan bank' ? styles.bankSelectedCard : styles.banksNormalCard}
                        >
                          <Image width={70} src={khaanBank} preview={false} />
                          <img src={check} className={value === 'Khan bank' ? styles.checkBank : styles.unCheckBan} />
                        </Radio>

                        <Radio
                          value={'Bogd bank'}
                          className={value === 'Bogd bank' ? styles.bankSelectedCard : styles.banksNormalCard}
                        >
                          <Image width={70} src={bogdbank} preview={false} />
                          <img src={check} className={value === 'Bogd bank' ? styles.checkBank : styles.unCheckBan} />
                        </Radio>
                        <Radio
                          value={'Capitron bank'}
                          className={value === 'Capitron bank' ? styles.bankSelectedCard : styles.banksNormalCard}
                        >
                          <Image width={70} src={capitronbank} preview={false} />
                          <img
                            src={check}
                            className={value === 'Capitron bank' ? styles.checkBank : styles.unCheckBan}
                          />
                        </Radio>

                        <Radio
                          value={'Chinggis khaan bank'}
                          className={value === 'Chinggis khaan bank' ? styles.bankSelectedCard : styles.banksNormalCard}
                        >
                          <Image width={70} src={ckbank} preview={false} />
                          <img
                            src={check}
                            className={value === 'Chinggis khaan bank' ? styles.checkBank : styles.unCheckBan}
                          />
                        </Radio>

                        <Radio
                          value={'Most money'}
                          className={value === 'Most money' ? styles.bankSelectedCard : styles.banksNormalCard}
                        >
                          <Image width={70} src={most} preview={false} />
                          <img src={check} className={value === 'Most money' ? styles.checkBank : styles.unCheckBan} />
                        </Radio>

                        <Radio
                          value={'National investment bank'}
                          className={
                            value === 'National investment bank' ? styles.bankSelectedCard : styles.banksNormalCard
                          }
                        >
                          <Image width={70} src={nibank} preview={false} />
                          <img
                            src={check}
                            className={value === 'National investment bank' ? styles.checkBank : styles.unCheckBan}
                          />
                        </Radio>

                        <Radio
                          value={'State bank'}
                          className={value === 'State bank' ? styles.bankSelectedCard : styles.banksNormalCard}
                        >
                          <Image width={70} src={statebank} preview={false} />
                          <img src={check} className={value === 'State bank' ? styles.checkBank : styles.unCheckBan} />
                        </Radio>
                        <Radio
                          value={'Trade and Development bank'}
                          className={
                            value === 'Trade and Development bank' ? styles.bankSelectedCard : styles.banksNormalCard
                          }
                        >
                          <Image width={70} src={tdbbank} preview={false} />
                          <img
                            src={check}
                            className={value === 'Trade and Development bank' ? styles.checkBank : styles.unCheckBan}
                          />
                        </Radio>
                        <Radio
                          value={'Xac bank'}
                          className={value === 'Xac bank' ? styles.bankSelectedCard : styles.banksNormalCard}
                        >
                          <Image width={70} src={xacbank} preview={false} />
                          <img src={check} className={value === 'Xac bank' ? styles.checkBank : styles.unCheckBan} />
                        </Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Card>
              )}
            </>
          )}
        </div>
      </Spin>
    </>
  );

  useEffect(() => {
    if (stateCreateOrderData) {
      setValueVat(stateCreateOrderData?.vatType);
    }
  }, [stateCreateOrderData]);

  return (
    <>
      <div className={styles.styleModal}>
        {participant?.channel === 'K' && (
          <>
            <Modal
              bodyStyle={
                id === '7d78f82b-e661-4636-b83d-d0d278256413'
                  ? {
                      background: '#F6F7F8',
                      height: '99%',
                      padding: '20px 10px',
                      fontFamily: 'italic, serif',
                      fontStyle: 'italic',
                    }
                  : {
                      background: '#F6F7F8',
                      height: '99%',
                      padding: '20px 10px',
                    }
              }
              title={headerTitle}
              visible={statePayOrderOrderDrawer}
              closable={false}
              className="modalStyle"
              footer={drawerFooter}
              centered
              width={550}
            >
              {content}
            </Modal>
          </>
        )}

        {participant?.channel === 'Q' && (
          <>
            <Drawer
              bodyStyle={
                id === '7d78f82b-e661-4636-b83d-d0d278256413'
                  ? {
                      background: '#F6F7F8',
                      height: '99%',
                      padding: '10px 10px',
                      fontFamily: 'italic, serif',
                      fontStyle: 'italic',
                    }
                  : {
                      background: '#F6F7F8',
                      height: '99%',
                      padding: '20px 10px',
                    }
              }
              height={'100%'}
              title={headerTitle}
              placement={fullwidth > 742 ? 'right' : 'bottom'}
              onClose={onClose}
              headerStyle={{ padding: '16px 0px 0px 0px', borderRadius: '16px' }}
              visible={statePayOrderOrderDrawer}
              closable={false}
              footer={drawerFooter}
              footerStyle={{
                boxShadow: '0 10px 37px rgb(0 0 0 / 20%)',
                padding: '0px 0px ',
                borderRadius: '15px 15px 0px 0px',
                borderTop: '0px solid #f0f0f0',
              }}
            >
              {contentQr}
            </Drawer>
          </>
        )}

        {/* <ApprovedOrderModal
          stateCreateOrderData={stateCreateOrderData}
          isModalVisible={isModalVisible}
          onCloseDraft={onCloseDraft}
          setIsModalVisible={setIsModalVisible}
          payOrderOnclose={onClose}
          onCloseTermsOfOrder={onCloseTermsOfOrder}
          stateQPayImage={stateQPayImage}
          orderType={orderType}
          setQPayImage={setQPayImage}
          value={value}
        /> */}
        <PayAtTheCashier
          payOrderOnclose={onClose}
          setIsShow={setIsShow}
          onCloseTermsOfOrder={onCloseTermsOfOrder}
          onCloseDraft={onCloseDraft}
          isModalVisibleCashier={isModalVisibleCashier}
          selectedItem={stateCreateOrderData}
          onCloseCashier={onCloseCashier}
          confirmOrder={confirmOrder}
          loading={loadCash}
          isShow={isShow}
        />
        {/* <PhoneNumberModal
          paying={paying}
          onFinish={onFinishToki}
          isModalPhoneNumber={isModalPhoneNumber}
          onClose={onClosePhoneNumber}
        /> */}
      </div>
    </>
  );
}
