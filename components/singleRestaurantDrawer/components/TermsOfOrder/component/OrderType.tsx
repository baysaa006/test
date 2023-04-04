import {
  Card,
  Radio,
  Row,
  Typography,
  Image,
  Divider,
  Form,
  Input,
  Select,
  Col,
  Spin,
  message,
  Alert,
  Avatar,
  Space,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import dining from '../../../../../assets/orderTypesPic/dinnig.svg';
import delivery from '../../../../../assets/orderTypesPic/delivry.svg';
import preOrder from '../../../../../assets/orderTypesPic/preOrder.svg';
import takeAway from '../../../../../assets/orderTypesPic/takeAway.svg';
import { TYPE } from '../../../../../constants/Constant';
import { PATTERN_PHONE } from '../../../../../constants/Pattern';
import check from '../../../../../assets/orderTypesPic/Check.png';
import unCheck from '../../../../../assets/orderTypesPic/UnCheck.png';
import CurrentAddressModal from './CurrentAddresModal';
import { PeopleNumber } from './mock-data/mockData';
import { LoadingOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';
import { useLazyQuery, useQuery } from '@apollo/client';
import { SEARCH_LOCATIONS } from '../../../../../graphql/query/search.location';
import { usePosition } from './hookGetPosition';
import pinIcon from '../../../../../assets/orderTypesPic/MapPin.png';
import { ME } from '../../../../../graphql/query/user.query';
const { Text, Paragraph } = Typography;
const { Option } = Select;

interface KeyValuePair {
  key: string;
  value: string;
}

export default function OrderType(props: any) {
  const { branchData, form, onFinish, valueType, onChangeType } = props;
  const watch = true;
  const { t, i18n } = useTranslation('language');
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [stateValue, setValue] = useState('ASAP');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateTimeToTake, setTimeToTake] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [addressValue, setAddressValue] = useState('');
  const [showPositionMessage, setPositionMessage] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#007BFF' }} spin />;
  const fullwidth = global.window?.innerWidth;

  const [searchLocations, { loading: searchLaoding, data: searchLocation }] = useLazyQuery(SEARCH_LOCATIONS, {
    onCompleted: (data) => {},
    onError(err) {},
  });

  // const {
  //   loading: loadingUser,
  //   error,
  //   data: userData,
  // } = useQuery(ME, {
  //   onCompleted: (data) => {},
  // });

  const onChangeRadio = (e: any) => {
    setTimeToTake(e.target.value);
    setValue(e.target.value);
    form.resetFields(['deliveryDate']);
  };

  const handleChange = (value: any) => {
    if (value) {
      setValue('');
    }
    setTimeToTake(value);
  };

  const convertOrderType = (type: any) => {
    switch (type) {
      case TYPE.DINIG:
        return (
          <>
            <Divider style={{ margin: '10px 0px' }} />
            <Radio value={TYPE.DINIG} className={styles.radioText}>
              <Image src={dining} preview={false} />
              <Text style={{ fontWeight: 'normal', marginLeft: '10px' }}>{t('mainPage.Dining')}</Text>
              <div className={styles.checkBox}>
                <Image src={valueType === TYPE.DINIG ? check : unCheck} />
              </div>
            </Radio>
          </>
        );
      case TYPE.PRE_ORDER:
        return (
          <>
            <Divider style={{ margin: '10px 0px' }} />
            <Radio value={TYPE.PRE_ORDER} className={styles.radioText}>
              <Image src={preOrder} preview={false} />
              <Text style={{ fontWeight: 'normal', marginLeft: '10px' }}>{t('mainPage.PreOrder')}</Text>
              <div className={styles.checkBox}>
                <Image src={valueType === TYPE.PRE_ORDER ? check : unCheck} />
              </div>
            </Radio>
          </>
        );
      case TYPE.TAKE_AWAY:
        return (
          <>
            <Divider style={{ margin: '10px 0px' }} />
            <Radio value={TYPE.TAKE_AWAY} className={styles.radioText}>
              <Image src={takeAway} preview={false} />
              <Text style={{ fontWeight: 'normal', marginLeft: '10px' }}>{t('mainPage.TakeAway')}</Text>
              <div className={styles.checkBox}>
                <Image src={valueType === TYPE.TAKE_AWAY ? check : unCheck} />
              </div>
            </Radio>
          </>
        );
      case TYPE.DELIVERY:
        return (
          <>
            <Divider style={{ margin: '10px 0px' }} />
            <Radio value={TYPE.DELIVERY} className={styles.radioText}>
              <Image src={delivery} preview={false} />
              <Text style={{ fontWeight: 'normal', marginLeft: '10px' }}>{t('mainPage.Delivery')}</Text>
              <div className={styles.checkBox}>
                <Image src={valueType === TYPE.DELIVERY ? check : unCheck} />
              </div>
            </Radio>
          </>
        );
    }
  };

  const getTimes = () => {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();

    const times: KeyValuePair[] = [];

    for (let i = h; i <= 22; i++) {
      if (i === h) {
        if (m <= 15) times.push({ key: i + ':30', value: i + ':30' });
      } else {
        times.push({ key: i + ':00', value: i + ':00' });
        if (i !== 22) times.push({ key: i + ':30', value: i + ':30' });
      }
    }
    return times;
  };

  function getCurrent() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter({ lat: userLocation.lat, lng: userLocation.lng });
        searchLocations({ variables: { query: '', lat: userLocation.lat, lon: userLocation.lng } });
        setPositionMessage(false);
        setShowLoading(false);
      },
      (error) => {
        error;
        setPositionMessage(false);
      },
      { enableHighAccuracy: true, timeout: 5000 },
    );
  }

  const times = getTimes();

  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getCurrent();
  }, [navigator.geolocation]);

  const onFocusMap = () => {
    setIsModalVisible(true);
    searchLocations({ variables: { query: '', lat: center.lat, lon: center.lng } });
  };

  const addressOnchange = (value: any) => {
    setAddressValue(value.target.value);
  };

  const onClose = () => {
    setIsModalVisible(false);
  };

  const selectedAddress = (item: any) => {
    setAddressValue(`${item.district},` + `${item.region},` + `${item.address},` + `(${item.description})`);
    form.setFieldsValue({
      address: `${item.district},` + `${item.region},` + `${item.address},` + `(${item.description})`,
    });
    setIsModalVisible(false);
  };

  return (
    <>
      <Spin indicator={antIcon} spinning={showLoading}>
        <Card>
          <Row className={styles.orderType}>
            <Text strong>{t('mainPage.OrderType')}</Text>
          </Row>
          <br />
          <div className={styles.orderTypeRadioButton}>
            <Radio.Group
              onChange={onChangeType}
              value={valueType}
              optionType="default"
              defaultValue={branchData?.services[0]}
            >
              {branchData?.services.map((items: any, index: any) => {
                return convertOrderType(items);
              })}
            </Radio.Group>
          </div>
        </Card>
        {valueType === 'Dining' ? (
          <></>
        ) : (
          <>
            <br />
            <Card bodyStyle={{ padding: '0px 24px' }}>
              <div className={styles.customerInformation}>
                <Form
                  name="forms"
                  form={form}
                  layout="vertical"
                  size="large"
                  onFinish={onFinish}
                  // initialValues={userData?.me.verified && { contact: userData.me.phone, name: userData.me.firstName }}
                >
                  {valueType === 'PreOrder' && (
                    <>
                      <Row style={{ marginBottom: '10px' }} className={styles.customerInformationHeader}>
                        <Text strong>{t('mainPage.CustomerInformation')}</Text>
                      </Row>
                      <div className={styles.placeholderText}>
                        <Form.Item
                          required
                          name="contact"
                          rules={[
                            {
                              pattern: PATTERN_PHONE,
                              required: true,
                              message: `${t('mainPage.PleaseEnterPhoneNumber')}`,
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Text>{t('mainPage.PhoneNumber')} </Text>
                      </div>
                      <div className={styles.placeholderText}>
                        <Form.Item
                          name="name"
                          rules={[{ required: true, message: `${t('mainPage.PleaseEnterName')}` }]}
                          required
                        >
                          <Input />
                        </Form.Item>
                        <Text>{t('mainPage.username')}</Text>
                      </div>
                    </>
                  )}

                  {valueType === 'Delivery' && (
                    <>
                      <Row style={{ marginBottom: '10px' }} className={styles.customerInformationHeader}>
                        <Text strong>{t('mainPage.CustomerInformation')}</Text>
                      </Row>

                      <div className={styles.placeholderText}>
                        <Form.Item
                          required
                          name="contact"
                          rules={[
                            {
                              pattern: PATTERN_PHONE,
                              required: true,
                              message: `${t('mainPage.PleaseEnterPhoneNumber')}`,
                            },
                          ]}
                        >
                          <Input inputMode="numeric" />
                        </Form.Item>
                        <Text>{t('mainPage.PhoneNumber')} </Text>
                      </div>
                      <div className={styles.placeholderText}>
                        <Form.Item
                          name="name"
                          rules={[{ required: true, message: `${t('mainPage.PleaseEnterName')}` }]}
                          required
                        >
                          <Input />
                        </Form.Item>
                        <Text>{t('mainPage.username')}</Text>
                      </div>
                    </>
                  )}

                  {valueType === 'PreOrder' && (
                    <Row
                      className={styles.deliveryTimeButton}
                      justify="space-between"
                      style={{ marginTop: '10px', fontSize: '14px', marginBottom: '10px' }}
                    >
                      <Col span={11} className={styles.deliveryTime}>
                        <div className={styles.timeDeliverySelect}>
                          <div className={styles.placeholderSelectText}>
                            <Form.Item
                              name="guests"
                              rules={[{ required: true, message: `${t('mainPage.pleaseNumberOfCustomers')}` }]}
                              required
                              initialValue={PeopleNumber[1].val}
                            >
                              <Select defaultValue={PeopleNumber[1].val}>
                                {PeopleNumber.map((z, i) => (
                                  <Option key={i} value={z.val}>
                                    {z.name}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Text>{t('mainPage.NumberOfCustomers')}</Text>
                          </div>
                        </div>
                      </Col>
                      <Col span={11}>
                        <div className={styles.timeDeliverySelect}>
                          <div className={styles.placeholderSelectText}>
                            <Form.Item
                              name="deliveryDate"
                              rules={[{ required: true, message: 'Set Time' }]}
                              required
                              initialValue={times[0]?.key}
                            >
                              <Select onChange={handleChange} defaultValue={times[0]?.key}>
                                {times?.map((val, i) => (
                                  <Option value={val.key}>{val.value}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Text>{t('mainPage.TimeToServe')}</Text>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  )}

                  {valueType === 'Delivery' && (
                    <>
                      <Row className={styles.customerInformationHeader}>
                        <Paragraph strong>{t('mainPage.Address')}</Paragraph>
                      </Row>
                      {showPositionMessage && (
                        <>
                          <Alert message="Таны байршил олдсонгүй. Та байршилаа асаана уу." type="info" showIcon />{' '}
                          <br />
                        </>
                      )}
                      <div className={styles.addressInput}>
                        <div className={styles.placeholderText}>
                          <Form.Item
                            name="address"
                            rules={[{ required: true, message: `${t('mainPage.pleaseAddress')}` }]}
                            required
                            initialValue={addressValue}
                          >
                            <Row className={styles.addressInputRow} style={{ border: '0.1px solid #cdd4db' }}>
                              <Input value={addressValue} onChange={addressOnchange} />
                              {/* <Image width={35} src={pinIcon} preview={false} onClick={onFocusMap} /> */}
                            </Row>
                          </Form.Item>
                          <Text>{t('mainPage.ReceivingAddress')}</Text>
                        </div>
                      </div>

                      <div className={styles.placeholderText}>
                        <Form.Item
                          name="comment"
                          rules={[{ required: false, message: `${t('mainPage.pleaseAdditionalNotes')}` }]}
                          required
                        >
                          <Input />
                        </Form.Item>
                        <Text>{t('mainPage.AdditionalNotes')}</Text>
                      </div>

                      <Row className={styles.customerInformationHeader}>
                        <Text strong>{t('mainPage.DeliveryTime')}</Text>
                      </Row>

                      <div
                        style={{ marginTop: '10px', fontSize: '14px', marginBottom: '10px' }}
                        className={styles.deliveryTimeButton}
                      >
                        <Radio.Group
                          style={{ fontSize: '14px' }}
                          buttonStyle="solid"
                          className={styles.deliveryTime}
                          value={stateValue}
                          onChange={onChangeRadio}
                        >
                          <Radio.Button value="ASAP"> {t('mainPage.ASAP')}</Radio.Button>
                          <div className={styles.placeholderSelectText}>
                            <div className={styles.timeDeliverySelect}>
                              <Form.Item
                                name="deliveryDate"
                                rules={[
                                  {
                                    required: stateValue === '' ? true : false,
                                    message: `${t('mainPage.pleaseTimeToTake')}`,
                                  },
                                ]}
                                required
                              >
                                <Select
                                  onChange={handleChange}
                                  value={stateTimeToTake}
                                  allowClear
                                  style={{ width: fullwidth > 768 ? '20vw' : '40vw' }}
                                >
                                  {times?.map((val, i) => (
                                    <Option key={i} value={val.key}>
                                      {val.value}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                              <Text>{t('mainPage.TimeToTake')}</Text>
                            </div>
                          </div>
                        </Radio.Group>
                      </div>
                    </>
                  )}

                  {valueType === 'TakeAway' && (
                    <>
                      <Row style={{ marginBottom: '10px' }} className={styles.customerInformationHeader}>
                        <Text strong>{t('mainPage.CustomerInformation')}</Text>
                      </Row>
                      <div className={styles.placeholderText}>
                        <Form.Item
                          required
                          name="contact"
                          rules={[
                            {
                              pattern: PATTERN_PHONE,
                              required: true,
                              message: `${t('mainPage.PleaseEnterPhoneNumber')}`,
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Text>{t('mainPage.PhoneNumber')} </Text>
                      </div>
                      <div className={styles.placeholderText}>
                        <Form.Item
                          name="name"
                          rules={[{ required: false, message: `${t('mainPage.PleaseEnterName')}` }]}
                          required
                        >
                          <Input />
                        </Form.Item>
                        <Text>{t('mainPage.username')}</Text>
                      </div>
                    </>
                  )}

                  {valueType === 'TakeAway' && (
                    <>
                      <Row style={{ marginBottom: '10px' }} className={styles.customerInformationHeader}>
                        <Text strong>{t('mainPage.TakeAway')}</Text>
                      </Row>

                      <div
                        style={{ marginTop: '10px', fontSize: '14px', marginBottom: '10px' }}
                        className={styles.deliveryTimeButton}
                      >
                        <Radio.Group
                          style={{ fontSize: '14px' }}
                          buttonStyle="solid"
                          className={styles.deliveryTime}
                          value={stateValue}
                          onChange={onChangeRadio}
                        >
                          <Radio.Button value="ASAP"> {t('mainPage.ASAP')}</Radio.Button>
                          <div className={styles.placeholderSelectText}>
                            <div className={styles.timeDeliverySelect}>
                              <Form.Item
                                name="deliveryDate"
                                rules={[
                                  {
                                    required: stateValue === '' ? true : false,
                                    message: `${t('mainPage.pleaseTimeToTake')}`,
                                  },
                                ]}
                                required
                              >
                                <Select
                                  onChange={handleChange}
                                  value={stateTimeToTake}
                                  allowClear
                                  style={{ width: '40vw' }}
                                >
                                  {times?.map((val, i) => (
                                    <Option key={i} value={val.key}>
                                      {val.value}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                              <Text>{t('mainPage.TimeToTake')}</Text>
                            </div>
                          </div>
                        </Radio.Group>
                      </div>
                    </>
                  )}
                </Form>
              </div>
            </Card>
          </>
        )}
        <CurrentAddressModal
          selectedAddress={selectedAddress}
          center={center}
          setCenter={setCenter}
          onClose={onClose}
          isModalVisible={isModalVisible}
          searchLocation={searchLocation}
        />
      </Spin>
    </>
  );
}
