import React, { useState } from 'react';
import styles from './style.module.scss';
import { Button, Form, Input, message, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';

export default function RegisterContent() {
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation('language');
  const [stateInputVal, setInputVal] = useState({
    city: ' ',
    district: '',
    email: '',
    facebookPageLink: '',
    phoneNumber: '',
    restaurantName: '',
  });
  function sendMail() {
    var link =
      'mailto:info@qmenu.mn' +
      '?cc=info@qmenu.mn' +
      '&subject=' +
      encodeURIComponent('This is my subject') +
      '&body=' +
      encodeURIComponent(`
      Рестораны нэр : ${stateInputVal.restaurantName}  
      Утасны дугаар : ${stateInputVal.phoneNumber}      
      Facebook page линк: ${stateInputVal.facebookPageLink} 
      Email: ${stateInputVal.email} 
      Хот : ${stateInputVal.city} 
      Дүүрэг: ${stateInputVal.district}
      `);
    window.location.href = link;
  }
  const onFinishFailed = (errorInfo: any) => {
    message.error('Амжилтгүй боллоо');
  };

  const onFinish = (values: any) => {
    stateInputVal.city = values.city;
    stateInputVal.district = values.district;
    stateInputVal.email = values.email;
    stateInputVal.facebookPageLink = values.facebookPageLink;
    stateInputVal.phoneNumber = values.phoneNumber;
    stateInputVal.restaurantName = values.restaurantName;
    message.success('Амжилттай');
    sendMail();
    form.resetFields();
  };

  return (
    <>
      <Row justify="center" className={styles.registerSectionStyle}>
        <Card style={{ width: 800 }}>
          <Form
            name="registerSection"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={[30, 0]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  label={t('mainPage.RestaurantName')}
                  name="restaurantName"
                  rules={[{ required: true, message: 'Рестораны нэрээ оруулна уу!' }]}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  label={t('mainPage.PhoneNumber')}
                  name="phoneNumber"
                  rules={[{ required: true, message: 'Утасны дураараа оруулна уу!' }]}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  label={t('mainPage.FacebookLink')}
                  name="facebookPageLink"
                  rules={[{ required: true, message: 'Facebook page линкээ оруулна уу!' }]}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  label={t('mainPage.EmailAddress')}
                  name="email"
                  rules={[{ required: true, message: 'Email хаягаа оруулна уу!' }]}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  label={t('mainPage.City')}
                  name="city"
                  rules={[{ required: true, message: 'Хотоо оруулна уу!' }]}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  label={t('mainPage.District')}
                  name="district"
                  rules={[{ required: true, message: 'Дүүрэгээ оруулна уу!' }]}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button htmlType="submit">{t('mainPage.register')}</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Row>
    </>
  );
}
