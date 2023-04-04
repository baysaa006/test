import { Button, Card, Col, Row, Space, Typography, Image } from 'antd';
import React, { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import { GroupedVirtuoso } from 'react-virtuoso';
import { isEmpty } from 'lodash';
import noMusicResult from '../../assets/musicEmpty.png';
import { useTranslation } from 'react-i18next';
const _ = require('lodash');
const { Text, Paragraph } = Typography;

export default function ContentList(props: any) {
  const { emptyData, stateOnfocus } = props;

  const { t, i18n } = useTranslation('language');

  const virtuoso = useRef<any>(null);
  const generateGroupedUsers = () => {
    const sortedLists = emptyData;
    const groupedUsers = _.groupBy(emptyData, (a: any) => a.name[0]);
    const groupCounts = Object.values(groupedUsers).map((users: any) => users.length);
    const groups = Object.keys(groupedUsers);
    return { sortedLists, groupCounts, groups };
  };
  const { sortedLists, groupCounts, groups } = generateGroupedUsers();

  return (
    <>
      {isEmpty(emptyData) ? (
        <>
          <br />
          <br />
          <br />
          <Row justify="center">
            <Space direction="vertical" className={styles.noMusicResult}>
              <Image src={noMusicResult} width={99} preview={false} />
              <Text strong>{t('mainPage.NoSongsFound')}</Text>
            </Space>
          </Row>
        </>
      ) : (
        <Row justify="space-around" className={styles.contentDiv}>
          <Col xs={20} sm={18} md={16} lg={16} xl={14} xxl={8}>
            <GroupedVirtuoso
              groupCounts={groupCounts}
              ref={virtuoso}
              style={{ height: stateOnfocus ? 'calc(104% - 8px)' : 'calc(91% - 8px)' }}
              groupContent={(index) => {
                return (
                  <div
                    style={{
                      backgroundColor: '#e8ebee',
                      padding: '0.3rem 1rem',
                      borderRadius: '10px',
                    }}
                  >
                    <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>{groups[index]}</Text>
                  </div>
                );
              }}
              itemContent={(index) => {
                return (
                  <Row justify="space-around">
                    <Col span={24} style={{ marginBottom: '6px' }}>
                      <Card>
                        <Row justify="space-between" className={styles.cardRow}>
                          <Col span={16}>
                            <Space size={0} direction="vertical">
                              <Paragraph>{sortedLists[index].name}</Paragraph>
                              <Paragraph style={{ color: '#5C616F', fontWeight: 'bold' }}>
                                {sortedLists[index].artist}
                              </Paragraph>
                            </Space>
                          </Col>
                          <Button>
                            <Text strong style={{ color: 'white' }}>
                              {sortedLists[index].code}
                            </Text>
                          </Button>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                );
              }}
            />
          </Col>
          <div className={styles.yScroll}>
            <Card className={styles.AtoZListCard}>
              <ul>
                {groupCounts
                  .reduce(
                    ({ firstItemsIndexes, offset }, count) => {
                      return {
                        firstItemsIndexes: [...firstItemsIndexes, offset],
                        offset: offset + count,
                      };
                    },
                    { firstItemsIndexes: [], offset: 0 },
                  )
                  .firstItemsIndexes.map((itemIndex: any, index: any) => (
                    <li
                      key={index}
                      className={styles.active}
                      style={{ listStyle: 'none', textAlign: 'center', lineHeight: '22px' }}
                    >
                      <a
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          virtuoso.current.scrollToIndex({
                            index: itemIndex,
                          });
                        }}
                      >
                        {groups[index]}
                      </a>
                    </li>
                  ))}
              </ul>
            </Card>
          </div>
        </Row>
      )}
    </>
  );
}
