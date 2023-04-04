import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Col, Row, Select, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import MainFilterModal from '../mainFilter/MainFilter';
import { useRestaurantSearchStore } from '../../contexts/restaurant.search.context';
import { isEmpty } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_BRANCHES } from '../../graphql/query/branch.qeury';
import MiniSearch from 'minisearch';
import { useTranslation } from 'react-i18next';

let resultArray: any[] = [];

export default function SearchContent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;
  const { Text } = Typography;
  const { t, i18n } = useTranslation('language');
  const { setFeilds } = useRestaurantSearchStore();
  const [stateValue, setValue] = useState('');
  const { loading, error, data } = useQuery(GET_BRANCHES);

  useEffect(() => {
    if (loading === false) {
      if (data) {
        const branches = data.getParticipantBuyers.map((p: any) => p.branch);
        resultArray.push(...branches);
      }
    }
  }, [data, loading, stateValue]);

  let miniSearch = new MiniSearch({
    fields: ['name', 'description'], // fields to index for full-text search
    storeFields: ['name', 'specification', 'image', 'variants'], // fields to return with search results
  });

  miniSearch.addAll(resultArray);

  let results = miniSearch.autoSuggest(stateValue, { prefix: true, boost: { name: 2 }, fuzzy: 0.2 });

  const onSearch = (e: any) => {
    setValue(e);
  };

  const inputKey = (e: any) => {
    if (e.code === 'Enter') {
      if (!isEmpty(results)) {
        setFeilds(e.currentTarget.value);
      }
    }
  };

  const onSelect = (e: any) => {
    setFeilds(e);
  };

  const onClear = () => {
    setFeilds('');
  };

  const emptyText = (
    <>
      <Row justify="center" className={styles.searchNoIconDiv}>
        <Space direction="vertical">
          <Text style={{ color: '#b1b1b1' }}>Үр дүн олдсонгүй...</Text>
        </Space>
      </Row>
    </>
  );

  const placeholder = (
    <>
      <Space className={styles.placeHolder}>
        <SearchOutlined />
        <Text> {t('mainPage.searchPlaceholder')}</Text>
      </Space>
    </>
  );

  return (
    <>
      <Row justify="center" className={styles.bigContent}>
        <Col xs={21} sm={18} md={15} lg={17} xl={16} xxl={13}>
          <div className="element-title">
            <h1 className={styles.headerText}>{t('mainPage.bannerTitle1')}</h1>
          </div>
          <Row gutter={[14, 14]} justify="center">
            <Col xs={22} sm={18} md={18} lg={18} xl={18} xxl={18} className={styles.searchInput}>
              <Select
                showSearch
                allowClear
                placeholder={placeholder}
                optionFilterProp="children"
                onInputKeyDown={inputKey}
                onSearch={onSearch}
                notFoundContent={emptyText}
                autoClearSearchValue={false}
                onClear={onClear}
                showArrow={false}
                onSelect={onSelect}
              >
                {results.map((items: any, index: any) => {
                  return (
                    <Option key={index} value={items.suggestion}>
                      {items.suggestion}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <br />
        </Col>
      </Row>
      {isModalVisible && <MainFilterModal visible={isModalVisible} setIsModalVisible={setIsModalVisible} isKey={1} />}
    </>
  );
}
