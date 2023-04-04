import { CloseOutlined, LoadingOutlined, RightOutlined } from '@ant-design/icons';
import { Alert, Avatar, Card, Col, Divider, Drawer, List, Row, Typography, Image, message, Spin, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { convertPaymentType, convertType } from '../../tools/Tools';
import styles from './style.module.scss';
import cash from '../../assets/images/cash.png';
import OrderHistoryCard from '../foodCard/orderHistoryCard';
import { CURRENCY } from '../../helper/constant';
import { numberFormat } from '../../helper/utils';
import { useMutation } from '@apollo/client';
import { GET_PAY_ORDER } from '../../graphql/mutation/payOrder';
import { useCartStore } from '../../contexts/cart.store';
import { useRouter } from 'next/router';
import { useStore, useStoreFoods } from '../../contexts/food.store';
import OrderReviewModal from './OrderReviewModal';
import { useTranslation } from 'react-i18next';
import { DRAFT_TYPE } from '../../constants/Constant';

const { Text } = Typography;

export default function OrderHistoryConfirm(props: any) {
  const {
    visible,
    onClose,
    selectedItems,
    statePaymentData,
    advancePayment,
    showConfirm,
    setVisibles,
    setDraftData,
    setDraft,
  } = props;
  const { setCatchPaymentArray } = useCartStore();
  const [stateLoading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t, i18n } = useTranslation('language');
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#007BFF' }} spin />;
  const { foods, editFoods, setCreateOrderID, createOrderId } = useStoreFoods();
  const { addAFish } = useStore();
  const router = useRouter();
  const drawerHeader = (
    <Row justify="end">
      <CloseOutlined style={{ fontSize: '20px' }} onClick={onClose} />
    </Row>
  );

  const [payOrder] = useMutation(GET_PAY_ORDER, {
    onCompleted: (data) => {
      setCatchPaymentArray(data.payOrder.transaction.links);
      router.push(`/transaction?id=${data.payOrder.order.id}`);
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

  const clickers = (e: any, valueTypeId: any) => {
    if (valueTypeId) {
      payOrder({ variables: { input: { order: selectedItems?.id, payment: valueTypeId } } });
      setLoading(true);
    }
  };

  const clickIsShowKass = () => {
    setIsModalVisible(true);
  };

  const convertDraftTypeText = (type: any) => {
    switch (type) {
      case DRAFT_TYPE.DRAFT:
        return (
          <Text strong style={{ color: '#007BFF' }}>
            {t('mainPage.NotPaid')}
          </Text>
        );
      case DRAFT_TYPE.NEW:
        return (
          <Text strong style={{ color: '#007BFF', fontSize: 12, marginTop: 2 }}>
            {t('mainPage.Received')}
          </Text>
        );
      case DRAFT_TYPE.ACCEPTED:
        return (
          <Text strong style={{ color: '#007BFF' }}>
            {t('mainPage.Received')}
          </Text>
        );
      case DRAFT_TYPE.COOKING:
        return (
          <Text strong style={{ color: '#007BFF' }}>
            {t('mainPage.CookingIsInProgress')}
          </Text>
        );
      case DRAFT_TYPE.READY:
        return (
          <Text strong style={{ color: '#007BFF' }}>
            {t('mainPage.TheFoodIsReady')}
          </Text>
        );
      case DRAFT_TYPE.COMPLETED:
        return (
          <Text strong style={{ color: '#007BFF' }}>
            {t('mainPage.FulfilledOrders')}
          </Text>
        );
      case DRAFT_TYPE.CANCELLED:
        return (
          <Text strong style={{ color: '#007BFF' }}>
            {t('mainPage.TheMealWasCanceled')}
          </Text>
        );
      case DRAFT_TYPE.RETURN:
        return (
          <Text strong style={{ color: '#007BFF' }}>
            {t('mainPage.TheFoodIsBoiled')}
          </Text>
        );
      default:
        return type;
    }
  };

  return (
    <>
      <div className={styles.orderHistoryDiv}>
        <Drawer
          title={drawerHeader}
          height={'100%'}
          closeIcon={false}
          onClose={onClose}
          visible={visible}
          placement="bottom"
          drawerStyle={{ borderRadius: '20px' }}
          contentWrapperStyle={{ borderRadius: '20px' }}
          bodyStyle={{ borderRadius: '20px' }}
          style={{ borderRadius: '20px' }}
          headerStyle={{ borderRadius: '20px 20px 20px 20px', borderBottom: '0px', padding: '20px 19px 10px 10px' }}
        >
          {showConfirm ? (
            <></>
          ) : (
            <>
              {' '}
              <Row>
                <List.Item.Meta
                  title={<Text style={{ fontSize: '14px', fontWeight: 'normal' }}>{t('mainPage.OrderStatus')}</Text>}
                  description={convertDraftTypeText(selectedItems?.state)}
                  avatar={<Avatar shape="square" size={50} src={convertType(selectedItems?.type)} />}
                />
              </Row>
              {/* <br /> */}
              {selectedItems?.state === 'COMPLETED' ? (
                // <Row className={styles.orderHistoryDone}>
                //   <Alert message={t('mainPage.succesAlert')} type="success" showIcon />
                // </Row>
                <></>
              ) : (
                <></>
                // <Row className={styles.orderHistoryAlert}>
                //   <Alert message={t('mainPage.succesInfo')} type="info" showIcon />
                // </Row>
              )}
              <br />
              {/* <Divider style={{ margin: '10px 0px 10px 0px' }} /> */}
            </>
          )}
          <Row style={{ marginBottom: '10px' }}>
            <Text strong style={{ fontSize: '17px' }}>
              {t('mainPage.YourOrder')}
            </Text>
          </Row>
          {selectedItems?.items.map((item: any, index: any) => (
            <OrderHistoryCard key={index} keys={item.id} items={item} />
          ))}
          <Divider style={{ margin: '10px 0px 10px 0px' }} />
          <Row style={{ marginBottom: '10px' }}>
            <Text strong style={{ fontSize: '17px' }}>
              {t('mainPage.PaymentInformation')}
            </Text>
          </Row>

          <Row justify="space-between" style={{ marginTop: '10px' }}>
            <Text>{t('mainPage.Discount')}:</Text>
            <Text strong>{numberFormat.format(selectedItems?.discountAmount)} ₮</Text>
          </Row>
          <Row justify="space-between" style={{ marginTop: '10px' }}>
            <Text>{t('mainPage.Tax')}:</Text>
            <Text strong>{numberFormat.format(selectedItems?.taxAmount)} ₮</Text>
          </Row>

          <Row justify="space-between" style={{ marginTop: '10px' }}>
            <Text>{t('mainPage.Total')}:</Text>
            <Text strong>{numberFormat.format(selectedItems?.grandTotal)} ₮</Text>
          </Row>
          <br />
          <br />
          <>
            {selectedItems?.state === 'NEW' ? (
              <></>
            ) : (
              <>
                {stateLoading ? (
                  <>
                    <Spin indicator={antIcon} />
                    <br />
                  </>
                ) : (
                  <>
                    {statePaymentData?.length === 0 ? (
                      <></>
                    ) : (
                      <List
                        dataSource={statePaymentData}
                        renderItem={(item: any) => (
                          <>
                            <div className={styles.paymentButton}>
                              <Card hoverable>
                                <List.Item
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    clickers(e, item?.id);
                                  }}
                                >
                                  <Row>
                                    <Image src={convertPaymentType(item.type)} alt="logo" preview={false} width={30} />
                                    <Text style={{ marginLeft: '10px', marginBottom: '4px' }} strong>
                                      {item.name}- {t('mainPage.toPay')}
                                    </Text>
                                  </Row>
                                  <RightOutlined />
                                </List.Item>
                              </Card>
                            </div>
                          </>
                        )}
                      />
                    )}

                    {advancePayment ? (
                      <></>
                    ) : (
                      <>
                        <>
                          <div className={styles.kassButton}>
                            <Card hoverable>
                              <Row onClick={(e) => clickIsShowKass()} justify="space-between">
                                <Space>
                                  <Image src={cash} alt="logo" preview={false} width={30} />
                                  <Text style={{ marginLeft: '10px', marginTop: '4px' }} strong>
                                    {t('mainPage.PayAtTheBoxOffice')}
                                  </Text>
                                </Space>
                                <RightOutlined style={{ marginTop: '8px' }} />
                              </Row>
                            </Card>
                          </div>
                        </>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
          {/* ) : (
            <></>
          )} */}

          {/* <OrderReviewModal
            setVisible={setVisibles}
            cashId={selectedItems?.id}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            totalCounts={selectedItems?.grandTotal}
            setDraftData={setDraftData}
            setDraft={setDraft}
          /> */}
        </Drawer>
      </div>
    </>
  );
}
