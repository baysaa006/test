import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './style.module.scss';

export default function HandleHref() {
  const router = useRouter();
  const handleClickHref = () => {
    router.push('/restaurant');
  };

  return (
    <>
      <Button
        className={styles.menubtn}
        onClick={handleClickHref}
        type="primary"
        shape="circle"
        icon={<ArrowLeftOutlined />}
      ></Button>
    </>
  );
}
