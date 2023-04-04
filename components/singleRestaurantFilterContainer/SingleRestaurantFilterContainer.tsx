import { Card, Col, Row, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import CtxProvider from '../../contexts/ToolsContext';
import SingleRestaurantDrawer from '../singleRestaurantDrawer/SingleRestaurantDrawer';
import Categories from './Categories';
import SingleRestaurantTabs from './SingleRestaurantTabs';
import UserOrder from './UserOrder';
import styles from './style.module.scss';
import { useCartStore } from '../../contexts/cart.store';
import SingleRestaurantDrawerOrder from '../singleRestaurantDrawer/SingleRestaurantDrawerOrder';
import FooterNavBar from './FooterNavBar';
import { useStoreFoods } from '../../contexts/food.store';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { IMenuCategory } from '../../types';
export default function SingleRestaurantFilterContainer(props: any) {
  const { branchData, loading, loadingUser, userData } = props;
  const { setCategoryID, catchId, setSubCategoryId } = useCartStore();
  const { visibleShow, setVisibleShow, participant } = useStoreFoods();

  const [categoriesData, setData] = useState(
    branchData?.menu?.categories
      .map((item: IMenuCategory) => {
        const childrenItems = item.children.filter((childItem: IMenuCategory) => !isEmpty(childItem.products));
        if (!isEmpty(childrenItems)) {
          return { ...item, children: childrenItems };
        } else {
          if (!isEmpty(item.products)) return item;
        }
      })
      .filter((item: any) => item),
  );

  useEffect(() => {
    if (loading === false) {
      if (branchData) {
        setCategoryID(categoriesData[0]?.id);
        if (!isEmpty(categoriesData[0]?.children)) {
          setSubCategoryId(categoriesData[0]?.children[0].id);
        }
        setVisibleShow(false);
      }
    }
  }, [branchData, loading]);

  const onClose = () => {
    setVisibleShow(false);
  };
  return (
    <>
      <div className={styles.drawerDiv}>
        <CtxProvider>
          <Row justify="center" gutter={7} style={{ margin: '0px 0px 0px 0px ' }}>
            {loading ? (
              <>
                <Skeleton.Button active size="default" shape="square" block={true} />
              </>
            ) : (
              <Categories loading={loading} data={categoriesData} />
            )}
            <div className={styles.RestaurantTabs}>
              <SingleRestaurantTabs catchId={catchId} data={categoriesData} branchData={branchData} loading={loading} />
            </div>
            <Col xs={6} sm={6} md={12} lg={7} xl={7} xxl={6} className={styles.orderCol}>
              <Card style={{ borderRadius: '10px' }}>
                <SingleRestaurantDrawerOrder
                  branchData={branchData}
                  isIndex={false}
                  visible={visibleShow}
                  setVisible={setVisibleShow}
                  isWebType
                />
              </Card>
            </Col>
          </Row>
          <UserOrder setVisible={setVisibleShow} />
          {participant?.channel !== 'K' && (
            <FooterNavBar
              branchData={branchData}
              loading={loading}
              setVisible={setVisibleShow}
              userData={userData}
              loadingUser={loadingUser}
            />
          )}
          <SingleRestaurantDrawer
            isIndex={false}
            branchData={branchData}
            visible={visibleShow}
            setVisible={setVisibleShow}
          />
        </CtxProvider>
      </div>
    </>
  );
}
