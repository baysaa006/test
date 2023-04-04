import { useLazyQuery, useQuery } from '@apollo/client';

import {
  Avatar,
  Card,
  Divider,
  List,
  Result,
  Row,
  Space,
  Typography,
  Image,
  Drawer,
  Modal,
  Button,
  Tabs,
  DatePicker,
  Col,
  Skeleton,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import { convertType } from '../../tools/Tools';
import { CURRENCY } from '../../helper/constant';
import { numberFormat } from '../../helper/utils';
import emptyLogo from '../../assets/emptyCards.png';
import {
  AndroidOutlined,
  AppleOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  CommentOutlined,
  FormOutlined,
} from '@ant-design/icons';
import SelectedOrder from './SelectedOrder';
import { useRouter } from 'next/router';
import { useStore, useStoreFoods } from '../../contexts/food.store';
import { useCartStore } from '../../contexts/cart.store';
import receiptIcon from './image/receipt.svg';
import ReceiptModal from './components/ReceiptModal';
import ReviewModal from './components/ReviewModal';
import { GET_SALES } from '../../graphql/query/sale.qeury';
import { DATE_FORMAT } from '../../constants/Constant';
import IOrders, { IOrderItem } from '../../types/order';

const { Text } = Typography;
interface ItemQuantities {
  [itemName: string]: number;
}
export default function OrderHistory(props: any) {
  const { branchData, stateOrderHistory, onClose } = props;
  const { setSale } = useStoreFoods();
  const { RangePicker } = DatePicker;
  const { setHistoryOrderID } = useCartStore();
  const [orderReview, setOrderReview] = useState();
  // const {setOrdeReview}= useStoreFoods();
  const [receiptView, setReceiptView] = useState(false);
  const [getSales, { loading, error, data }] = useLazyQuery(GET_SALES, {
    onCompleted: (data) => {
      setSale(data?.getSales.filter((z: any) => z.id === branchData?.branchId));
    },
  });
  const [dateValue, setDateValue] = useState<any>([moment(new Date(), DATE_FORMAT), moment(new Date(), DATE_FORMAT)]);

  const { t, i18n } = useTranslation('language');
  const router = useRouter();
  const { id } = router.query;
  const [visible, setVisible] = useState(false);
  const [review, setReview] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    selectedItemId: 0,
  });

  useEffect(() => {
    if (branchData) {
      getSales();
    }
  }, [branchData]);
  let filterBranchArray = data?.getSales.filter((z: any) => z.branchId === branchData?.branch.id);
  let filteredNewArray = filterBranchArray?.filter((z: any) => z.state !== 'COMPLETED' && z.state !== 'CANCELLED');
  let filteredComplete = filterBranchArray?.filter((z: any) => z.state === 'COMPLETED' || z.state === 'CANCELLED');

  const dateHistory = (e: any) => moment(e).format('YYYY.MM.DD');
  const showHistoryConfirm = (selectedItem: any) => {
    setVisible(true);
    setSelectedItems({ selectedItemId: selectedItem });
    setHistoryOrderID(selectedItem);
  };
  const onCloseSelectedDrawer = () => {
    setVisible(false);
    setHistoryOrderID('');
  };

  const emptys = (
    <div className={styles.noDataImage}>
      <Image src={emptyLogo} alt="lgo" preview={false} />
    </div>
  );

  const headerTitle = (
    <>
      <Row
        justify="center"
        style={
          id === '7d78f82b-e661-4636-b83d-d0d278256413' ? { fontFamily: 'italic, serif', fontStyle: 'italic' } : {}
        }
      >
        <Text strong>{t('mainPage.OrderHistory')}</Text>
      </Row>
      <div className={styles.closeButton}>
        <CloseOutlined style={{ fontSize: '20px' }} onClick={onClose} />
      </div>
    </>
  );

  const orderNumber = (item: any) => (
    <Space direction="vertical" size={0}>
      <Text style={{ fontSize: '12px', fontFamily: 'inherit', color: 'rgb(54 61 78 / 74%)' }}>
        {t('mainPage.OrderNumber')}:
        <Text style={{ color: '#007BFF', fontFamily: 'inherit', marginLeft: 10 }} strong>
          {item.number.slice(-4)}
        </Text>
      </Text>
      <Text style={{ fontSize: '12px', fontWeight: 'normal', color: 'rgb(54 61 78 / 74%)' }}>
        {t('mainPage.OrderStatus2')}: <Text>{t(`mainPage.${item.state}`)}</Text>
      </Text>
    </Space>
  );

  const RestaurantName = (item: any) => (
    <Text style={{ fontSize: '15px', fontFamily: 'inherit' }}>{item?.branch?.name}</Text>
  );

  const onCloseReceipt = () => {
    setReceiptView(false);
  };
  const showReview = (selectedItem: any) => {
    setSelectedItems({ selectedItemId: selectedItem });
    setReview(true);
  };

  const showReceipt = (selectedItem: any) => {
    setSelectedItems({ selectedItemId: selectedItem });
    setReceiptView(true);
  };
  const RangeDatePicker = (props: any) => {
    const panelRender = (panelNode: any) => <div className={styles.rangePicker}>{panelNode}</div>;
    return (
      <DatePicker.RangePicker
        onChange={(value) => {
          setDateValue(value);
        }}
        style={{ marginBottom: '10px', width: 'flex', justifyContent: 'center', alignItems: 'center' }}
        value={dateValue}
        size="middle"
        format={DATE_FORMAT}
        panelRender={panelRender}
        {...props}
      />
    );
  };

  function filterAndGroupSales(sales: any[], dateValue: any) {
    const filteredSales = sales?.filter((sale: any) => {
      const orderDate = new Date(sale.completedAt).toISOString().substr(0, 10);
      return orderDate >= dateValue[0].format(DATE_FORMAT) && orderDate <= dateValue[1].format(DATE_FORMAT);
    });
    const items = filteredSales?.flatMap((sale) => sale.items);
    const groups: { [itemName: string]: any[] } = {};
    items?.forEach((item) => {
      if (groups[item.name]) {
        groups[item.name].push(item);
      } else {
        groups[item.name] = [item];
      }
    });
    const result = Object.keys(groups).map((name) => {
      const items = groups[name];
      const itemsTotalQuantity = items.reduce((total, item) => total + item.actuallyQuantity, 0);
      const itemsGrandTotal = items.reduce((total, item) => total + item.total, 0);
      return { name, itemsTotalQuantity, itemsGrandTotal };
    });

    return result;
  }
  const items = filterAndGroupSales(filteredComplete, dateValue);
  const totalQuantity = items.reduce((total, item) => total + item.itemsTotalQuantity, 0);

  const totalPrice = items.reduce((total, item) => total + item.itemsGrandTotal, 0);

  const ResentHistory = () => {
    return (
      <>
        {filteredComplete?.length === 0 && filteredNewArray.length === 0 ? (
          <>
            <Result icon={emptys} title={t('mainPage.OrderHistoryNotFound')} />
          </>
        ) : (
          <></>
        )}
        {filteredNewArray?.length === 0 ? (
          <></>
        ) : (
          <>
            <Row justify="start" className={styles.headerTitle}>
              <Text strong style={{ fontSize: '18px' }}>
                {t('mainPage.ActiveSubscription')}
              </Text>
            </Row>
            <div className={styles.orderHistoryRestaurant}>
              {filteredNewArray?.map((z: any, key: any) => {
                return (
                  <>
                    <div key={key} style={{ paddingBottom: '5px' }}>
                      <Card bodyStyle={{ padding: '0px' }} style={{ padding: '12px', fontFamily: 'inherit' }}>
                        <Text style={{ color: 'rgb(54 61 78 / 74%)' }} className={styles.dateText}>
                          {dateHistory(z?.date)}
                        </Text>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              shape="square"
                              style={{ borderRadius: '10px' }}
                              size={50}
                              src={z?.branch?.logo}
                              alt="no logo"
                            />
                          }
                          title={RestaurantName(z)}
                          description={orderNumber(z)}
                        />
                        <Divider style={{ margin: '10px 0px' }} />
                        <Row justify="space-between" className={styles.completeOrderStatus}>
                          <Space direction="horizontal" size={8}>
                            <Text style={{ fontSize: '12px', fontWeight: 'normal', color: 'rgb(54 61 78 / 74%)' }}>
                              {t('mainPage.Total')}
                            </Text>
                            <Text strong>{numberFormat.format(z.totalAmount)} ₮</Text>
                          </Space>
                          {z.state === 'DRAFT' ? (
                            <>
                              <Space className={styles.resOrderButton}>
                                <Button size="small" onClick={() => showHistoryConfirm(z.id)}>
                                  {t('mainPage.Confirm')}
                                </Button>
                              </Space>
                            </>
                          ) : (
                            <>
                              <Space className={styles.resOrderButton}>
                                {/* <Button size="middle">{t('mainPage.ReOrder')}</Button> */}
                                <Button
                                  size="middle"
                                  onClick={() => showReceipt(z.id)}
                                  icon={<Image src={receiptIcon} preview={false} />}
                                ></Button>
                              </Space>
                            </>
                          )}
                        </Row>
                      </Card>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}

        {filteredComplete?.length === 0 ? (
          <></>
        ) : (
          <>
            <Row justify="start" style={{ marginTop: '20px' }}>
              <Text strong style={{ fontSize: '18px' }}>
                {t('mainPage.FulfilledOrders')}
              </Text>
            </Row>
            <div className={styles.orderHistoryRestaurant}>
              {filteredComplete?.map((z: any, key: any) => {
                return (
                  <>
                    <div key={key} style={{ paddingBottom: '5px' }}>
                      <Card bodyStyle={{ padding: '0px' }} style={{ padding: '12px', fontFamily: 'inherit' }} hoverable>
                        <div>
                          <Text style={{ color: 'rgb(54 61 78 / 74%)' }} className={styles.dateText}>
                            {dateHistory(z?.date)}
                          </Text>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                shape="square"
                                style={{ borderRadius: '10px' }}
                                size={50}
                                src={z?.branch?.logo}
                                alt="no logo"
                              />
                            }
                            title={RestaurantName(z)}
                            description={orderNumber(z)}
                          />

                          <Divider style={{ margin: '10px 0px' }} />
                        </div>
                        <Row justify="space-between" className={styles.completeOrderStatus}>
                          <Space direction="horizontal" size={8}>
                            <Text style={{ fontSize: '12px', fontWeight: 'normal', color: 'rgb(54 61 78 / 74%)' }}>
                              {t('mainPage.Total')}
                            </Text>
                            <Text strong>
                              {numberFormat.format(z.totalAmount)} ₮
                              {/* <Text
                                  style={{
                                    color: 'rgb(54 61 78 / 74%)',
                                    fontSize: '12px',
                                    fontWeight: 'normal',
                                  }}
                                >
                                  ({z.items.length}
                                  {t('mainPage.Unit')})
                                </Text> */}
                            </Text>
                          </Space>

                          <Space>
                            {/* {z.reviewed ? (
                                <></>
                              ) : (
                                <Button className={styles.reviewButton} size="middle" onClick={() => showReview(z.id)}>
                                  <Text strong style={{ color: '#fff' }}>
                                    Үнэлгээ өгөх
                                  </Text>
                                </Button>
                              )} */}

                            {/* <Button size="middle">{t('mainPage.ReOrder')}</Button> */}
                          </Space>
                          <Space className={styles.resOrderButton}>
                            {/* <Button size="middle">{t('mainPage.ReOrder')}</Button> */}
                            <Button
                              size="middle"
                              onClick={() => showReceipt(z.id)}
                              icon={<Image src={receiptIcon} preview={false} />}
                            ></Button>
                          </Space>
                        </Row>
                      </Card>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
      </>
    );
  };

  const AllHistory = () => {
    return (
      <Row style={{ width: '100%', padding: '5px' }}>
        <RangeDatePicker />
        <Row style={{ width: '100%', borderBottom: '1px solid #d6d3d3' }} justify="space-between">
          <Col span={12}>Бүтээгдэхүүний нэр</Col> <Col span={4}>Тоо</Col>{' '}
          <Col style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }} span={8}>
            Нийт
          </Col>
        </Row>
        <List
          style={{ width: '100%' }}
          itemLayout="horizontal"
          dataSource={items}
          renderItem={(item) => (
            <List.Item style={{ width: '100%' }}>
              <Row style={{ width: '100%' }} justify="space-between">
                <Col span={12}>{item.name}</Col> <Col span={4}>{item.itemsTotalQuantity}</Col>{' '}
                <Col style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }} span={8}>
                  {item.itemsGrandTotal}
                </Col>
              </Row>
            </List.Item>
          )}
        />
        <Row style={{ width: '100%', height: '50px', borderBottom: '1px solid #d6d3d3' }} justify="space-between">
          <Col span={14}>
            Нийт бүтээгдэхүүн :<Text strong> {totalQuantity}</Text>
          </Col>
          <Col span={10} style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            Нийт үнэ :<Text strong>{totalPrice}</Text>
          </Col>
        </Row>
      </Row>
    );
  };
  return (
    <>
      <div className={styles.styleModal}>
        <Modal
          centered
          bodyStyle={
            id === '7d78f82b-e661-4636-b83d-d0d278256413'
              ? { background: 'white', height: '99%', fontFamily: 'italic, serif', fontStyle: 'italic' }
              : { background: 'white', height: '99%', padding: '0px 24px' }
          }
          title={headerTitle}
          onCancel={onClose}
          visible={stateOrderHistory}
          closable={false}
          footer={false}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Захиалга тус бүр" key="1">
              <ResentHistory />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Нийт" key="2">
              <AllHistory />
            </Tabs.TabPane>
          </Tabs>
        </Modal>
        <SelectedOrder
          selectedItems={
            filterBranchArray && filterBranchArray.find((val: any) => val.id === selectedItems.selectedItemId)
          }
          visible={visible}
          onClose={onCloseSelectedDrawer}
          branchData={branchData}
        />

        {selectedItems && (
          <ReceiptModal
            visible={receiptView}
            order={filterBranchArray && filterBranchArray.find((val: any) => val.id === selectedItems.selectedItemId)}
            withVat={true}
            onClose={onCloseReceipt}
          />
        )}
        <ReviewModal
          setReviewed={setReviewed}
          visible={review}
          reviewed={reviewed}
          order={filterBranchArray && filterBranchArray.find((val: any) => val.id === selectedItems.selectedItemId)}
          onClose={() => setReview(false)}
        />
      </div>
    </>
  );
}
