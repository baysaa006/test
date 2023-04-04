import { SearchOutlined } from '@ant-design/icons';
import { Affix, Input, Row, Skeleton } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import styles from './style.module.scss';
import LanguagesScroll from '../languagesScroll/LanguagesScroll';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_KARAOKE, GET_SONG_CATEGORIES, SEARCH_SONGS } from '../../graphql/query/karaoke.qeury';
import debounce from 'lodash.debounce';
import ContentList from '../contentList/ContentList';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

export default function SearchContent(props: any) {
  const { onFocus, onBlur, stateOnfocus } = props;
  const [stateValue, setValue] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const { t, i18n } = useTranslation('language');

  const [getSongs, { loading, error, data }] = useLazyQuery(GET_KARAOKE);
  const [stateCategoriesId, setCategoriesId] = useState();

  const [searchSongs, { loading: searchLoading, data: resultSongs }] = useLazyQuery(SEARCH_SONGS);

  const { data: getSongCategories } = useQuery(GET_SONG_CATEGORIES, {
    skip: !id,
    onCompleted: (data) => {
      if (!isEmpty(data.getSongCategories)) {
        getSongs({ variables: { category: data.getSongCategories[0]?.id } });
        setCategoriesId(data.getSongCategories[0]?.id);
      }
    },
  });

  const debouncedFetchData = debounce((query: any) => {
    setValue(query);
    searchSongs({ variables: { category: stateCategoriesId, query: query } });
  }, 500);

  const searchOnChange = (e: any) => {
    debouncedFetchData(e.target.value);
  };

  const onChange = (e: any) => {
    setCategoriesId(e.target.value);
    getSongs({ variables: { category: e.target.value } });
  };

  const inputRef = useRef<any>();

  const hideKeyboard = () => {
    inputRef.current.blur();
  };

  useEffect(() => {
    let elements: any = document.querySelectorAll('[data-test-id=virtuoso-scroller]');
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      element.addEventListener('scroll', function () {
        hideKeyboard();
      });
    }
  }, [data, debouncedFetchData]);

  return (
    <>
      <LanguagesScroll
        stateCategoriesId={stateCategoriesId}
        setCategoriesId={setCategoriesId}
        getSongCategories={getSongCategories?.getSongCategories}
        onChange={onChange}
      />
      <Affix offsetTop={10} className={styles.searchContentDiv}>
        <div className={styles.searchInput}>
          <Row style={{ margin: '0px 0px 0px 0px' }}>
            <Input
              ref={inputRef}
              onChange={searchOnChange}
              prefix={<SearchOutlined />}
              allowClear
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder={t('mainPage.SearchSong')}
              onPressEnter={() => hideKeyboard()}
            />
          </Row>
        </div>
      </Affix>

      {loading ? (
        <Skeleton paragraph={{ rows: 20 }} />
      ) : (
        <>
          {/* <MobileList
            dataList={isEmpty(stateValue) ? data?.getSongs : resultSongs?.searchSongs}
            stateOnfocus={stateOnfocus}
          /> */}
          <ContentList
            emptyData={isEmpty(stateValue) ? data?.getSongs : resultSongs?.searchSongs}
            stateOnfocus={stateOnfocus}
          />
        </>
      )}
    </>
  );
}
