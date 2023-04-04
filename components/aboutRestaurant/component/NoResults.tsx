import { SmileOutlined } from '@ant-design/icons';
import { Button, Image, Result } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import noResult from '../../../assets/emptyCards.png';
import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';
export default function NoResults() {
  const router = useRouter();
  const { id } = router.query;
  const handelback = () => {
    window.location.href = `/restaurant?id=${id}`;
  };
  const { t } = useTranslation('language');
  return (
    <>
      <div className={styles.neResultLogg}>
        <Result
          icon={<Image src={noResult} alt="no logo" preview={false} width="100%" />}
          title={`${t('mainPage.NoOrderFound')}...`}
          extra={
            <Button onClick={handelback} type="primary">
              {t('mainPage.SendFeedback')}
            </Button>
          }
        />
      </div>
    </>
  );
}
