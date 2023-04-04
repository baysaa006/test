import React, { useEffect } from 'react';
import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Affix, Button, Space, Typography, Row, message } from 'antd';
import styles from './style.module.scss';
import { useStore, useStoreFoods } from '../../contexts/food.store';
import { CURRENCY } from '../../helper/constant';
import { numberFormat } from '../../helper/utils';
import { useTranslation } from 'react-i18next';
import { optionsCalc } from '../../tools/Tools';

export default function UserOrder(props: any) {
  const { setVisible } = props;
  const { fishes } = useStore();
  const { Text } = Typography;
  const { foods } = useStoreFoods();
  const { t } = useTranslation('language');
  const filteredDraftArray = foods.filter((z: any) => z.status === 'DRAFT');
  const filteredNewArray = foods.filter((z: any) => z.status === 'NEW');
  let totalAmount1 = filteredNewArray.reduce((total, element) => {
    return total + element.quantity;
  }, 0);

  let totalValue = filteredNewArray?.reduce(
    (a: any, b: any) => a + Math.abs(optionsCalc(b.options) + b.basesPrice) * b.quantity,
    0,
  );

  const showDrawer = () => {
    if (filteredNewArray.length === 0 && filteredDraftArray.length === 0) {
      setVisible(false);
      message.info('Хоол сонгон уу.');
    } else {
      setVisible(true);
    }
  };
  return (
    <>
      <div className={styles.buttonAffix}>
        <Affix style={{ position: 'fixed', right: 0, zIndex: 1 }} className={styles.shopAffix}>
          <Button
            size="large"
            onClick={showDrawer}
            icon={<ShoppingCartOutlined style={{ color: 'white', fontSize: 19 }} />}
          >
            {fishes}
          </Button>
        </Affix>
        {foods.length > 0 && (
          <Affix style={{ position: 'fixed', zIndex: 1, width: '100%' }} className={styles.shopAffixOne}>
            <Row justify="center" style={{ padding: '10px' }}>
              <Button size="middle" onClick={showDrawer}>
                <Row justify="space-between">
                  <Space>
                    <ShoppingOutlined />
                    <Text>
                      {isNaN(totalAmount1) ? (
                        0
                      ) : (
                        <>
                          ({totalAmount1.toFixed(2).replace('.00', '')}) {t('mainPage.Order')}
                        </>
                      )}
                    </Text>
                  </Space>
                  <Text>
                    {isNaN(totalValue) ? (
                      <>0 ₮</>
                    ) : (
                      <>
                        {numberFormat.format(
                          filteredNewArray?.reduce(
                            (a: any, b: any) => a + Math.abs(optionsCalc(b.options) + b.basesPrice) * b.quantity,
                            0,
                          ),
                        )}
                        ₮
                      </>
                    )}
                  </Text>
                </Row>
              </Button>
            </Row>
          </Affix>
        )}
      </div>
    </>
  );
}
