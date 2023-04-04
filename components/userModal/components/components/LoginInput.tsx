import { Form, Input, Row, Typography } from 'antd';
import React from 'react';
import { PATTERN_PHONE } from '../../../../constants/Pattern';
import styles from '../style.module.scss';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;
export default function LoginInput(props: any) {
  const { form, onFinish } = props;
  const { t } = useTranslation('language');
  return (
    <>
      <div className={styles.phoneNumberContainer}>
        <Row>
          <Text strong className={styles.header}>
            {t('mainPage.UserRegistration')}
          </Text>
        </Row>
        <br />
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="phone"
            rules={[{ required: true, pattern: PATTERN_PHONE, message: t('mainPage.PleaseEnterPhoneNumber') }]}
          >
            <Row className={styles.confirmationInputs}>
              <Input placeholder={t('mainPage.PhoneNumber')} type="number" />
            </Row>
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: t('mainPage.EnterPassword') }]}>
            <Row className={styles.confirmationInputs}>
              <Input.Password placeholder={t('mainPage.Password')} />
            </Row>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
