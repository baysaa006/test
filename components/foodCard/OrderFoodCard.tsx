import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Image, Input, Rate, Row, Space, Typography } from 'antd';
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { isEmpty, isNull } from 'lodash';
import { numberFormat } from '../../helper/utils';

import { generateUUID, useStore, useStoreFoods } from '../../contexts/food.store';
import jwt_decode from 'jwt-decode';
import { getAccessToken } from '../../contexts/auth.context';
import { useTranslation } from 'react-i18next';
import { Translate } from 'react-auto-translate';
import { stat } from 'fs/promises';
import FoodWebModal from '../foodModal/FoodWebModal';

const { Meta } = Card;
const { Paragraph, Text } = Typography;

interface PushData {
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

interface variantsType {
  id: string;
  salePrice: number;
}

interface dataListType {
  variants: variantsType[];
  image: string;
  name: string;
}

interface channels {
  channel: any;
}
export default function OrderFoodCard(props: any) {
  const { addAFish, fishes } = useStore();
  const { foods, addFoods, editFoods, participant } = useStoreFoods();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateModalDataList, setModalDataList] = useState<dataListType>();
  const [stateCounting, setCounting] = useState<any>(0.1);
  const [isModalVisibles, setModalVisible] = useState(false);
  const [stateToken, setToken] = useState<channels>();
  const [inputValue, setInputValue] = useState<any>('');
  const [agent, setAgent] = useState('');
  const { t } = useTranslation('language');
  const { items, hidePrice } = props;
  let variants = items.variants?.filter((val: any) => {
    if (!val.active) {
      return null;
    } else {
      return val;
    }
  });

  let prices: number[] = variants?.map((val: any) => val.salePrice);
  let max: number = Math?.max(...prices);
  let min: number = Math.min(...prices);

  const filteredNewArray = foods.filter((z: any) => z.status === 'NEW');
  useEffect(() => {
    let variantId: string = items.variants.map((val: any) => val.id);
    if (variantId.length === 1) {
      const filterCounting = filteredNewArray.filter((element) => element.variantsId === variantId[0]);
      if (filterCounting.length === 0) {
        return setCounting(0.11515);
      }
      filterCounting.forEach((items, index) => {
        setCounting(items.quantity);
      });
    }
  }, [items, foods]);

  const showModal = (selectedItem: any) => {
    setIsModalVisible(true);
    setModalDataList(selectedItem);
  };

  const clicker = (items: any, key: any, basePrice: any) => {
    let findIndex = items.variants.filter((item: any) => item.salePrice === max);
    if (isEmpty(findIndex)) return;
    addAFish(fishes + 1);
    let pushingData: PushData = {
      uuid: generateUUID(),
      variantsId: findIndex[0]?.id,
      name: items.name,
      salePrice: max,
      quantity: 0,
      image: items.image,
      unitType: items.variants[0].unitType,
      unitValue: items.variants[0].unitValue,
      basesPrice: findIndex[0]?.salePrice,
      status: 'NEW',
      options: isEmpty(items.options) ? [] : items.options,
      productId: items.id,
    };

    if (isEmpty(filteredNewArray)) {
      addFoods([pushingData]);
      setCounting(stateCounting + 1);
    } else {
      const filteredArray = filteredNewArray.filter((element) => element.variantsId === key);
      if (isEmpty(filteredArray)) {
        addFoods([pushingData]);
        setCounting(stateCounting + 1);
      } else {
        foods.forEach((element, index) => {
          if (element.variantsId === key && element.status === 'NEW') {
            setCounting(stateCounting + 1);
            foods[index].quantity++;
            foods[index].salePrice += basePrice;
          }
        });
        editFoods(foods);
      }
    }
  };
  const clearCard = (key: any, basePrice: any) => {
    addAFish(fishes - 1);
    const filteredArray = foods.filter((element) => element.variantsId === key && element.status === 'NEW');
    if (filteredArray[0]?.quantity <= 1) {
      foods.forEach((elenemt, index) => {
        if (elenemt.variantsId === key && elenemt.status === 'NEW') {
          foods.splice(index, 1);
          editFoods(foods);
          setCounting(0);
        }
      });
    } else {
      foods.forEach((element, index) => {
        if (element.variantsId === key && element.status === 'NEW') {
          setCounting(stateCounting - 1);
          foods[index].quantity--;
          foods[index].salePrice -= basePrice;
        }
      });
      editFoods(foods);
    }
  };

  const onChange = (event: any, key: any, basePrice: any) => {
    const value = event.target.value;
    setInputValue(value);
    const parsedValue = parseFloat(value);

    if (parsedValue < 0) {
      foods.forEach((element, index) => {
        if (element.variantsId === key && element.status === 'NEW') {
          foods.splice(index, 1);
          setCounting(0);
        }
      });
    } else {
      addAFish(parsedValue);
      foods.forEach((element, index) => {
        if (element.productId === key && element.status === 'NEW') {
          setCounting(parsedValue);
          foods[index].quantity = parsedValue;
          foods[index].salePrice = basePrice * parsedValue;
          addAFish(fishes + parsedValue);
          editFoods(foods);
        }
      });
    }
  };
  function handleInputClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.select();
  }

  const nameText = (
    <Paragraph
      className={styles.foodName}
      style={{ fontSize: '13px', lineHeight: '15px', margin: '0px 0px 0px 0px ' }}
      ellipsis={{ rows: 2 }}
    >
      <Translate>{items.name}</Translate>
    </Paragraph>
  );
  const longDesc = (
    <Row justify="start" style={{ marginBottom: '8px' }}>
      <Paragraph ellipsis={{ rows: 2 }} style={{ margin: '0px 0px 0px 0px' }} className={styles.longDesc}>
        <Translate>{items.description}</Translate>
      </Paragraph>
    </Row>
  );

  var token = getAccessToken();

  useEffect(() => {
    if (token) {
      setToken(jwt_decode(token));
    }
  }, [token]);

  useEffect(() => {
    let string = stateCounting.toString();
    setInputValue(string);
  }, [stateCounting]);

  return (
    <div className={stateCounting === 0.11515 ? styles.orderFoodContainer : styles.activeOrderFoodContainer}>
      <div
        className={items.active ? styles.orderFoodCard : styles.OrderFoodCardHide}
        onClick={(e) => {
          e.stopPropagation();
          // showModal(items);
        }}
      >
        <Card className={styles.listShopCard}>
          <div className={styles.listShopCardDetail}>
            <Text className={styles.foodName}>
              {items.name}
              <Text style={{ color: '#77798C' }}>
                {items.variants[0].unitValue === 0 ? 1 : items.variants[0].unitValue}
                {t(`mainPage.${items.variants[0]?.unitType}`)}
              </Text>
            </Text>
            {/* <Text className={styles.foodName}>{items.description}</Text> */}
          </div>
          <div className={styles.listShopCardDetail}>
            <Text className={styles.itemPrice}>{numberFormat.format(max)}₮</Text>
          </div>
          <div className={styles.listShopCardDetail}>
            {participant && (
              <div className={styles.countButton}>
                {stateCounting === 0.11515 ? (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      clicker(
                        items,
                        items.variants.map((z: any) => z.id)[0],
                        items.variants.map((z: any) => z.salePrice)[0],
                      );
                    }}
                  >
                    <ShoppingCartOutlined className={styles.icons} />
                  </div>
                ) : (
                  <div className={styles.countersDiv}>
                    <MinusOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                        clearCard(
                          items.variants?.map((z: any) => z.id)[0],
                          items.variants?.map((z: any) => z.salePrice)[0],
                        );
                      }}
                      className={styles.counterIcons}
                    />
                    <div style={{ height: '30px', borderLeft: ' 1.5px solid #d6d3d3 ' }}></div>
                    <Input
                      bordered={false}
                      onClick={handleInputClick}
                      type="text"
                      inputMode="decimal"
                      step=".01"
                      className={styles.input}
                      value={isNaN(inputValue) ? '0' : inputValue}
                      onChange={(event) => onChange(event, items.id, items.basePrice)}
                    />
                    <div style={{ height: '30px', borderRight: ' 1.5px solid #d6d3d3 ' }}></div>
                    <PlusOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                        clicker(
                          items,
                          items.variants?.map((z: any) => z.id)[0],
                          items.variants?.map((z: any) => z.salePrice)[0],
                        );
                      }}
                      className={styles.counterIcons}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
      {/* <FoodModal
        closeModal={closeModal}
        dataList={stateModalDataList}
        minPrice={min}
        maxPrice={max}
        isModalVisible={isModalVisible}
      /> */}
      <FoodWebModal
        dataList={stateModalDataList}
        minPrice={min}
        maxPrice={max}
        visible={isModalVisibles}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}
