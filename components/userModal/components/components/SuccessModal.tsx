import { Button, Image, Modal, Result, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import successPic from '../../../../assets/singIn/Order Success Illustration.png';

import styles from '../style.module.scss';

const { Text } = Typography;

export default function SuccessModal(props: any) {
  const { t } = useTranslation('language');
  const { isModalVisible, title, setIsModalVisible, stayHere } = props;
  const router = useRouter();
  const goBack = () => {
    setIsModalVisible(false);
    if (stayHere) {
    } else {
      router.reload();
    }
  };

  const footer = (
    <div className={styles.nowPayokButton}>
      <Button style={{ width: '100%' }} onClick={goBack} type="primary">
        {t('mainPage.GoBack')}
      </Button>
    </div>
  );

  return (
    <div className={styles.nowPayDiv}>
      <Modal centered open={isModalVisible} className="modalStyle" closable={false} footer={footer}>
        <Row justify="center">
          <Image src={successPic} />
        </Row>
        <br />
        <Row justify="center">
          <Text strong style={{ fontSize: '20px', textAlign: 'center' }}>
            {title}
          </Text>
        </Row>
        <br />
      </Modal>
    </div>
  );
}
