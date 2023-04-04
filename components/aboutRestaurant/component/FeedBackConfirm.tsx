import { Button, Modal, Row, Image, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import confirmPic from '../../../assets/modalConfirmPic/Success.png';
import { useRouter } from 'next/router';

const { Text } = Typography;

export default function FeedBackConfirm(props: any) {
  const { isModalVisible, setIsModalVisible, onClose } = props;

  const { t, i18n } = useTranslation('language');
  const router = useRouter();
  const { id } = router.query;

  const handleOk = () => {
    setIsModalVisible(false);
    onClose();
  };

  const footers = (
    <Row justify="center" style={{ padding: '0px 0px 15px 0px' }}>
      <div className={styles.nowPayokButton}>
        <Button onClick={handleOk} size="large">
          {t('mainPage.homeLink')}
        </Button>
      </div>
    </Row>
  );

  return (
    <>
      <div className={styles.FeedBackConfirmDiv}>
        <Modal visible={isModalVisible} className="modalStyle" closable={false} footer={footers}>
          <Row justify="center">
            <Image src={confirmPic} preview={false} />
            <Text strong style={{ fontSize: '16px', textAlign: 'center' }}>
              {t('mainPage.ConfirmFeedBack')}
            </Text>
          </Row>
        </Modal>
      </div>
    </>
  );
}
