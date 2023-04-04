import { CloseOutlined, FacebookOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Image, Row, Space, Typography } from 'antd';
import React from 'react';
import QmenuLogo from '../../../assets/images/newLogo.png';
import styles from './style.module.scss';
import facebook from '../../../assets/facebook-icon.png';
import { useTranslation } from 'react-i18next';
const { Text, Link } = Typography;

export default function QmenuRelated(props: any) {
  const { t, i18n } = useTranslation('language');
  const { onClose } = props;
  const handleClickHref = () => {
    window.location.href = `https://www.facebook.com/QmenuDigitaMenu`;
  };
  return (
    <>
      <Row justify="end">
        <CloseOutlined style={{ fontSize: 20 }} onClick={onClose} />
      </Row>
      <Row justify="center">
        <Col span={21}>
          <Image src={QmenuLogo} preview={false} />
        </Col>
        <Text>{t('mainPage.AboutsQmenu')}</Text>
        <Divider />
        <Card hoverable style={{ borderRadius: '10px', background: 'transparent' }}>
          <Space onClick={handleClickHref}>
            <Image src={facebook} preview={false} height={40} width={40} />
            <Text>{t('mainPage.FBQmenu')}</Text>
          </Space>
        </Card>
      </Row>
    </>
  );
}
