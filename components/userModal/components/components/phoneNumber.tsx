import { Form, Input, Row, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PATTERN_PHONE } from '../../../../constants/Pattern';
import styles from '../style.module.scss';

const { Text } = Typography;
export default function PhoneNumber(props: any) {
  const { onFinish, form } = props;
  const { t, i18n } = useTranslation('language');
  const onFocus = () => {};
  return (
    <>
      <div className={styles.phoneNumberContainer}>
        <Row>
          <Text strong className={styles.header}>
            {t('mainPage.EnterYourPhoneNumber')}
          </Text>
        </Row>
        <br />
        <Row>
          <Text className={styles.description}>{t('mainPage.VerificationCodePhone')}</Text>
        </Row>
        <br />
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="phone"
            rules={[{ pattern: PATTERN_PHONE, required: true, message: `${t('mainPage.PleaseEnterPhoneNumber')}` }]}
          >
            <Row className={styles.confirmationInputs}>
              <Input prefix="+976" placeholder={t('mainPage.EnterPhoneNumber')} type="number" />
            </Row>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
