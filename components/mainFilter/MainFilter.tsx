import React, { useState } from 'react';
import styles from './style.module.scss';
import { Button, Col, Drawer, Input, Row, Space, Tooltip, Typography } from 'antd';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import hotPot from './images/hotPot.svg';
import appetizer from './images/appetizer.svg';
import salad from './images/salad.svg';
import sushi from './images/sushi.svg';
import menu from './images/menu.svg';
import soup from './images/soup.svg';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

export default function MainFilterModal(props: any) {
  const { visible, setIsModalVisible, isKey } = props;
  const [stateRadioVal, setRadioVal] = useState(1);
  const { t, i18n } = useTranslation('language');

  const onClose = () => {
    setIsModalVisible(false);
  };

  const fullwidth = global.window?.innerWidth;

  const radioOnchange = (e: any) => {
    setRadioVal(e.target.value);
  };

  const onFinish = (values: any) => {};

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <>
      {' '}
      <Drawer
        bodyStyle={{ padding: '0px 20px', background: '#fffff' }}
        height={'80%'}
        size="default"
        placement={fullwidth > 742 ? 'right' : 'bottom'}
        visible={visible}
        onClose={onClose}
        closeIcon={false}
      >
        {isKey === 1 && (
          <div className={styles.searchInput}>
            <Row justify="space-between">
              <Input
                placeholder={t('mainPage.searchPlaceholder')}
                suffix={
                  <Tooltip title="Enter search">
                    <SearchOutlined />
                  </Tooltip>
                }
                prefix={<ArrowLeftOutlined onClick={onClose} />}
              />
            </Row>
          </div>
        )}

        {isKey === 2 && (
          <>
            <Row>
              <Typography className={styles.priceTextStyle}>Хоолны төрлүүд</Typography>
            </Row>
            <Row gutter={12} className={styles.mainFilterStyle}>
              <Col>
                <Button>
                  <Row>
                    <img src={appetizer} height="20" />
                    <Typography className={styles.textStyle}>Зууш / Appetizers</Typography>
                  </Row>
                </Button>
              </Col>
              <Col>
                <Button>
                  <Row>
                    <img src={menu} height="20" />
                    <Typography className={styles.textStyle}>Main course</Typography>
                  </Row>
                </Button>
              </Col>
              <Col>
                <Button>
                  <Row>
                    <img src={hotPot} height="20" />
                    <Typography className={styles.textStyle}>Hot pot Meat ball</Typography>
                  </Row>
                </Button>
              </Col>
              <Col>
                <Button>
                  <Row>
                    <img src={soup} height="20" />
                    <Typography className={styles.textStyle}>Шөл / Soup</Typography>
                  </Row>
                </Button>
              </Col>
              <Col>
                <Button>
                  <Row>
                    <img src={salad} height="20" />
                    <Typography className={styles.textStyle}>Salad & Appetizers</Typography>
                  </Row>
                </Button>
              </Col>
              <Col>
                <Button>
                  <Row>
                    <img src={sushi} height="20" />
                    <Typography className={styles.textStyle}>Roll & Maki</Typography>
                  </Row>
                </Button>
              </Col>
              <Col>
                <Button>
                  <Row>
                    <img src={appetizer} height="20" />
                    <Typography className={styles.textStyle}>Special & Skewers</Typography>
                  </Row>
                </Button>
              </Col>
            </Row>
            <Row>
              <Typography className={styles.priceTextStyle}>Үнэ</Typography>
            </Row>
            <Row className={styles.priceInputStyle}>
              <Col span={11}>
                <Input placeholder="Min Price"></Input>
              </Col>
              <Col span={11}>
                <Input placeholder="Max Price" style={{ marginLeft: '35px' }}></Input>
              </Col>
            </Row>
            <Row className={styles.filterRowStyle}>
              <div className="cs-calltoaction fancy text-center">
                <a
                  href="#"
                  className="csborder-color cs-color"
                  style={{
                    backgroundColor: '#eb6825',
                    color: '#ffffff',
                    width: '100%',
                    textTransform: 'none',
                    borderRadius: '8px',
                  }}
                >
                  {t('mainPage.Court')}
                </a>
              </div>
            </Row>
          </>
        )}
        {isKey === 3 && (
          <>
            <Row gutter={12} className={styles.mainFilterStyle}>
              <Space direction="vertical">
                <Button>
                  <Row>
                    <Typography className={styles.textStyle}>Шинэ нь эхэндээ</Typography>
                  </Row>
                </Button>

                <Button>
                  <Row>
                    <Typography className={styles.textStyle}>Хуучин нь эхэндээ</Typography>
                  </Row>
                </Button>

                <Button>
                  <Row>
                    <Typography className={styles.textStyle}>Үнэ өсөхөөр</Typography>
                  </Row>
                </Button>

                <Button>
                  <Row>
                    <Typography className={styles.textStyle}>Үнэ буурхаар</Typography>
                  </Row>
                </Button>
              </Space>
            </Row>
            <Row className={styles.filterRowStyle}>
              <div className="cs-calltoaction fancy text-center">
                <a
                  href="#"
                  className="csborder-color cs-color"
                  style={{
                    backgroundColor: '#eb6825',
                    color: '#ffffff',
                    width: '100%',
                    textTransform: 'none',
                    borderRadius: '8px',
                  }}
                >
                  {t('mainPage.Court')}
                </a>
              </div>
            </Row>
          </>
        )}
      </Drawer>
    </>
  );
}
