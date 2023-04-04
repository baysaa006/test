import { CloseOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  Image,
  List,
  Row,
  Space,
  Modal,
  Steps,
  Typography,
  Alert,
  message,
  Input,
  DatePicker,
} from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DATE_FORMAT, DRAFT_TYPE } from '../../constants/Constant';
import { CURRENCY } from '../../helper/constant';
import { numberFormat } from '../../helper/utils';
import { convertType } from '../../tools/Tools';
import OrderHistoryCard from '../foodCard/orderHistoryCard';
import PayOrderDrawer from '../singleRestaurantDrawer/components/PayOrder/PayOrder';
import styles from './style.module.scss';
import pin from '../../assets/icons/Vector.png';
import InfoAlert from '../InfoAlert/InfoAlert';
import { Translate } from 'react-auto-translate';
import { useMutation } from '@apollo/client';
import { GET_PAY_SALE } from '../../graphql/mutation/paySale';
import { useStore, useStoreFoods } from '../../contexts/food.store';
import moment from 'moment';

const { Text } = Typography;
const { Step } = Steps;
export default function SelectedOrder(props: any) {
  const { onClose, visible, selectedItems, branchData } = props;
  const [statePayOrderOrderDrawer, setPayOrderDrawer] = useState(false);
  const { t, i18n } = useTranslation('language');
  const { addAFish } = useStore();
  const [saleInputs, setSaleInputs] = useState({
    pin: '',
    preOrderDate: moment(new Date(), DATE_FORMAT),
    comment: '',
  });
  const { foods, setCreateOrderID, setGroupId, editFoods, createOrderId } = useStoreFoods();
  const showPayOrder = () => {
    setPayOrderDrawer(true);
  };
  const [confirmSale, { loading }] = useMutation(GET_PAY_SALE, {
    onCompleted: (data) => {
      editFoods([]);
      addAFish(0);
      setCreateOrderID('');
      onClose();
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
    if (selectedItems?.id) {
      confirmSale({
        variables: {
          id: selectedItems?.id,
          pin: saleInputs.pin,
          comment: saleInputs.comment,
          preOrderDate: saleInputs.preOrderDate.format(DATE_FORMAT),
        },
      });
    }
  };
  function handleInputClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.select();
  }

  const drawerFooter = (
    <>
      <Row justify="center" className={styles.draftButton}>
        <Col span={24}>
          <Button onClick={confirmOrder}>
            <Row justify="space-between">
              <Text className={styles.text} strong>
                {t('mainPage.Confirm')}
              </Text>
              <Text className={styles.totalText}>{numberFormat.format(selectedItems?.totalAmount)} ₮</Text>
            </Row>
          </Button>
        </Col>
      </Row>
    </>
  );

  return (
    <>
      <div className={styles.orderHistoryDiv}>
        <Modal
          className={styles.styleModal}
          closeIcon={false}
          onCancel={onClose}
          footer={drawerFooter}
          confirmLoading={loading}
          visible={visible}
          bodyStyle={{ borderRadius: '20px', padding: '0px 20px' }}
          style={{ borderRadius: '20px' }}
          closable={false}
          width={1000}
        >
          <br />
          <Row justify="end" className={styles.closeIcon}>
            <CloseOutlined style={{ fontSize: '20px' }} onClick={onClose} />
          </Row>
          <Row>
            <List.Item.Meta
              title={
                <Text style={{ fontSize: '12px', fontWeight: 'normal', color: 'rgb(54 61 78 / 74%)' }}>
                  {t('mainPage.OrderStatus2')}:{' '}
                  <Text style={{ fontSize: '12px', fontWeight: 'normal' }}>{<Text>{t(`mainPage.DRAFT`)} </Text>}</Text>
                </Text>
              }
              description={
                <Text style={{ fontSize: '12px', fontFamily: 'inherit', color: 'rgb(54 61 78 / 74%)' }}>
                  {t('mainPage.OrderNumber')}:
                  <Text style={{ color: '#007BFF', fontFamily: 'inherit', marginLeft: 10 }} strong>
                    {selectedItems?.number.slice(-4)}
                  </Text>
                </Text>
              }
              avatar={<Avatar shape="square" size={50} src={convertType(selectedItems?.type)} />}
            />
          </Row>

          {selectedItems?.state === 'NEW' && (
            <Row style={{ marginTop: '10px' }}>
              <InfoAlert
                text={<Translate>Та доорх хэсгээс захиалгын явцыг хянана уу. Хүлээсэнд баярлалаа.</Translate>}
                mode="info"
              />
            </Row>
          )}
          {selectedItems?.state === 'READY' && (
            <Row style={{ marginTop: '10px' }}>
              <InfoAlert text={<Translate>Таны хоол бэлэн боллоо. Та сайхан хооллоорой </Translate>} mode="info" />
            </Row>
          )}
          {selectedItems?.state === 'COMPLETED' && (
            <Row style={{ marginTop: '10px' }}>
              <InfoAlert
                text={<Translate>Манайхаар үйлчлүүлсэнд баярлалаа. Та дахин үйлчлүүлээрэй </Translate>}
                mode="info"
              />
            </Row>
          )}
          {/* {selectedItems?.state === 'DRAFT' && (
            <Row style={{ marginTop: '10px' }}>
              <InfoAlert text={<Translate> Таны захиалга  баталгаажна.</Translate>} mode="info" />
            </Row>
          )} */}
          {/* <div className={styles.selectedOrderSteps}>
            <Divider style={{ margin: '5px 0px 19px 0px' }} />
            <Steps labelPlacement="horizontal" size="small" current={convertState(selectedItems?.state)}>
              <Step title={t('mainPage.Received')} />
              <Step title={t('mainPage.Processing')} />
              <Step title={t('mainPage.TheFoodIsReady')} />
              <Step
                title={selectedItems?.type === 'Dining' ? t('mainPage.PleaseAcceptYourFood') : t('mainPage.PICKEDUP')}
              />
              <Step title={t('mainPage.COMPLETED')} />
            </Steps>
          </div> */}
          <Divider style={{ margin: '0px 0px 24px' }} />
          {/* {selectedItems && selectedItems.address && (
            <>
              <Row style={{ marginBottom: '10px' }}>
                <Text strong style={{ fontSize: '17px' }}>
                  {t('mainPage.ReceivingAddress')}
                </Text>
              </Row>
              <List.Item.Meta description={selectedItems.address} avatar={<Image src={pin} preview={false} />} />
              <Divider />
            </>
          )} */}
          <Row style={{ marginBottom: '10px' }}>
            <Text strong style={{ fontSize: '17px' }}>
              {t('mainPage.YourOrder')}
            </Text>
          </Row>
          {selectedItems?.items.map((item: any, index: any) => (
            <OrderHistoryCard key={index} keys={item.id} items={item} />
          ))}
          {/* <Divider style={{ margin: '10px 0px 10px 0px' }} />
          <Row style={{ marginBottom: '10px' }}>
            <Text strong style={{ fontSize: '17px' }}>
              {t('mainPage.PaymentInformation')}
            </Text>
          </Row> */}
          {/* <Row justify="space-between" style={{ marginTop: '10px' }}>
            <Text style={{ color: 'rgb(54 61 78 / 55%)' }}>{t('mainPage.Discount')}:</Text>
            <Text strong style={{ color: 'rgb(54 61 78 / 55%)' }}>
              {numberFormat.format(selectedItems?.discountAmount)} ₮
            </Text>
          </Row>
          <Row justify="space-between" style={{ marginTop: '10px' }}>
            <Text style={{ color: 'rgb(54 61 78 / 55%)' }}>{t('mainPage.Tax')}:</Text>
            <Text strong style={{ color: 'rgb(54 61 78 / 55%)' }}>
              {numberFormat.format(selectedItems?.taxAmount)} ₮
            </Text>
          </Row> */}
          <Row justify="space-between" style={{ marginTop: '10px' }}>
            <Text strong>{t('mainPage.Total')}:</Text>
            <Text strong>{numberFormat.format(selectedItems?.grandTotal)} ₮</Text>
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
              onChange={(value: any) => setSaleInputs({ ...saleInputs, preOrderDate: value })}
            />
          </Row>
          <Row justify="space-between" style={{ marginTop: '10px' }}>
            <Text>Пин:</Text>
            <Input.Password
              required={true}
              onClick={handleInputClick}
              className={styles.input}
              type="number"
              defaultValue={saleInputs?.pin}
              onChange={(event) => setSaleInputs({ ...saleInputs, pin: event.target.value })}
            />
          </Row>
        </Modal>
        {/* <PayOrderDrawer
          stateCreateOrderData={selectedItems}
          branchData={branchData}
          onClose={onClosePayOrder}
          statePayOrderOrderDrawer={statePayOrderOrderDrawer}
          onCloseDraft={onClosePayOrder}
          onCloseTermsOfOrder={onClose}
        /> */}
      </div>
    </>
  );
}
