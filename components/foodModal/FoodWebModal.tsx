import React, { useEffect, useState } from 'react';
import { generateUUID, useStore, useStoreFoods } from '../../contexts/food.store';
import { CURRENCY } from '../../helper/constant';
import { numberFormat } from '../../helper/utils';
import styles from './style.module.scss';
import foodPic from '../assets/extra-images/271722377_397062015547348_4459528919839574721_n.jpg';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Image, message, Radio, Row, Space, Typography, Modal, Col } from 'antd';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import check from '../../assets/orderTypesPic/Check.png';
import unCheck from '../../assets/orderTypesPic/UnCheck.png';
import { IDraftItem, IMenuVariantOption } from '../../types';
import OptionValues from './OptionValues';

interface IAddOrderItem {
  uuid: string;
  variantsId: string;
  name: string;
  salePrice: number;
  quantity: number;
  image: any;
  basesPrice: number;
  status: string;
  unitType: string;
  unitValue: string;
  options: any[];
  productId: string;
}

type Props = {
  visible: boolean;
  onClose: () => void;
  minPrice: number;
  maxPrice: number;
  dataList?: any;
};

let counts = 0;
export default function FoodWebModal({ visible, onClose, minPrice, maxPrice, dataList }: Props) {
  const { Paragraph, Text } = Typography;
  const { foods, addFoods, editFoods, participant, setVisibleShow } = useStoreFoods();
  const [orderItem, setOrderItem] = useState<IDraftItem | null>();
  const { t } = useTranslation('language');
  const [stateCount, setCount] = useState(Number);
  const { addAFish, fishes } = useStore();
  const [visibleOption, setVisible] = useState(false);
  const [options, setOptions] = useState<IMenuVariantOption[]>([]);
  const [values, setValues] = useState<IMenuVariantOption | null>();
  const onClickValue = (value: any) => {
    setOrderItem(value);
    setOptions([]);
  };

  const defaultVariant = (value: any) => {
    setOrderItem(value);
    setCount(1);
  };

  const onClickArraySelect = (option: any) => {
    const filter = options?.filter((item) => item.id === option.id);

    if (isEmpty(filter)) {
      if (option.values.length === 1) {
        if (isEmpty(options)) {
          setOptions([option]);
        } else {
          const AddArray = options.concat([option]);
          setOptions(AddArray);
        }
      } else {
        setValues(option);
        setVisible(true);
      }
    } else {
      setOptions([...options.filter((item) => item.id !== option.id)]);
    }
  };

  const onClickOption = (option: any) => {
    const filter = options?.filter((item) => item.id === option.id);

    if (isEmpty(filter)) {
      if (isEmpty(options)) {
        setOptions([option]);
      } else {
        const AddArray = options.concat([option]);
        setOptions(AddArray);
      }
    } else {
      setOptions([...options.filter((item) => item.id !== option.id)]);
    }
  };

  const onCloseOption = () => {
    setValues(null);
    setVisible(false);
  };

  const addOption = (value: string) => {
    if (values) {
      const addOption = {
        values: [value],
        type: values.type,
        name: values.name,
        price: values.price,
        id: values.id,
        active: values.active,
      };
      if (isEmpty(options)) {
        setOptions([addOption]);
      } else {
        const AddArray = options.concat([addOption]);
        setOptions(AddArray);
      }
      onCloseOption();
    }
  };

  useEffect(() => {
    if (visible && dataList) {
      defaultVariant(dataList?.variants[0]);
    }
    if (!visible) {
      setOrderItem(null);
      setValues(null);
      setCount(0);
      setOptions([]);
    }
  }, [visible]);

  const addCount = () => {
    if (orderItem) {
      if (orderItem.id === '') return message.info('Сонголт хийнэ үү');
      let pushingData: IAddOrderItem = {
        uuid: generateUUID(),
        variantsId: orderItem.id,
        name: orderItem?.name,
        salePrice: orderItem.salePrice,
        quantity: stateCount,
        image: orderItem.image,
        unitType: orderItem.unitValue,
        unitValue: orderItem.unitValue,
        basesPrice: orderItem.salePrice,
        status: 'NEW',
        options: options,
        productId: orderItem.id,
      };
      if (isEmpty(foods)) {
        addAFish(stateCount);
        addFoods([pushingData]);
      } else {
        addAFish(fishes + stateCount);
        const filteredArray = foods.filter((element: any) => element.variantsId === orderItem.id);
        if (isEmpty(filteredArray)) {
          addFoods([pushingData]);
        } else {
          foods.forEach((element: any, index) => {
            if (element.variantsId === orderItem.id && element.status === 'NEW') {
              foods[index].quantity = Math.abs(Number(foods[index].quantity) + Number(stateCount));
              foods[index].salePrice += Math.abs(foods[index].salePrice + Number(orderItem.salePrice));
            }
          });
          editFoods(foods.map((food) => ({ ...food, options: options })));
        }
      }
    }
  };

  const showDraftOrder = () => {
    if (stateCount > 0) {
      addCount();
    }
    setVisibleShow(true);
    onClose();
  };

  const drawerFooter = (
    <div
      style={{
        marginTop: '8%',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className={styles.orderButton}
    >
      <Button
        style={
          isEmpty(orderItem)
            ? { background: '#b1b1b1', borderColor: '#b1b1b1' }
            : {
                width: '100%',
                padding: ' ',
                borderRadius: '10px',
                backgroundColor: '#f26333',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
              }
        }
        disabled={dataList && dataList.variants?.length > 1 && isEmpty(orderItem)}
        onClick={showDraftOrder}
        size="large"
      >
        <span
          style={{
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {t('mainPage.Order')}
        </span>
        <div style={{ display: 'flex', gap: '10px' }}>
          {dataList?.variants &&
            dataList.variants.map((items: any, index: any) => {
              if (items.active)
                return (
                  <>
                    {orderItem?.id === items.id && (
                      <Text key={index} strong style={{ color: '#fff' }}>
                        {numberFormat.format(
                          options.reduce((res, item) => {
                            res = res + item.price;
                            return res;
                          }, items.salePrice) * stateCount,
                        )}
                        {CURRENCY}
                      </Text>
                    )}
                  </>
                );
            })}{' '}
        </div>
      </Button>
    </div>
  );

  const headerTitle = (
    <>
      <Row justify="start">
        <Text className={styles.foodNameModal} strong>
          {t('mainPage.ReadMore')}
        </Text>
      </Row>
    </>
  );

  const variantsContent = (dataList: any) => (
    <div
      style={{
        height: '100%',
        width: '54%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      <Col span={24} className={styles.variantsCol}>
        <Col>
          <Text style={{ color: '#77798c', textTransform: 'uppercase', fontWeight: 'bold' }} strong>
            {t('mainPage.Variants')}
          </Text>
        </Col>
        <Radio.Group value={orderItem}>
          <Space className={styles.checkBox} style={{ width: '50vw', overflow: 'auto' }}>
            {dataList.variants &&
              dataList?.variants?.map((items: any, index: any) => {
                if (items.active)
                  return (
                    <Card
                      style={
                        orderItem === items ? { height: '150px', border: '1px solid #f26333 ' } : { height: '150px' }
                      }
                      key={index}
                      hoverable
                      onClick={(e) => {
                        onClickValue(items);
                      }}
                    >
                      {dataList?.variants.length > 1 && (
                        <div className={styles.checkImg}>
                          <Image src={orderItem?.id === items.id ? check : unCheck} preview={false} />
                        </div>
                      )}

                      <Radio value={items}></Radio>
                      <Row style={{ height: '110px', width: '110px' }}>
                        <Space
                          direction="vertical"
                          style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text style={{ color: '#77798c' }} strong>
                            {items.name}
                          </Text>
                          <Text strong style={{ color: '#F26333' }}>
                            {numberFormat.format(items.salePrice)} {CURRENCY}
                          </Text>
                          {orderItem?.id === items.id ? (
                            <Space className={styles.countButton} style={{ padding: '0px 0px 0px 0px ' }}>
                              <Button
                                type="primary"
                                onClick={() => stateCount > 0 && setCount(stateCount - 1)}
                                style={{ background: 'white', borderColor: '#F26333' }}
                                icon={<MinusOutlined style={{ color: '#F26333' }} />}
                              />
                              {orderItem?.id === items.id ? (
                                <span style={{ color: '#F26333' }}>{stateCount}</span>
                              ) : (
                                <span style={{ color: '#F26333' }}>0</span>
                              )}
                              <Button
                                type="primary"
                                style={{ background: 'white', borderColor: '#F26333' }}
                                icon={<PlusOutlined style={{ color: '#F26333' }} />}
                                onClick={() => setCount(stateCount + 1)}
                              />
                            </Space>
                          ) : (
                            <></>
                          )}
                        </Space>
                      </Row>
                    </Card>
                  );
              })}
          </Space>
        </Radio.Group>
      </Col>
      <Row style={{ padding: '10px 0px ' }}>
        <Text style={{ color: '#77798c', textTransform: 'uppercase' }} strong>
          Нэмэлт сонголт
        </Text>
      </Row>
      <Col className={styles.variantsColVariant}>
        <Space className={styles.checkBoxVariant} style={{ width: '50vw', overflow: 'auto' }}>
          {orderItem?.options?.map((item: any, index) => {
            return (
              <Card
                key={index}
                hoverable
                style={
                  isEmpty(options?.filter((option) => option.id === item.id))
                    ? { height: 'max-content', width: '100%' }
                    : { height: 'max-content', borderColor: '#f26333', width: '100%' }
                }
                bodyStyle={{ padding: '10px 18px 10px 40px' }}
                onClick={() => (item.type === 'A' ? onClickArraySelect(item) : onClickOption(item))}
              >
                <div className={styles.checkImg}>
                  <Image
                    src={isEmpty(options?.filter((option) => option.id === item.id)) ? unCheck : check}
                    preview={false}
                  />
                </div>
                <Row justify="space-between" style={{ width: '100%' }}>
                  <Paragraph>
                    <p style={{ marginRight: '5px', color: '#77798c' }}>{item.name}</p>
                  </Paragraph>
                  {item.type === 'A' && (
                    <>
                      <Text strong style={{ color: '#77798c' }}>
                        {item.values.length < 2
                          ? `-${item.values[0]}`
                          : !isEmpty(options.filter((val) => val.id === item.id)) &&
                            `${options.find((val) => val.id === item.id)?.values}`}
                      </Text>
                    </>
                  )}

                  <Text strong style={{ color: '#F26333' }}>
                    {numberFormat.format(item.price)} {CURRENCY}
                  </Text>
                </Row>
              </Card>
            );
          })}
        </Space>
      </Col>
      {participant && drawerFooter}
    </div>
  );

  const content = (dataList: any) => {
    if (dataList?.variants?.length > 1 || !isEmpty(dataList?.variants?.find((value: any) => value.options))) {
      return variantsContent(dataList);
    }
  };

  return (
    <>
      <div className={styles.webTypeModals}>
        <Modal
          title={headerTitle}
          className={styles.webTypeModals}
          visible={visible}
          onCancel={() => onClose()}
          centered
          onOk={() => onClose()}
          style={{ borderRadius: '11px ', overflow: 'auto' }}
          footer={null}
          bodyStyle={{ borderRadius: '11px' }}
          width={'100%'}
        >
          <Row style={{ width: '100%' }} justify="space-between">
            <Col span={10}>
              <Col>
                <Image src={dataList?.image} alt="logo" preview style={{ borderRadius: '10px' }} fallback={foodPic} />
              </Col>
              <Col span={16} style={{ marginTop: '5%' }}>
                <Text className={styles.foodNameModal} strong>
                  {dataList?.name}
                </Text>
                <Paragraph className={styles.longdescModal}>
                  <div dangerouslySetInnerHTML={{ __html: dataList?.specification }} />
                </Paragraph>
                <div className={styles.priceModal}>
                  {minPrice === maxPrice && (
                    <Text style={{ color: '#F26333', fontWeight: 'bolder' }}>
                      {numberFormat.format(maxPrice)} {CURRENCY}
                    </Text>
                  )}
                </div>
                <br />
              </Col>
            </Col>
            <>{content(dataList)}</>
          </Row>
          {values && (
            <OptionValues visible={visibleOption} onClose={onCloseOption} addOption={addOption} option={values} />
          )}
        </Modal>
      </div>
    </>
  );
}
