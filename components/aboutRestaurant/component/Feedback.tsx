import { CloseOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Avatar, Button, Row, Typography, Image, Col, Space, Result, Form, Input, Divider, message } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import restPic from '../../../assets/images/asiana.png';
import { PATTERN_PHONE } from '../../../constants/Pattern';
import { CREATE_FEEDBACK } from '../../../graphql/mutation/feedBack';
import FeedBackConfirm from './FeedBackConfirm';
import styles from './style.module.scss';
const { Text } = Typography;
const { TextArea } = Input;
export default function Feedback(props: any) {
  const { onClose, feedBackData, closeIcon, setModalConfirm } = props;
  const { t, i18n } = useTranslation('language');
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  const [createFeedback, { loading }] = useMutation(CREATE_FEEDBACK, {
    onCompleted: (data) => {
      setModalConfirm(true);
      form.resetFields();
      onClose();
    },
    onError(err) {
      message.warning('Амжилтгүй');
    },
  });

  const onFinish = (input: any) => {
    createFeedback({
      variables: {
        id: id,
        input,
      },
    });
  };

  const extraForm = (
    <>
      <Text strong style={{ fontSize: 18 }}>
        {t('mainPage.SendFeedback')}
      </Text>
      <Divider />
      <div className={styles.feedBackForm}>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
          className={styles.feedBackForm}
        >
          <Form.Item
            style={{ justifyContent: 'center' }}
            name="phone"
            rules={[{ pattern: PATTERN_PHONE, required: true, message: `${t('mainPage.PleaseEnterPhoneNumber')}` }]}
          >
            <Input placeholder={t('mainPage.EnterPhoneNumber')} />
          </Form.Item>
          <Form.Item
            style={{ justifyContent: 'center' }}
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: `${t('mainPage.PleaseEnterEmail')}`,
              },
            ]}
          >
            <Input placeholder={t('mainPage.EnterEmail')} />
          </Form.Item>
          <Form.Item
            style={{ justifyContent: 'center' }}
            name="name"
            rules={[{ required: true, message: `${t('mainPage.PleaseEnterName')}` }]}
          >
            <Input placeholder={t('mainPage.EnterName')} />
          </Form.Item>
          <Form.Item
            style={{ justifyContent: 'center' }}
            name="comment"
            rules={[{ required: true, message: `${t('mainPage.WriteYourComments')}` }]}
          >
            <TextArea placeholder={t('mainPage.WriteYourComments')} rows={4} />
          </Form.Item>
          <Form.Item style={{ justifyContent: 'center' }} wrapperCol={{ offset: 0, span: 10 }}>
            <Button type="primary" htmlType="submit">
              {t('mainPage.Send')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );

  return (
    <>
      {closeIcon ? (
        <></>
      ) : (
        <Row justify="end" className={styles.FeedBackClose}>
          <CloseOutlined style={{ fontSize: 20 }} onClick={onClose} />
        </Row>
      )}

      <Row justify="center" className={styles.feedBackDesktopDesign}>
        <Result
          icon={
            <Image preview={false} className={styles.ImageDesktop} src={feedBackData?.logo} height="90%" width="90%" />
          }
          extra={extraForm}
        />
      </Row>
    </>
  );
}
