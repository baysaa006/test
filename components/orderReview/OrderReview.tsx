import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Image,
  Input,
  List,
  message,
  Modal,
  Row,
  Skeleton,
  Space,
  Spin,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useStore, useStoreFoods } from '../../contexts/food.store';
import { CURRENCY } from '../../helper/constant';
import { handleInputClick, numberFormat } from '../../helper/utils';
import styles from './style.module.scss';
import cash from '../../assets/images/cash.png';
import { ExclamationCircleOutlined, LoadingOutlined, RightOutlined } from '@ant-design/icons';
import OrderReviewModal from './OrderReviewModal';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../../graphql/mutation/createOrder';
import { convertPaymentType } from '../../tools/Tools';
import { isEmpty } from 'lodash';
import { GET_PAY_ORDER } from '../../graphql/mutation/payOrder';
import { useCartStore } from '../../contexts/cart.store';
import { useRouter } from 'next/router';
import CurrentBranchType from '../../types/participant';
import orders from '../../types/order';
import { getAccessToken } from '../../contexts/auth.context';
import jwt_decode from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import { GET_SALES } from '../../graphql/query/sale.qeury';
import { CREATE_SALE } from '../../graphql/mutation/createSale';
import { GET_PAY_SALE } from '../../graphql/mutation/paySale';
import PayAtTheCashier from '../singleRestaurantDrawer/components/PayOrder/components/PayAtTheCashier';
import moment from 'moment';
import { DATE_FORMAT } from '../../constants/Constant';
import FoodMediumCard from '../foodCard/FoodMediumCard';

interface Payment {
  id: string;
  type: string;
  name: string;
}

interface Cash {
  id: string;
  type: string;
  name: string;
}

interface DraftArray {
  state: string;
  name: string;
  quantity: number;
  price: number;
}

type Props = {
  branchData: any;
  stateDraft: DraftArray[];
};

interface channels {
  channel: any;
}

export default function OrderReview({ branchData, stateDraft }: Props) {
  const { Text } = Typography;
  const { foods, editFoods, setCreateOrderID, createOrderId } = useStoreFoods();
  const router = useRouter();
  const { id } = router.query;
  const { t, i18n } = useTranslation('language');
  const { addAFish } = useStore();
  const [isShow, setIsShow] = useState(false);
  const [stateOrderChoice, setOrderChoice] = useState(true);
  const [stateToken, setToken] = useState<channels>();
  const [stateCreateOrderData, setCreateOrderDate] = useState<any>();
  const [setGroupId, setSetGroupId] = useState<any>();
  const [isModalVisibleCashier, setIsModalVisibleCashier] = useState(false);
  const filteredNewArray = foods.filter((z: any) => z.status === 'NEW');
  const [saleInputs, setSaleInputs] = useState({
    pin: '',
    preOrderDate: moment(new Date(), DATE_FORMAT),
    comment: '',
  });
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#007BFF' }} spin />;
  const [modal, contextHolder] = Modal.useModal();

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
      setIsShow(true);
      setCreateOrderDate(data.createSale);
      setCreateOrderID(data.createSale.id);
      setGroupId(data.createSale.groupId);
      onClickConfirmOrder();
    },
    onError(err) {
      setCreateOrderID('');
    },
  });
  const [confirmSale, { loading: confirm }] = useMutation(GET_PAY_SALE, {
    onCompleted: (data) => {
      message.success('Захиалга  амжилттай');
      editFoods([]);
      setIsShow(false);
      addAFish(0);
      setSaleInputs({ ...saleInputs, pin: '', preOrderDate: moment(new Date(), DATE_FORMAT), comment: '' });
      setCreateOrderID('');
    },
    onError(err) {
      if (err.message === 'PIN буруу байна!') {
        setSaleInputs({ ...saleInputs, pin: '' });
        message.error('PIN буруу байна!');
      } else {
        message.error('Баталгаажуулалт амжилтгүй');
        editFoods([]);
        addAFish(0);
      }
    },
  });

  const confirmOrder = () => {
    setOrderChoice(false);
    if (stateCreateOrderData?.id) {
      confirmSale({
        variables: {
          id: stateCreateOrderData?.id,
          pin: saleInputs.pin,
          comment: saleInputs.comment,
          preOrderDate: saleInputs.preOrderDate.format(DATE_FORMAT),
        },
      });
    }
  };

  const clickDraft = () => {
    if (foods.length === 0) return;
    let orders: any[] = foods.map((val: any) => {
      return {
        quantity: val.quantity,
        id: val.variantsId,
        comment: val.comment,
      };
    });
    createSale({
      variables: {
        input: {
          items: orders,
        },
      },
    });
  };
  const cancelOrder = () => {
    editFoods([]);
    setIsShow(false);
  };
  const onClickConfirmOrder = () => {
    setIsModalVisibleCashier(true);
  };

  function add(accumulator: any, a: any) {
    return accumulator + a;
  }
  const filteredNewOrderArray = foods.filter((z: any) => z.status === 'NEW');
  let prices: number[] = filteredNewArray?.map((val: any) => val.salePrice);
  const total = prices.reduce(add, 0);

  const TotalPrice = (
    <Row justify="space-between" style={{ marginTop: '10px' }}>
      <Text>
        {stateDraft.length === 0 ? <>{t('mainPage.NewOrderAmount')}</> : <>{t('mainPage.additionalOrdersAmount')}</>} :
      </Text>
      <Text strong>{numberFormat.format(total)} ₮ </Text>
    </Row>
  );

  var tokean = getAccessToken();
  useEffect(() => {
    if (tokean) {
      setToken(jwt_decode(tokean));
    }
  }, [tokean]);

  return (
    <div>
      {filteredNewArray.length > 0 && (
        <>
          {TotalPrice}

          {isShow && (
            <Modal
              title={<Typography>Сагс</Typography>}
              closable={false}
              style={{ borderRadius: '15px' }}
              footer={
                <Row justify="space-between" className={styles.drawtButton}>
                  <Col span={10}>
                    <Button type="default" onClick={cancelOrder}>
                      <Text className={styles.text} strong>
                        Цуцлах
                      </Text>
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button style={{ background: '#007bff' }} onClick={confirmOrder} loading={confirm}>
                      <Row justify="space-between">
                        <Text style={{ color: 'white' }}>{t('mainPage.Confirm')}</Text>
                        <Text style={{ color: 'white' }}> {numberFormat.format(total)} ₮</Text>
                      </Row>
                    </Button>
                  </Col>
                </Row>
              }
              visible={isShow}
            >
              <List
                itemLayout="vertical"
                dataSource={filteredNewOrderArray}
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1,
                }}
                renderItem={(item, index) => (
                  <List.Item>
                    <FoodMediumCard branchData={branchData} key={index} keys={item.variantsId} items={item} />
                  </List.Item>
                )}
              />
              <Row justify="space-between" style={{ marginTop: '10px' }}>
                <Text className={styles.text}>{t('mainPage.Feedback')}:</Text>
                <Input
                  className={styles.input}
                  defaultValue={saleInputs?.comment}
                  onChange={(event) => setSaleInputs({ ...saleInputs, comment: event.target.value })}
                />
              </Row>
              <Row justify="space-between" style={{ marginTop: '10px' }}>
                <Text className={styles.text}>Захиалга авах өдөр:</Text>
                <DatePicker
                  style={{ width: '150px', borderRadius: '5px' }}
                  defaultValue={saleInputs?.preOrderDate}
                  onChange={(value: any) => setSaleInputs({ ...saleInputs, preOrderDate: value })}
                />
              </Row>
              <Row justify="space-between" style={{ marginTop: '10px' }}>
                <Text className={styles.text}>Пин:</Text>
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
            </Modal>
          )}
          {!isShow && (
            <Row justify="space-between" className={styles.drawtButton}>
              <Col span={24}>
                <Button style={{ background: '#007bff' }} onClick={clickDraft} loading={loading}>
                  <Row justify="space-between">
                    <Text style={{ color: 'white' }} strong>
                      {t('mainPage.Confirmation')}
                    </Text>
                    <Text style={{ color: 'white' }}>{numberFormat.format(total)} ₮</Text>
                  </Row>
                </Button>
              </Col>
            </Row>
          )}
        </>
      )}
    </div>
  );
}
