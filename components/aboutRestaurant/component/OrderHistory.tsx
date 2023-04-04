import { CloseOutlined, TagOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Avatar, Card, Divider, List, Row, Space, Tabs, Tag, Typography, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { CURRENCY } from '../../../helper/constant';
import { numberFormat } from '../../../helper/utils';
import NoResults from './NoResults';
import styles from './style.module.scss';
import logoLoader from '../../../assets/loader/logoLoader.gif';
import orders from '../../../types/order';
import { useTranslation } from 'react-i18next';
import { DRAFT_TYPE } from '../../../constants/Constant';
import { GET_SALES } from '../../../graphql/query/sale.qeury';
const { Text } = Typography;

let unPaidOder: never[] = [];

export default function OrderHistory(props: any) {
  const { onClose, restaurantInfo } = props;
  const { t, i18n } = useTranslation('language');
  const [stateUnpaid, setUnpaid] = useState<Array<orders>>([]);
  const [statePaid, setPaid] = useState<Array<orders>>([]);
  const { TabPane } = Tabs;
  const { loading, error, data } = useQuery(GET_SALES);

  useEffect(() => {
    if (data) {
      const unPaidOder = data.getSales.filter((z: any) => z.paymentState === 'UNPAID');
      if (unPaidOder) {
        setUnpaid(unPaidOder);
      }
      const paidOrder = data.getSales.filter((z: any) => z.paymentState === 'PAID');
      if (paidOrder) {
        setPaid(paidOrder);
      }
    }
    unPaidOder;
  }, [data, loading, unPaidOder]);

  const convertDraftType = (type: any) => {
    switch (type) {
      case DRAFT_TYPE.DRAFT:
        return (
          <Text strong className={styles.draftType}>
            {t('mainPage.NotPaid')}
          </Text>
        );
      case DRAFT_TYPE.NEW:
        return (
          <Text strong className={styles.draftType}>
            {t('mainPage.Received')}
          </Text>
        );
      case DRAFT_TYPE.ACCEPTED:
        return (
          <Text strong className={styles.draftType}>
            {t('mainPage.Received')}
          </Text>
        );
      case DRAFT_TYPE.COOKING:
        return (
          <Text strong className={styles.draftType}>
            {t('mainPage.CookingIsInProgress')}
          </Text>
        );
      case DRAFT_TYPE.READY:
        return (
          <Text strong className={styles.draftType}>
            {t('mainPage.TheFoodIsReady')}
          </Text>
        );
      case DRAFT_TYPE.COMPLETED:
        return (
          <Text strong className={styles.draftType}>
            {t('mainPage.FulfilledOrders')}
          </Text>
        );
      case DRAFT_TYPE.CANCELLED:
        return (
          <Text strong className={styles.draftType}>
            {t('mainPage.TheMealWasCanceled')}
          </Text>
        );
      case DRAFT_TYPE.RETURN:
        return (
          <Text strong className={styles.draftType}>
            {t('mainPage.TheFoodIsBoiled')}
          </Text>
        );
      case DRAFT_TYPE.MOVED:
        return (
          <Text strong className={styles.draftType}>
            {t('mainPage.Moved')}
          </Text>
        );
      default:
        return type;
    }
  };

  return (
    <>
      <Row justify="end" className={styles.FeedBackClose}>
        <CloseOutlined style={{ fontSize: 20 }} onClick={onClose} />
      </Row>
      {loading ? (
        <Row justify="center">
          <Image src={logoLoader} alt="loader" height={50} width={50} preview={false} />
        </Row>
      ) : (
        <Tabs type="card">
          <TabPane
            tab={
              <Text style={{ fontSize: 13, color: '#00B167' }}>
                {t('mainPage.ActiveSubscription')} ({stateUnpaid.length})
              </Text>
            }
            key="1"
          >
            <div className={styles.orderHistoryRestaurant}>
              {stateUnpaid.map((z: any, key: any) => {
                return (
                  <>
                    <div key={key}>
                      <Card hoverable>
                        <Text className={styles.dateText}> {z?.date}</Text>
                        <List.Item.Meta
                          avatar={<Avatar size={50} src={restaurantInfo?.logo} alt="no logo" />}
                          title={restaurantInfo?.name}
                          description={<Tag icon={<TagOutlined />}> {restaurantInfo?.type} </Tag>}
                        />
                        <br />
                        <Row justify="start" gutter={12}>
                          <Text style={{ color: '#007BFF' }}>
                            {t('mainPage.OrderNumber')}: {z.number}
                          </Text>
                        </Row>
                        <Divider />
                        <List
                          itemLayout="horizontal"
                          dataSource={z.items}
                          renderItem={(item: any) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Avatar size={40} src={item.image} />}
                                title={<Text style={{ fontSize: 14 }}>{item.name}</Text>}
                                description={
                                  <Row justify="space-between">
                                    <Space>
                                      <Text>{item.quantity}</Text> x<Text>{numberFormat.format(item.price)} ₮</Text>
                                    </Space>
                                    {convertDraftType(item.state)}
                                  </Row>
                                }
                              />
                            </List.Item>
                          )}
                        />

                        <Row justify="start" gutter={12}>
                          <Text>
                            {t('mainPage.Total')}:{numberFormat.format(z.totalAmount)} ₮
                          </Text>
                        </Row>
                      </Card>
                      <Divider />
                    </div>
                  </>
                );
              })}
            </div>
            {stateUnpaid.length === 0 && <NoResults />}
          </TabPane>
          <TabPane
            tab={
              <Text style={{ color: '#0BB8E4' }}>
                {t('mainPage.FulfilledOrders')}({statePaid.length})
              </Text>
            }
            key="2"
          >
            <div className={styles.orderHistoryRestaurant}>
              {statePaid.map((z: any, key: any) => {
                return (
                  <>
                    <div key={key}>
                      <Card hoverable>
                        <Text className={styles.dateText}> {z?.date}</Text>
                        <List.Item.Meta
                          avatar={<Avatar size={50} src={restaurantInfo?.logo} alt="no logo" />}
                          title={restaurantInfo?.name}
                          description={restaurantInfo?.type}
                        />
                        <Divider />
                        <List
                          itemLayout="horizontal"
                          dataSource={z.items}
                          renderItem={(item: any) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Avatar size={40} src={item.image} />}
                                title={<Text style={{ fontSize: 14 }}>{item.name}</Text>}
                                description={
                                  <Row justify="space-between">
                                    <Space>
                                      <Text>{item.quantity}</Text> x<Text> {item.price}</Text>
                                    </Space>
                                    {convertDraftType(item.state)}
                                  </Row>
                                }
                              />
                            </List.Item>
                          )}
                        />
                      </Card>
                      <Divider />
                    </div>
                  </>
                );
              })}
            </div>
            {statePaid.length === 0 && <NoResults />}
          </TabPane>
        </Tabs>
      )}
    </>
  );
}
