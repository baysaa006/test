import { Button, Modal, Row, Space, Typography, Image } from 'antd';
import React from 'react';
import styles from './style.module.scss';
import waiter from '../../assets/waiter.png';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { WAITER_CALL } from '../../graphql/mutation/waiterCall';
import { useRouter } from 'next/router';

const { Text } = Typography;

export default function WaiterModal(props: any) {
  const { setIsModalVisible, isModalVisible } = props;
  const { t, i18n } = useTranslation('language');
  const router = useRouter();
  const { id } = router.query;

  const [call, { loading }] = useMutation(WAITER_CALL, {
    onCompleted: (data) => {
      setIsModalVisible(false);
    },

    onError(err) {},
  });

  const handleOk = () => {
    call();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const footers = (
    <Row
      justify="center"
      style={
        id === '7d78f82b-e661-4636-b83d-d0d278256413'
          ? { padding: '0px 0px 15px 0px', fontFamily: 'italic, serif', fontStyle: 'italic' }
          : { padding: '0px 0px 15px 0px' }
      }
    >
      <Space direction="vertical">
        <div className={styles.nowPayCancelButton}>
          <Button onClick={handleCancel} size="large">
            {t('mainPage.No')}
          </Button>
        </div>
        <div className={styles.nowPayokButton}>
          <Button onClick={handleOk} size="large">
            {t('mainPage.Yes')}
          </Button>
        </div>
      </Space>
    </Row>
  );

  return (
    <>
      <Modal
        centered
        bodyStyle={
          id === '7d78f82b-e661-4636-b83d-d0d278256413' ? { fontFamily: 'italic, serif', fontStyle: 'italic' } : {}
        }
        visible={isModalVisible}
        className="modalStyle"
        closable={false}
        footer={footers}
      >
        <Row justify="center">
          <Image src={waiter} preview={false} alt="logo" height={100} width={100} />{' '}
        </Row>
        <br />
        <Row justify="center">
          <Text strong>{t('mainPage.Waiter')}</Text>
        </Row>
      </Modal>
    </>
  );
}
