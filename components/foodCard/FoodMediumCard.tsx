import { MinusOutlined, PlusOutlined, ShoppingCartOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, Input, InputNumber, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useStore, useStoreFoods } from '../../contexts/food.store';
import styles from './styles.module.scss';
import foodPic from '../assets/extra-images/271722377_397062015547348_4459528919839574721_n.jpg';
import { numberFormat } from '../../helper/utils';
import { CURRENCY } from '../../helper/constant';
import { useTranslation } from 'react-i18next';
import AddRequestModal from '../foodModal/addRequestModal';

import { Translate } from 'react-auto-translate';
import { optionsCalc } from '../../tools/Tools';
export default function FoodMediumCard(props: any) {
  const { t, i18n } = useTranslation('language');
  const { Paragraph, Text } = Typography;
  const { items, keys, branchData } = props;
  const { addAFish, fishes } = useStore();
  const { foods, editFoods } = useStoreFoods();
  const [inputValue, setInputValue] = useState<any>('');
  const [quantity, setQuantity] = useState(items.quantity);
  const [isVisibleAddRequest, setIsVisibleAddRequest] = useState(false);
  const [agent, setAgent] = useState('');

  let saleItemPrice = Math.abs(optionsCalc(items.options) + items.basesPrice) * items.quantity;
  const submitAddRequest = (value: any) => {
    foods.forEach((element, index) => {
      if (element.uuid === items.uuid && element.status === 'NEW') {
        foods[index] = { ...foods[index], comment: value };
      }
    });
    editFoods(foods);
  };
  useEffect(() => {
    setQuantity(items.quantity);
  }, [foods]);
  useEffect(() => {
    let string = quantity.toString();
    setInputValue(string);
  }, [quantity]);

  const clicker = (key: any, basePrice: any) => {
    addAFish(fishes + 1);
    foods.forEach((element, index) => {
      if (element.uuid === key && element.status === 'NEW') {
        setQuantity(quantity + 1);
        foods[index].quantity++;
        foods[index].salePrice += basePrice;
      }
    });
    editFoods(foods);
  };
  const clearCard = (key: any, basePrice: any) => {
    addAFish(fishes - 1);
    const filteredArray = foods.filter((element) => element.uuid === key && element.status === 'NEW');
    if (filteredArray[0].quantity <= 1) {
      foods.forEach((elenemt, index) => {
        if (elenemt.uuid === key && elenemt.status === 'NEW') {
          setQuantity(0);
          foods.splice(index, 1);
        }
      });
      editFoods(foods);
    } else {
      foods.forEach((element, index) => {
        if (element.uuid === key && element.status === 'NEW') {
          setQuantity(quantity - 1);
          foods[index].quantity--;
          foods[index].salePrice -= basePrice;
          editFoods(foods);
        }
      });
    }
  };
  const onChange = (event: any, key: any, basePrice: any) => {
    const value = event.target.value.trim();
    setInputValue(value);
    const parsedValue = parseFloat(value);
    if (parsedValue < 0) {
      foods.forEach((element, index) => {
        if (element.variantsId === key && element.status === 'NEW') {
          foods.splice(index, 1);
          setQuantity(0);
        }
      });
    } else {
      addAFish(parsedValue);
      foods.forEach((element, index) => {
        if (element.productId === key && element.status === 'NEW') {
          setQuantity(parsedValue);
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
  return (
    <div className={styles.foodMediumCard}>
      {items && (
        <>
          {items.quantity === 0.11515 ? (
            <></>
          ) : (
            <Card className={styles.listShopCard}>
              {/* <Image preview={false} alt="example" src={items.image} fallback={foodPic} /> */}
              <div className={styles.listShopCardDetail}>
                <Text className={styles.foodName}>
                  {items.name}{' '}
                  <Text style={{ color: '#77798C' }}>
                    {items.unitValue === 0 ? 1 : items.unitValue}
                    {t(`mainPage.${items.unitType}`)}
                  </Text>
                </Text>
              </div>
              <div className={styles.listShopCardDetail}>
                <Text className={styles.itemPrice}>
                  {isNaN(saleItemPrice) ? <>0</> : <> {numberFormat.format(saleItemPrice)}</>}₮
                </Text>
              </div>
              <div className={styles.listShopCardDetail}>
                <div className={styles.countButton}>
                  <div className={styles.countersDiv}>
                    <MinusOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                        clearCard(keys, items.basesPrice);
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
                      value={isNaN(inputValue) ? '0' : inputValue}
                      className={styles.input}
                      onChange={(event) => onChange(event, items.variantsId, items.basePrice)}
                    />
                    <div style={{ height: '30px', borderLeft: ' 1.5px solid #d6d3d3 ' }}></div>

                    <PlusOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                        clicker(keys, items.basesPrice);
                      }}
                      className={styles.counterIcons}
                    />
                  </div>
                </div>
              </div>
              <AddRequestModal
                comment={items.comment}
                submit={submitAddRequest}
                styles={styles}
                isModalVisible={isVisibleAddRequest}
                onClose={() => setIsVisibleAddRequest(false)}
              />
            </Card>
          )}
        </>
      )}
    </div>
  );
}
