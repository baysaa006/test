import { Button, Modal, Result, Row, Space, Image, Typography, message, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import { PATTERN_PHONE } from '../../../../../constants/Pattern';
import toki from '../images/toki.png';
const { Text } = Typography;
export default function PhoneNumberModal(props: any) {
  const { t, i18n } = useTranslation('language');
  const { isModalPhoneNumber, onClose, paying, onFinish } = props;
  const [form] = Form.useForm();
  const onClick = () => {
    form.submit();
  };
  const Footer = (
    <div>
      <Row justify="center" style={{ padding: '0px 0px 15px 0px' }}>
        <Space direction="vertical">
          <div className={styles.nowPayokButton}>
            <Button loading={paying} onClick={onClick} size="large">
              {t('mainPage.Payment')}{' '}
            </Button>
          </div>
        </Space>
      </Row>
    </div>
  );

  return (
    <>
      <div className={styles.phoneNumberDiv}>
        <Modal
          onCancel={onClose}
          visible={isModalPhoneNumber}
          className="modalStyle"
          closable={false}
          centered
          bodyStyle={{ padding: '16px 24px 0px 24px' }}
          footer={Footer}
        >
          <Row justify="center">
            <Image src={toki} preview={false} width={80} />
          </Row>

          <Row justify="center" style={{ textAlign: 'center' }}>
            <span>Toki апп-д бүртгэлтэй утасны дугаараа оруулна уу.</span>
          </Row>
          <br />
          <Form name="toki" form={form} onFinish={onFinish}>
            <Form.Item
              style={{ justifyContent: 'center' }}
              name="phone"
              className={styles.tokiNumberInput}
              rules={[{ pattern: PATTERN_PHONE, required: true, message: `${t('mainPage.PleaseEnterPhoneNumber')}` }]}
            >
              <Input placeholder={t('mainPage.PhoneNumber')} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
