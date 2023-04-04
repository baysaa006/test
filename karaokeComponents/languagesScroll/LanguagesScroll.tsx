import { Affix, Col, Radio, Space } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import { Translate } from 'react-auto-translate';
export default function LanguagesScroll(props: any) {
  const { getSongCategories, setCategoriesId, stateCategoriesId, onChange } = props;
  const { t, i18n } = useTranslation('language');
  return (
    <>
      <Affix offsetTop={0}>
        <Col span={25}>
          <div className={styles.categoriesDiv}>
            <Radio.Group
              defaultValue={1}
              buttonStyle="solid"
              size="large"
              style={{ overflow: 'auto', width: '100%' }}
              onChange={onChange}
            >
              <Space>
                {getSongCategories?.map((item: any) => (
                  <>
                    <Radio.Button value={item.id}>
                      <Translate>{item.name}</Translate>
                    </Radio.Button>
                  </>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </Col>
      </Affix>
    </>
  );
}
