import { Button, Image, message, Modal, Result, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { CURRENCY } from '../../helper/constant';
import { numberFormat } from '../../helper/utils';
import styles from './style.module.scss';
import orderPic from '../../assets/images/Order.png';
import { useMutation } from '@apollo/client';
import { GET_PAY_ORDER, GONFIRM_ORDER } from '../../graphql/mutation/payOrder';
import { useStore, useStoreFoods } from '../../contexts/food.store';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
const { Text } = Typography;
export default function OrderReviewModal(props: any) {
  const { isModalVisible, setIsModalVisible, totalCounts, cashId, setDraftData, setDraft, setVisible } = props;
  const [isShow, setIsShow] = useState(false);
  const { t, i18n } = useTranslation('language');
  const router = useRouter();
  const { id } = router.query;
  const { addAFish } = useStore();
  const { editFoods, setCreateOrderID } = useStoreFoods();
  const [confirmOrder, { loading }] = useMutation(GONFIRM_ORDER, {
    onCompleted: (data) => {
      message.success('амжилттай');
      setIsShow(true);
      setCreateOrderID('');
    },
    onError(err) {
      message.success('амжилтгүй');
    },
  });

  const handleOk = () => {
    confirmOrder({ variables: { id: cashId } });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const footers = (
    <Row justify="center" style={{ padding: '0px 0px 15px 0px' }}>
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

  const goBack = () => {
    router.reload();
    setIsShow(false);
    setIsModalVisible(false);
    setVisible(false);
    editFoods([]);
    addAFish(0);

    setDraftData({
      id: '',
      totalAmount: 0,
      discountAmount: 0,
      taxAmount: 0,
      items: [],
    });
    setDraft([]);
  };

  return (
    <>
      <div className={styles.nowPayDiv}>
        <Modal visible={isModalVisible} className="modalStyle" closable={false} footer={isShow === false && footers}>
          {isShow ? (
            <>
              <Result
                status="success"
                title={t('mainPage.YourOrderSuccess')}
                extra={
                  <div className={styles.nowPayokButton}>
                    <Button style={{ width: '100%' }} onClick={goBack} type="primary">
                      {t('mainPage.GoBack')}
                    </Button>
                  </div>
                }
              />
            </>
          ) : (
            <>
              <Row justify="center">
                <Image src={orderPic} preview={false} alt="logo" />
              </Row>
              <Row justify="center">
                <Text strong>{t('mainPage.PayAtTheBoxOffice')}.</Text>
              </Row>
              <Row justify="space-around" style={{ marginTop: '10px' }}>
                <Text>{t('mainPage.Total')}:</Text>
                <Text strong>{numberFormat.format(totalCounts)} ₮</Text>
              </Row>
            </>
          )}
        </Modal>
      </div>
    </>
  );
}
