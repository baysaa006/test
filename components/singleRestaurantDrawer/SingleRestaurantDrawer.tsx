import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, List, message, Modal, Row, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';
import DraftOrder from './components/DraftOrder/DraftOrder';
import { CURRENCY } from '../../helper/constant';
import { numberFormat } from '../../helper/utils';
import { useStore, useStoreFoods } from '../../contexts/food.store';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import moment from 'moment';
import { optionsCalc } from '../../tools/Tools';
import PayAtTheCashier from './components/PayOrder/components/PayAtTheCashier';
import { CREATE_SALE } from '../../graphql/mutation/createSale';
import { GET_PAY_SALE } from '../../graphql/mutation/paySale';
import { GET_SALES } from '../../graphql/query/sale.qeury';
import ApprovedOrderModal from './components/PayOrder/components/ApprovedOrderModal';
import { DATE_FORMAT } from '../../constants/Constant';

export default function SingleRestaurantDrawer(props: any) {
  const { Text } = Typography;
  const { t, i18n } = useTranslation('language');
  const router = useRouter();
  const { id } = router.query;
  const { setVisible, visible, branchData, isIndex } = props;

  const [stateTermsOfOrderDrawer, setTermsOfOrderDrawer] = useState(false);
  const [statePayOrderOrderDrawer, setPayOrderDrawer] = useState(false);
  const [stateCreateOrderData, setCreateOrderDate] = useState<any>();
  const [isShow, setIsShow] = useState(false);
  const [isModalVisibleCashier, setIsModalVisibleCashier] = useState(false);
  const [stateOrderChoice, setOrderChoice] = useState(true);
  const [saleInputs, setSaleInputs] = useState({
    pin: '',
    preOrderDate: moment(new Date(), DATE_FORMAT),
    comment: '',
  });
  const fullwidth = global.window?.innerWidth;
  const { participant } = useStoreFoods();

  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#007BFF' }} spin />;

  const { foods, setCreateOrderID, setGroupId, editFoods, createOrderId } = useStoreFoods();
  const { addAFish } = useStore();

  let salePrice = foods?.reduce(
    (a: any, b: any) => a + Math.abs(optionsCalc(b.options) + b.basesPrice) * b.quantity,
    0,
  );

  // useEffect(() => {
  //   getRecommds({
  //     variables: {
  //       ids: foods.map((e) => e.productId),
  //       menuId: branchData?.menu.id,
  //     },
  //   });
  // }, [foods]);

  // const [getRecommds, { loading, data }] = useLazyQuery<{
  //   getMenuProductRecommendations: any;
  // }>(GET_MENU_PRODUCTS_RECOMMENDATIONS, {
  //   fetchPolicy: 'cache-first',
  // });
  // const filterRecommendatiions = data?.getMenuProductRecommendations?.filter(
  //   (item: any, index: any, self: any) =>
  //     item.active && index === self.findIndex((t: any) => t.productId === item.productId),
  // );
  // const [payCashier, { loading: loadCash }] = useMutation(GET_PAY_ORDER, {
  //   onCompleted: (data) => {
  //     setIsShow(true);
  //     editFoods([]);
  //     addAFish(0);
  //     setCreateOrderID('');
  //   },
  //   onError(err) {
  //     editFoods([]);
  //     addAFish(0);
  //     message.error('Төлбөр төлөлт амжилтгүй');
  //   },
  // });
  const [confirmSale, { loading: loadSale }] = useMutation(GET_PAY_SALE, {
    onCompleted: (data) => {
      setIsShow(true);
      editFoods([]);
      addAFish(0);
      setCreateOrderID('');
      setSaleInputs({ ...saleInputs, pin: '', preOrderDate: moment(new Date(), DATE_FORMAT), comment: '' });
    },
    onError(err) {
      if (err.message === 'PIN буруу байна!') {
        setSaleInputs({ ...saleInputs, pin: '' });
        message.error('PIN буруу байна!');
      } else message.error('Захиалга амжилтгүй');
      editFoods([]);
      addAFish(0);
    },
  });

  const [createSale, { loading }] = useMutation(CREATE_SALE, {
    update(cache, { data: { createSale } }) {
      const caches = cache.readQuery<{ getSales: any[] }>({ query: GET_SALES });
      if (caches && caches.getSales) {
        cache.writeQuery({
          query: GET_SALES,
          data: { getSales: caches.getSales.concat([createSale]) },
        });
      }
    },
    onCompleted: (data) => {
      setCreateOrderDate(data.createSale);
      setCreateOrderID(data.createSale.id);
      setGroupId(data.createSale.groupId);
      onClickConfirmOrder();
    },
    onError(err) {
      message.warning('Баталгаажуулалт амжилтгүй');
      editFoods([]);
      addAFish(0);
      setCreateOrderID('');
    },
  });
  // const [createOrder, { loading: loadingForm }] = useMutation(CREATE_ORDER, {
  //   update(cache, { data: { createOrder } }) {
  //     const caches = cache.readQuery<{getSales: orders[] }>({ query: GET_SALES });
  //     if (caches && caches.getOrders) {
  //       cache.writeQuery({
  //         query: GET_SALES,
  //         data: {getSales: caches.getOrders.concat([createOrder]) },
  //       });
  //     }
  //   },

  //   onCompleted: (data) => {
  //     setCreateOrderDate(data.createOrder);
  //     setCreateOrderID(data.createOrder.id);
  //     setGroupId(data.createOrder.groupId);
  //     onClickConfirmOrder();
  //   },
  //   onError(err) {
  //     message.warning('Баталгаажуулалт амжилтгүй');
  //     editFoods([]);
  //     addAFish(0);
  //     setCreateOrderID('');
  //   },
  // });
  const confirmOrder = () => {
    setOrderChoice(false);
    if (stateCreateOrderData?.id) {
      confirmSale({
        variables: {
          pin: saleInputs.pin,
          id: stateCreateOrderData?.id,
          comment: saleInputs.comment,
          preOrderDate: saleInputs.preOrderDate.format(DATE_FORMAT),
        },
      });
    }
  };
  const showTermsOfOrder = () => {
    if (foods.length === 0) return;
    let sales: any[] = foods.map((val: any) => {
      return {
        quantity: val.quantity,
        id: val.variantsId,
      };
    });
    createSale({
      variables: {
        input: {
          items: sales,
        },
      },
    });
  };

  const showPayOrder = () => {
    showTermsOfOrder();
  };

  const onCloseTermsOfOrder = () => {
    setTermsOfOrderDrawer(false);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onClickConfirmOrder = () => {
    setIsModalVisibleCashier(true);
  };

  const onCloseCashier = () => {
    setIsModalVisibleCashier(false);
  };
  const headerTitle = (
    <>
      <div className={styles.closeButton}>
        <ArrowLeftOutlined style={{ fontSize: '20px' }} onClick={onClose} />
      </div>
      <Row
        justify="center"
        style={
          id === '7d78f82b-e661-4636-b83d-d0d278256413' ? { fontFamily: 'italic, serif', fontStyle: 'italic' } : {}
        }
      >
        <Text style={{ fontSize: '18px' }} strong>
          {t('mainPage.MyOrder')}
        </Text>
      </Row>
    </>
  );

  const drawerFooter = (
    <>
      <Row
        justify="center"
        style={
          id === '7d78f82b-e661-4636-b83d-d0d278256413' ? { fontFamily: 'italic, serif', fontStyle: 'italic' } : {}
        }
        className={foods.length === 0 ? styles.draftDisableButton : styles.draftButton}
      >
        <Col span={24}>
          <Button onClick={() => showPayOrder()}>
            <Row justify="space-between">
              <Text className={styles.text} strong>
                {t('mainPage.Confirm')}
              </Text>
              <Text className={styles.totalText}>
                {isNaN(salePrice) ? <>0</> : <>{numberFormat.format(salePrice)}</>}₮{}
              </Text>
            </Row>
          </Button>
        </Col>
      </Row>
    </>
  );

  const content = (
    <div
      style={{
        minHeight: '100%',
        height: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Spin indicator={antIcon} spinning={loading}>
        <DraftOrder onClose={onClose} />
        {/* <TermsOfOrderDrawer
          branchData={branchData}
          setCreateOrderDate={setCreateOrderDate}
          stateTermsOfOrderDrawer={stateTermsOfOrderDrawer}
          onClose={onCloseTermsOfOrder}
          showPayOrder={showPayOrder}
        /> */}
        {/* <PayOrderDrawer
          setCreateOrderDate={setCreateOrderDate}
          onCloseDraft={onClose}
          onCloseTermsOfOrder={onCloseTermsOfOrder}
          stateCreateOrderData={stateCreateOrderData}
          branchData={branchData}
          onClose={onClosePayOrder}
          statePayOrderOrderDrawer={statePayOrderOrderDrawer}
        /> */}
        <PayAtTheCashier
          payOrderOnclose={onClose}
          setIsShow={setIsShow}
          saleInputs={saleInputs}
          setSaleInputs={setSaleInputs}
          onCloseTermsOfOrder={onCloseTermsOfOrder}
          onCloseDraft={onClose}
          isModalVisibleCashier={isModalVisibleCashier}
          selectedItem={stateCreateOrderData}
          onCloseCashier={onCloseCashier}
          confirmOrder={confirmOrder}
          loading={loadSale}
          isShow={isShow}
        />
      </Spin>
      {/* {filterRecommendatiions?.length > 0 && (
        <div>
          <Row style={{ padding: '10px 0px ' }}>
            <Text className={styles.foodNames} strong>
              <Text strong>Санал болгох бүтээгдэхүүн</Text>
            </Text>
          </Row>
          <List
            className={styles.mobileCard}
            dataSource={filterRecommendatiions}
            renderItem={(item, index) => (
              <>
                <List.Item className={styles.shopCardDiv}>
                  <OrderFoodCard isList={1} hidePrice key={index} keys={index} items={item} />
                </List.Item>
              </>
            )}
          />
        </div>
      )} */}
    </div>
  );

  return (
    <>
      <div className={styles.styleModal}>
        {participant?.channel === 'K' && (
          <>
            <Modal
              bodyStyle={
                id === '7d78f82b-e661-4636-b83d-d0d278256413'
                  ? {
                      background: 'white',
                      height: '99%',
                      fontFamily: 'italic, serif',
                      fontStyle: 'italic',
                      padding: '9px',
                      width: '100%',
                    }
                  : { background: 'white', height: '99%', padding: '0', width: '100%' }
              }
              title={headerTitle}
              className="modalStyle"
              visible={visible}
              closable={false}
              centered
              footer={drawerFooter}
            >
              {content}
            </Modal>
          </>
        )}
        {participant && (
          <Drawer
            bodyStyle={
              id === '7d78f82b-e661-4636-b83d-d0d278256413'
                ? { background: 'white', height: '99%', fontFamily: 'italic, serif', fontStyle: 'italic' }
                : {
                    background: 'white',
                    height: '99%',
                    padding: '0',
                    width: '100%',
                    borderTop: '1px solid #d6d3d3',
                  }
            }
            height={'100%'}
            title={headerTitle}
            className={styles.drawer}
            placement={fullwidth > 742 ? 'right' : 'bottom'}
            onClose={onClose}
            visible={visible}
            closable={false}
            footer={drawerFooter}
            footerStyle={{ boxShadow: '0 10px 37px rgb(0 0 0 / 20%)' }}
          >
            {content}
          </Drawer>
        )}
      </div>
    </>
  );
}
