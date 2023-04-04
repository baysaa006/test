import { Form, List, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useStoreFoods } from '../../contexts/food.store';
import FoodMediumCard from '../foodCard/FoodMediumCard';
import OrderReview from '../orderReview/OrderReview';
import DraftFoodCard from '../foodCard/DraftFoodCard';
import { useTranslation } from 'react-i18next';

interface DraftArray {
  id: string;
  state: string;
  name: string;
  quantity: number;
  price: any;
}

export default function SingleRestaurantDrawerOrder(props: any) {
  const { setVisible, visible, isWebType, branchData, isIndex } = props;
  const { Text } = Typography;
  const { foods } = useStoreFoods();
  const [form] = Form.useForm();

  const onClose = () => {
    setVisible(false);
  };
  const [stateDraft, setDraft] = useState<Array<DraftArray>>([]);
  const { t, i18n } = useTranslation('language');
  const filteredNewOrderArray = foods.filter((z: any) => z.status === 'NEW');

  const checkPersonContact = (text: any) => {
    form.submit();
  };

  const fullwidth = global.window?.innerWidth;
  return (
    <>
      {stateDraft.length === 0 ? (
        <></>
      ) : (
        <>
          {fullwidth > 742 ? (
            <>
              <Row justify="space-between">
                <Text style={{ fontSize: '15px' }} strong>
                  {t('mainPage.MyOrder')}
                </Text>
                {isWebType ? (
                  <></>
                ) : (
                  <Text onClick={onClose} strong style={{ color: '#007BFF' }}>
                    + {t('mainPage.OrderMore')}
                  </Text>
                )}
              </Row>
              <br />
              <List
                itemLayout="vertical"
                dataSource={stateDraft}
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1,
                }}
                renderItem={(item, index) => (
                  <List.Item>
                    <DraftFoodCard key={index} keys={item.id} items={item} />
                  </List.Item>
                )}
              />
              <br />
            </>
          ) : (
            <></>
          )}
        </>
      )}
      {filteredNewOrderArray.length === 0 ? (
        <></>
      ) : (
        <>
          <Row justify="space-between">
            <Text style={{ fontSize: '15px' }} strong>
              {stateDraft.length === 0 ? <>{t('mainPage.NewOrder')}</> : <>{t('mainPage.additionalOrders')} </>}
            </Text>
          </Row>
          <br />
          <List
            itemLayout="vertical"
            dataSource={filteredNewOrderArray}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 1,
              xxl: 1,
            }}
            renderItem={(item, index) => (
              <List.Item>
                <FoodMediumCard branchData={branchData} key={index} keys={item.variantsId} items={item} />
              </List.Item>
            )}
          />
        </>
      )}
      {foods && <OrderReview branchData={branchData} stateDraft={stateDraft} />}
    </>
  );
}
