import { Alert, Image } from 'antd';
import React from 'react';
import styles from './style.module.scss';
import vector from './assets/Vector.png';
type Props = {
  text: any;
  mode: 'error' | 'info' | 'success' | 'warning';
};

const InfoAlert = ({ mode, text }: Props) => {
  return (
    <div className={styles.warning}>
      <Alert
        description={text}
        type={mode}
        showIcon
        icon={<Image src={vector} preview={false} style={{ width: '16px', height: '16px' }} />}
        style={{ marginBottom: '10px', borderRadius: '10px' }}
      />
    </div>
  );
};

export default InfoAlert;
