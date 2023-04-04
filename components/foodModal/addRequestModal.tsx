import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  isModalVisible: boolean;
  onClose: () => void;
  styles: any;
  submit: (value: any) => void;
  comment: string;
}
const AddRequestModal = ({ isModalVisible, onClose, styles, submit, comment }: Props) => {
  const { t } = useTranslation('language');
  const [value, setValue] = useState(comment);

  const closeModal = () => {
    setValue(comment);
    onClose();
  };

  const onFinish = (e: any) => {
    submit(value);
    onClose();
  };

  const footer = () => {
    return <Button onClick={onFinish}>{t('mainPage.save')}</Button>;
  };

  return (
    <Modal
      visible={isModalVisible}
      className={styles.addRequestModal}
      onCancel={closeModal}
      title={t('mainPage.additionalRequests')}
      footer={footer()}
      width={400}
      closable={false}
    >
      <Form
        name="addRequest"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="request"
          rules={[{ required: true, message: t('mainPage.additionalRequestsSubmit') }]}
          colon={false}
          required={false}
        >
          <p style={{ marginLeft: '5px' }}>{t('mainPage.additionalRequests')}</p>
          <Input.TextArea
            placeholder={t('mainPage.additionalRequestsSubmit')}
            onChange={(e) => setValue(e.target.value)}
            defaultValue={comment}
            value={value}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRequestModal;
