import { Affix, Col, Radio, Space, Typography } from 'antd';
import {
  CommentOutlined,
  InfoCircleOutlined,
  IssuesCloseOutlined,
  MenuOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import styles from './style.module.scss';
import 'react-multi-carousel/lib/styles.css';
import { useCartStore } from '../../contexts/cart.store';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import Icon from '@ant-design/icons';
import Icons from '../../assets/icons';
import { IconsProps } from '../../types/icon';
import { Translate } from 'react-auto-translate';

export default function Categories(props: any) {
  const { data } = props;
  const { Text } = Typography;
  const { setCategoryID, catchId, setSubCategoryId, subCategoryId } = useCartStore();
  const { t, i18n } = useTranslation('language');
  const fullwidth = global.window?.innerWidth;

  const renderSubCategoriesFirst = (item: any) => {
    if (!isEmpty(item.children)) {
      setSubCategoryId(item.children[0].id);
    }
  };

  const getCategoryId = (valueId: any) => {
    setCategoryID(valueId);
    setSubCategoryId('');
  };

  const getSubCategoryId = (valueId: any) => {
    setSubCategoryId(valueId);
  };

  return (
    <>
      <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 sticky-sidebar">
        <div className="filter-toggle">
          <span className="filter-toggle-text">{t('mainPage.Category')}</span>
          <i className="icon-chevron-down"></i>
        </div>
        <div className="filter-wrapper">
          <div className="categories-menu">
            <h6>
              <i className="icon-restaurant_menu"></i>
              {t('mainPage.Category')}
            </h6>

            <ul className="menu-list">
              {data?.map((items: any, index: any, active: any, actv: any) => {
                return (
                  <>
                    <li className={catchId === items.id ? 'active' : ''}>
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                          getCategoryId(items.id);
                          renderSubCategoriesFirst(items);
                        }}
                        className="menu-category-link"
                        key={index}
                      >
                        <Translate>{items?.name}</Translate>
                      </a>
                    </li>

                    {!isEmpty(items?.children) && (
                      <>
                        {catchId === items.id && (
                          <>
                            {items?.children.map((val: any, i: any) => (
                              <>
                                <li className={subCategoryId === val.id ? 'active' : ''}>
                                  <a
                                    style={{ marginLeft: '10px' }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      getSubCategoryId(val.id);
                                    }}
                                    className="menu-category-link"
                                    key={i}
                                  >
                                    <Translate>{val?.name}</Translate>
                                  </a>
                                </li>
                              </>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Affix offsetTop={0} style={{ zIndex: 1 }}>
        <Col span={25} style={{ padding: '0px 0px 0px 0px' }}>
          <div className={styles.categoriesDiv}>
            <Radio.Group
              defaultValue={isEmpty(data) === false && data[0]?.id}
              buttonStyle="solid"
              size="large"
              style={{ overflow: 'auto', width: '100%' }}
            >
              <Space className={styles.scrollNav}>
                {data?.map((items: any, index: any) => {
                  return (
                    <>
                      <div className={styles.radioButtonDiv}>
                        <Radio.Button
                          onClick={(e) => {
                            e.stopPropagation();
                            getCategoryId(items.id);
                            renderSubCategoriesFirst(items);
                          }}
                          key={index}
                          value={items?.id}
                          className={styles.radioButtonCategory}
                        >
                          <Space style={{ display: 'flex', height: '100%' }}>
                            {items.icon === 'none' ? (
                              <></>
                            ) : (
                              <Icon
                                component={Icons[items.icon as keyof IconsProps]}
                                style={{ fill: 'white', display: 'flex' }}
                              />
                            )}
                            <Text style={{ color: 'white' }}>
                              <Translate>{items?.name}</Translate>
                            </Text>
                          </Space>
                        </Radio.Button>
                      </div>
                    </>
                  );
                })}
              </Space>
            </Radio.Group>
          </div>
        </Col>
      </Affix>

      {!isEmpty(data?.find((val: any, index: any) => val.id === catchId)?.children) && (
        <>
          <Affix offsetTop={fullwidth > 768 ? 70 : 50} style={{ zIndex: 1 }}>
            <Col span={25} style={{ padding: '0px 0px 0px 0px' }}>
              <div className={styles.subCategoriesDiv}>
                <Radio.Group
                  defaultValue={
                    isEmpty(data?.find((val: any, index: any) => val.id === catchId)?.children) === false &&
                    data?.find((val: any, index: any) => val.id === catchId)?.children[0]?.id
                  }
                  buttonStyle="solid"
                  size="large"
                  style={{ overflow: 'auto', width: '100%' }}
                >
                  <Space>
                    {data
                      ?.find((val: any, index: any) => val.id === catchId)
                      ?.children?.map((items: any, index: any) => {
                        return (
                          <>
                            <div className={styles.subRadioButtonDiv}>
                              <Radio.Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  getSubCategoryId(items.id);
                                }}
                                key={index}
                                value={items?.id}
                                className={styles.subRadioButtonCategory}
                              >
                                <Space style={{ display: 'flex', height: '100%' }}>
                                  {items.icon === 'none' ? (
                                    <></>
                                  ) : (
                                    <Icon
                                      component={Icons[items.icon as keyof IconsProps]}
                                      style={{ fill: 'white', display: 'flex' }}
                                    />
                                  )}
                                  <Text style={{ color: 'white' }}>
                                    <Translate>{items?.name}</Translate>
                                  </Text>
                                </Space>
                              </Radio.Button>
                            </div>
                          </>
                        );
                      })}
                  </Space>
                </Radio.Group>
              </div>
            </Col>
          </Affix>
        </>
      )}
    </>
  );
}
