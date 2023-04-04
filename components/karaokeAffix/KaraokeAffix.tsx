import { Affix, Image, Space, Col } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import jwt_decode from 'jwt-decode';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { getAccessToken } from '../../contexts/auth.context';
import microphone from '../singleRestaurantFilterContainer/assets/microphone.svg';
interface IFeatures {
  channel: any;
  features: any[];
}

export default function KaraokeAffix(props: any) {
  const { menuItemId, setActiveMenu } = props;
  const { t, i18n } = useTranslation('language');
  const router = useRouter();
  const { id } = router.query;

  const handleClickHref = () => {
    router.push(`/karaoke?id=${id}`);
  };

  const [stateToken, setToken] = useState<IFeatures>();

  var token = getAccessToken();
  useEffect(() => {
    if (token) {
      setToken(jwt_decode(token));
    }
  }, [token]);
  return (
    <>
      {!isEmpty(stateToken?.features?.filter((val) => val === 'KRK')) && (
        <>
          <Col
            className={menuItemId === 4 ? 'active' : styles.affixCol}
            onClick={() => {
              handleClickHref();
              setActiveMenu(4);
            }}
          >
            <Image src={microphone} height={22} width={25} preview={false} />
            {t('mainPage.Karaoke')}
          </Col>

          <Affix style={{ position: 'fixed', zIndex: 1, bottom: 300, right: 0 }}>
            <div
              className={styles.karaokeDiv}
              onClick={() => {
                handleClickHref();
              }}
            >
              <Space size={1} direction="vertical" style={{ textAlign: 'center', padding: 10 }}>
                <Image preview={false} src={microphone} width={40} className={styles.imageSvg} />
                <span style={{ fontSize: 13, lineHeight: 0, color: 'white' }}>{t('mainPage.KaraokeBook')}</span>
              </Space>
            </div>
          </Affix>
        </>
      )}
    </>
  );
}
