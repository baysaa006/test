import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, Row, Space, Typography } from 'antd';
import React from 'react';
import styles from './styles.module.scss';
import foodPic from '../assets/extra-images/271722377_397062015547348_4459528919839574721_n.jpg';
import { numberFormat } from '../../helper/utils';
import { CURRENCY } from '../../helper/constant';
import { convertDraftType } from '../../tools/Tools';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

export default function DraftFoodCard(props: any) {
  const { Paragraph, Text } = Typography;
  const { items } = props;
  const { t, i18n } = useTranslation('language');

  return (
    <>
      <div className={styles.foodMediumCard}>
        <Card>
          <Row justify="space-around">
            <Image
              preview={false}
              src={isEmpty(items.image) ? foodPic : items.image}
              width={96}
              height="100%"
              fallback={foodPic}
            />
            <Col xs={12} sm={12} md={12} lg={13} xl={15} xxl={15} style={{ padding: '5px 5px 0px 5px' }}>
              <Paragraph strong ellipsis={{ rows: 1 }} style={{ margin: '0px 0px 0px 0px ' }}>
                {items.name}
              </Paragraph>
              {items.comment && (
                <Space className="draftItemComment">
                  <Button>{items.comment}</Button>
                </Space>
              )}
              <Row justify="space-between" style={{ paddingTop: 8 }}>
                <Space>
                  <Text strong className={styles.price}>
                    {items.quantity} x
                  </Text>
                  <Text strong className={styles.price}>
                    {numberFormat.format(items.price)} ₮
                  </Text>
                </Space>
                {items.quantity === 0 ? (
                  <Button icon={<ShoppingCartOutlined />}>{t('mainPage.Order')}</Button>
                ) : (
                  <>{convertDraftType(items.state)}</>
                )}
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}
