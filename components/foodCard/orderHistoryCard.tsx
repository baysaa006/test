import { Card, Col, Image, Row, Space, Typography, Button } from 'antd';
import React from 'react';
import styles from './styles.module.scss';
import foodPic from '../assets/extra-images/271722377_397062015547348_4459528919839574721_n.jpg';
import { numberFormat } from '../../helper/utils';
import { CURRENCY } from '../../helper/constant';
import { useTranslation } from 'react-i18next';
import emptyImg from '../../assets/noImage.jpg';
import { isEmpty } from 'lodash';
import { Translate } from 'react-auto-translate';

export default function OrderHistoryCard(props: any) {
  const { Paragraph, Text } = Typography;
  const { t, i18n } = useTranslation('language');
  const { items } = props;

  return (
    <>
      <div className={styles.foodHostoryCard}>
        <Card hoverable>
          <Row justify="space-between" style={{ height: '40px' }}>
            <Col span={8} style={{ padding: '0px 5px 0px 5px', alignSelf: 'center' }}>
              <Paragraph strong ellipsis={{ rows: 1 }} style={{ margin: '0px 0px 0px 0px ' }}>
                <Translate>{items.name} </Translate>
                <Translate>
                  {items.unitValue === 0 ? 1 : items.unitValue}
                  {t(`mainPage.${items.unitType}`)}
                </Translate>
              </Paragraph>
              {items.comment && (
                <Space className="draftItemComment">
                  <Button>{items.comment}</Button>
                </Space>
              )}
            </Col>
            <Col span={8}>
              <Row justify="space-between">
                <Space>
                  <Text className={styles.price}>{items.quantity} x</Text>
                  <Text className={styles.price}>{numberFormat.format(items.price)} ₮</Text>
                </Space>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}
