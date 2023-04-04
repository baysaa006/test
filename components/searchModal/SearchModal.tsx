import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  MinusOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Image, Input, List, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import MiniSearch from 'minisearch';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_MENUS } from '../../graphql/query/menu.qeury';
import foodPic from '../../assets/noImage.jpg';
import listNoData from '../../assets/noSearch.png';
import { GET_BRANCH } from '../../graphql/query/branch.qeury';
import CurrentBranchType from '../../types/participant';
import { useRouter } from 'next/router';
import { toLatinConvert } from '../../helper/utils';
import { useTranslation } from 'react-i18next';
import { isEmpty, result } from 'lodash';
import { generateUUID, useStore, useStoreFoods } from '../../contexts/food.store';

let resultArray: any[] = [];
interface PushData {
  uuid: string;
  variantsId: string;
  name: string;
  salePrice: number;
  quantity: number;
  image: any;
  basesPrice: number;
  status: string;
  options: any[];
  unitType: string;
  unitValue: string;
  productId: string;
}
let prices: number[];
let max: number;
let min: number;

export default function SearchModal(props: any) {
  const { Text, Paragraph } = Typography;
  const { visible, branchData } = props;
  const router = useRouter();
  const { foods, addFoods, editFoods, participant } = useStoreFoods();
  const { addAFish, fishes } = useStore();

  const { t, i18n } = useTranslation('language');
  const { id } = router.query;
  const [stateValue, setValue] = useState('');
  const [stateModalData, setModalData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateCurrentBranchData, setCurrentBranchData] = useState<CurrentBranchType>();
  const [stateCounting, setCounting] = useState<any>(0);

  const [getCurrentBranch, { loading, error }] = useLazyQuery(GET_BRANCH, {
    onCompleted: (data) => {
      setCurrentBranchData(data.getParticipantBuyer);
    },
    onError(err) {
      router.push('/notfound');
    },
  });

  useEffect(() => {
    if (loading === false) {
      if (stateCurrentBranchData) {
        const filteredArray = stateCurrentBranchData?.menu?.categories;
        filteredArray.map((items: any) => {
          if (!isEmpty(items.children)) {
            items.children.map((value: any) => resultArray.push(...value.products));
          }
          resultArray.push(...items.products);
        });
      }
    }
  }, [stateCurrentBranchData, loading]);

  let miniSearch = new MiniSearch({
    fields: ['nameEn', 'descriptionEn'], // fields to index for full-text search
    storeFields: ['name', 'specification', 'description', 'image', 'variants'], // fields to return with search results
  });

  miniSearch.addAll(
    resultArray.map((item) => ({
      ...item,
      nameEn: toLatinConvert(item.name),
      descriptionEn: toLatinConvert(item.description),
    })),
  );

  const searchOnChange = (e: any) => {
    setValue(e.target.value);
  };
  const filteredNewArray = foods.filter((z: any) => z.status === 'NEW');

  let results = miniSearch.search(toLatinConvert(stateValue), { prefix: true, boost: { name: 1 }, fuzzy: 0.1 });
  let filterSearch = results.filter((item, index, self) => index === self.findIndex((t) => t.id === item.id));

  const fullwidth = global.window?.innerWidth;

  const drawerHeigth = (
    <div className={styles.searchInputDiv}>
      <Space size="middle">
        <ArrowLeftOutlined style={{ fontSize: '19px' }} onClick={props.onClose} />
        <Input
          allowClear
          placeholder={t('mainPage.WhatDoYouWantToEat')}
          onChange={searchOnChange}
          value={stateValue}
          prefix={<SearchOutlined style={{ fontSize: 18 }} />}
        />
      </Space>
    </div>
  );

  const emptys = (
    <div className={styles.searchNoIconDiv}>
      <Image src={listNoData} alt="frd" preview={false} />
    </div>
  );

  const showModal = (selectedItems: any) => {
    prices = selectedItems.variants.map((val: any) => val.salePrice);
    max = Math.max(...prices);
    min = Math.max(...prices);
    setModalData(selectedItems);
    setIsModalVisible(true);
  };
  const clicker = (items: any, key: any, basePrice: any) => {
    let findIndex = items.variants[0];
    console.log(findIndex);
    if (isEmpty(findIndex)) return;
    addAFish(fishes + 1);
    let pushingData: PushData = {
      uuid: generateUUID(),
      variantsId: findIndex.id,
      name: findIndex.name,
      salePrice: findIndex.salePrice,
      quantity: 1,
      image: findIndex.image,
      basesPrice: findIndex.salePrice,
      status: 'NEW',
      unitType: findIndex.unitType,
      unitValue: findIndex.unitValue,
      options: isEmpty(items.options) ? [] : items.options,
      productId: findIndex.id,
    };
    if (isEmpty(filteredNewArray)) {
      addFoods([pushingData]);
    } else {
      const filteredArray = filteredNewArray.filter((element) => element.variantsId === key);
      if (isEmpty(filteredArray)) {
        addFoods([pushingData]);
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

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const productDescription = (text: any) => (
    <Paragraph ellipsis={{ rows: 1 }} style={{ fontSize: '14px', margin: '0px 0px 0px 0px ' }}>
      {text}
    </Paragraph>
  );
  const isSelected = (item: any) => {
    let findIndex = item.variants[0];
    if (foods.some((e) => e.variantsId === findIndex.id)) return true;
    else return false;
  };
  return (
    <>
      <Drawer
        closeIcon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />}
        bodyStyle={{ padding: '20px', background: 'white' }}
        height={'100%'}
        closable={false}
        title={drawerHeigth}
        placement={fullwidth > 742 ? 'right' : 'top'}
        onClose={props.onClose}
        visible={visible}
      >
        <Row>
          <Text strong>{t('mainPage.SearchForFood')}</Text>
        </Row>
        <List
          itemLayout="horizontal"
          dataSource={filterSearch}
          locale={{ emptyText: emptys }}
          className={styles.searchContent}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Paragraph ellipsis={{ rows: 1 }} style={{ fontSize: '14px', margin: '0px 0px 0px 0px ' }}>
                    {item.name}
                  </Paragraph>
                }
                description={productDescription(item?.description)}
              />
              {participant && (
                <div className={styles.countButton}>
                  {isSelected(item) ? (
                    <CheckOutlined style={{ color: 'green' }} />
                  ) : (
                    <ShoppingCartOutlined
                      style={{ fontSize: '18px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        clicker(
                          item,
                          item.variants.map((z: any) => z.id)[0],
                          item.variants.map((z: any) => z.salePrice)[0],
                        );
                      }}
                    />
                  )}
                </div>
              )}
            </List.Item>
          )}
        />
      </Drawer>
      {/* <FoodModal
        closeModal={closeModal}
        dataList={stateModalData}
        minPrice={min}
        maxPrice={max}
        isModalVisible={isModalVisible}
      /> */}
    </>
  );
}
