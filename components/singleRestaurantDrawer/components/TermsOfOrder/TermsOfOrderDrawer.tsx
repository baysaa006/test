import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button, Col, Drawer, Form, message, Modal, Row, Spin, Typography } from 'antd';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore, useStoreFoods } from '../../../../contexts/food.store';
import { CREATE_ORDER } from '../../../../graphql/mutation/createOrder';
import { CREATE_SALE } from '../../../../graphql/mutation/createSale';
import { GET_SALES } from '../../../../graphql/query/sale.qeury';
import { CURRENCY } from '../../../../helper/constant';
import { numberFormat } from '../../../../helper/utils';
import { optionsCalc } from '../../../../tools/Tools';
import orders from '../../../../types/order';
import OrderSummary from './component/OrderSummary';
import OrderType from './component/OrderType';
import styles from './style.module.scss';

const { Text } = Typography;

export default function TermsOfOrderDrawer(props: any) {
  const { onClose, stateTermsOfOrderDrawer, branchData, showPayOrder, setCreateOrderDate } = props;
  const { t } = useTranslation('language');
  const router = useRouter();
  const { id } = router.query;
  const { foods, editFoods, setCreateOrderID, setGroupId, createOrderId, participant } = useStoreFoods();
  const { addAFish } = useStore();
  const [form] = Form.useForm();
  const fullwidth = global.window?.innerWidth;
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#007BFF' }} spin />;

  const [valueType, setValueType] = useState(branchData?.services[0]);

  const onChangeType = (e: any) => {
    setValueType(e.target.value);
  };

  const filteredNewArray = foods.filter((z: any) => z.status === 'NEW');

  const [createSale, { loading: loadingForm }] = useMutation(CREATE_SALE, {
    update(cache, { data: { createOrder } }) {
      const caches = cache.readQuery<{ getSales: any[] }>({ query: GET_SALES });
      if (caches && caches.getSales) {
        cache.writeQuery({
          query: GET_SALES,
          data: { getSales: caches.getSales.concat([createOrder]) },
        });
      }
    },
    onCompleted: (data) => {
      setCreateOrderDate(data.createOrder);
      setCreateOrderID(data.createOrder.id);
      setGroupId(data.createOrder.groupId);
      console.log(data);
      showPayOrder();
    },
    onError(err) {
      message.warning('Баталгаажуулалт амжилтгүй');
      editFoods([]);
      addAFish(0);
      setCreateOrderID('');
    },
  });

  const onFinish = (values: any) => {
    if (!values?.deliveryDate) {
      values.deliveryDate = 'ASAP';
    }

    let orders: any[] = foods.map((val: any) => {
      return {
        quantity: val.quantity,
        id: val.variantsId,
        comment: val.comment,
      };
    });
    createSale({
      variables: {
        // id: createOrderId,
        // participant: id,
        input: {
          type: valueType,
          ...values,
          items: orders,
        },
      },
    });
  };

  const submit = () => {
    if (valueType === 'Dining') {
      let orders: any[] = foods.map((val: any) => {
        return {
          quantity: val.quantity,
          id: val.variantsId,
          comment: val.comment,
          options: isEmpty(val?.options)
            ? []
            : val.options.map((item: any) =>
                item.type === 'A' ? { id: item.id, value: item.values[0] } : { id: item.id },
              ),
        };
      });
      createSale({
        variables: {
          // id: createOrderId,
          // participant: id,
          input: {
            // type: valueType,
            deliveryDate: '',
            contact: '',
            address: '',
            name: '',
            comment: '',
            guests: 1,
            items: orders,
          },
        },
      });
    }
  };

  const drawerFooter = (
    <>
      <div
        style={
          id === '7d78f82b-e661-4636-b83d-d0d278256413' ? { fontFamily: 'italic, serif', fontStyle: 'italic' } : {}
        }
      >
        <OrderSummary />
        <Row justify="center" className={styles.drawtButton}>
          <Col span={24}>
            <Button onClick={() => submit()}>
              <Row justify="space-between">
                <Text className={styles.text} strong>
                  {t('mainPage.ToBeContinued')}
                </Text>
                <Text className={styles.totalText}>
                  {numberFormat.format(
                    filteredNewArray?.reduce(
                      (a: any, b: any) => a + Math.abs(optionsCalc(b.options) + b.basesPrice) * b.quantity,
                      0,
                    ),
                  )}
                  ₮
                </Text>
              </Row>
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );

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
        <Text style={{ fontSize: '17px' }} strong>
          {t('mainPage.TermsOfOrder')}
        </Text>
      </Row>
    </>
  );

  const content = (
    <>
      <Spin indicator={antIcon} spinning={loadingForm}>
        <OrderType
          valueType={valueType}
          onChangeType={onChangeType}
          onFinish={onFinish}
          form={form}
          branchData={branchData}
        />
      </Spin>
    </>
  );

  return (
    <div className={styles.styleModal}>
      {participant?.channel === 'K' && (
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
          className="modalStyle"
          title={headerTitle}
          visible={stateTermsOfOrderDrawer}
          closable={false}
          footer={drawerFooter}
          centered
        >
          {content}
        </Modal>
      )}
      {participant?.channel === 'Q' && (
        <>
          <Drawer
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
            height={'100%'}
            title={headerTitle}
            placement={fullwidth > 742 ? 'right' : 'bottom'}
            onClose={onClose}
            visible={stateTermsOfOrderDrawer}
            closable={false}
            footer={drawerFooter}
            footerStyle={{
              boxShadow: '0 10px 37px rgb(0 0 0 / 20%)',
              padding: '0px 0px ',
              borderRadius: '15px 15px 0px 0px',
              borderTop: '0px solid #f0f0f0',
            }}
          >
            {content}
          </Drawer>
        </>
      )}
    </div>
  );
}
