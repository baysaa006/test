import { Button, Checkbox, DatePicker, Form, Input, Radio, Row, Select, Space, Tabs, TimePicker } from 'antd';
import { isEmpty, values } from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PATTERN_PHONE } from '../../constants/Pattern';
import styles from './style.module.scss';

interface KeyValuePair {
  key: string;
  value: string;
}

export default function ShippingOrder(props: any) {
  const { t, i18n } = useTranslation('language');
  const { TabPane } = Tabs;
  const {
    branchData,
    setDelivryDate,
    setPeopleNumber,
    setPersonContact,
    setActivatyKey,
    stateActivatyKey,
    setPreOrderKey,
    statePreOrderKey,
    setAddress,
    onFinish,
    form,
  } = props;

  const { TextArea } = Input;
  const [unCheck, setunCheck] = useState(true);
  const { Option } = Select;
  const timeOnchange = (values: any) => {
    if (isEmpty(values)) {
      setunCheck(true);
    } else {
      setunCheck(false);
    }
  };

  const peapleNuber = [
    {
      val: 1,
      name: '1 хүн',
    },
    {
      val: 2,
      name: '2 хүн',
    },
    {
      val: 3,
      name: '3 хүн',
    },
    {
      val: 4,
      name: '4 хүн',
    },
    {
      val: 5,
      name: '5 хүн',
    },
    {
      val: 6,
      name: '6 хүн',
    },
    {
      val: 7,
      name: '7 хүн',
    },
    {
      val: 8,
      name: '8 хүн',
    },
    {
      val: 9,
      name: '9 хүн',
    },
    {
      val: 10,
      name: '10 хүн',
    },
    {
      val: 11,
      name: '11 хүн',
    },
    {
      val: 12,
      name: '12 хүн',
    },
    {
      val: 13,
      name: '13 хүн',
    },
    {
      val: 14,
      name: '14 хүн',
    },
    {
      val: 15,
      name: '15 хүн',
    },
    {
      val: 16,
      name: '16 хүн',
    },
    {
      val: 17,
      name: '17 хүн',
    },
    {
      val: 18,
      name: '18 хүн',
    },
    {
      val: 19,
      name: '19 хүн',
    },
    {
      val: 20,
      name: '20 хүн',
    },
  ];

  const getTimes = () => {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();

    const times: KeyValuePair[] = [];
    times.push({ key: 'Яаралтай', value: 'Яаралтай' });

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

  const times = getTimes();

  const onSubmit = useCallback((values) => {
    // do your staff with values
  }, []);

  const onChangeDelivryDate = (values: any) => {
    setDelivryDate(values.target.value);
    setunCheck(values.target.value);
  };

  const peopleNumber = (e: any) => {
    setPeopleNumber(e);
  };
  const personContact = (e: any) => {
    setPersonContact(e.currentTarget.value);
  };

  const personAddress = (e: any) => {
    setAddress(e.target.value);
  };

  const radioTimeButton = (
    <Radio.Group defaultValue={times[0].key} buttonStyle="solid" onChange={onChangeDelivryDate}>
      <Space wrap>
        {times.map((val, i) => (
          <Radio.Button key={i} value={val.key}>
            {val.value}
          </Radio.Button>
        ))}
      </Space>
    </Radio.Group>
  );

  const onTabActivatykey = (key: any) => {
    setActivatyKey(key);
  };

  const onPreOrderKey = (key: any) => {
    setPreOrderKey(key);
  };
  const onFinishFailed = () => {};

  const onFieldsChange = () => {};

  return (
    <>
      <div className={styles.shippingOrderTabs}>
        <Form form={form} layout="vertical" onFinish={onFinishFailed} colon>
          <Tabs type="card" onChange={onTabActivatykey} activeKey={stateActivatyKey}>
            {!isEmpty(branchData.services.filter((z: any) => z === 'PreOrder')) && (
              <TabPane tab={<span>Захиалга</span>} key="1">
                <Form.Item name="asap">
                  <div className={styles.secondTab}>
                    <Tabs type="card" onChange={onPreOrderKey} activeKey={statePreOrderKey}>
                      {!isEmpty(branchData.services.filter((z: any) => z === 'TakeAway')) && (
                        <TabPane tab="Авч явах" key="8">
                          <Form.Item
                            rules={[{ pattern: PATTERN_PHONE, required: true, message: 'Утасны дугаар оруулна уу' }]}
                            label="Утас"
                            name="rfd"
                          >
                            <Input placeholder="Утасны дугаар оруулах" onChange={personContact} />
                          </Form.Item>
                          <Form.Item
                            rules={[{ required: true, message: 'Цаг оруулна уу' }]}
                            label="Хүргүүлэх цаг"
                            name="штгиrfdeнмс"
                          >
                            <Row justify="start" className={styles.timeButton}>
                              {radioTimeButton}
                            </Row>
                          </Form.Item>
                        </TabPane>
                      )}

                      <TabPane tab="Суух" key="9">
                        <Form.Item
                          rules={[{ pattern: PATTERN_PHONE, required: true, message: 'Утасны дугаар оруулна уу' }]}
                          label="Утас"
                          name="rfd"
                        >
                          <Input placeholder="Утасны дугаар оруулах" onChange={personContact} />
                        </Form.Item>
                        <Form.Item
                          rules={[{ required: true, message: 'Хүний тоо оруулна уу' }]}
                          label={t('mainPage.numberOfPeople')}
                          name="peopleNumber"
                          className={styles.orderShippingInput}
                        >
                          <Select defaultValue={peapleNuber[0].name} onChange={peopleNumber}>
                            {peapleNuber.map((z: any, i: any) => (
                              <Option key={i} value={z.val}>
                                {z.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          rules={[{ required: true, message: 'Цаг оруулна уу' }]}
                          label="Хүргүүлэх цаг"
                          name="штгиrfdeнмс"
                        >
                          <Row justify="start" className={styles.timeButton}>
                            {radioTimeButton}
                          </Row>
                        </Form.Item>
                      </TabPane>
                    </Tabs>
                  </div>
                </Form.Item>
              </TabPane>
            )}
            {!isEmpty(branchData.services.filter((z: any) => z === 'Delivery')) && (
              <TabPane tab={<span>{t('mainPage.Delivery')}</span>} key="2">
                <div className={styles.secondTab}>
                  <Form.Item
                    rules={[{ pattern: PATTERN_PHONE, required: true, message: 'Утасны дугаар оруулна уу' }]}
                    label="Утас"
                    name="rfd"
                  >
                    <Input placeholder="Утасны дугаар оруулах" onChange={personContact} />
                  </Form.Item>
                  <Form.Item rules={[{ required: true, message: 'Хаяг оруулна уу' }]} label="Хаяг" name="Хаяг">
                    <TextArea showCount placeholder="Хаяг оруулна уу" onChange={personAddress} />
                  </Form.Item>

                  <Form.Item rules={[{ message: 'Цаг оруулна уу' }]} label="Хүргүүлэх цаг" name="штгиrfdeнмс">
                    <Row justify="start" className={styles.timeButton}>
                      {radioTimeButton}
                    </Row>
                  </Form.Item>
                </div>
              </TabPane>
            )}
          </Tabs>
        </Form>
      </div>
    </>
  );
}
