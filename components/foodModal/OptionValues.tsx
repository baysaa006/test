import { List, Modal, Typography } from 'antd';
import React from 'react';
import styles from './style.module.scss';

type Props = {
  visible: boolean;
  option: any;
  onClose: () => void;
  addOption: (item: any) => void;
};

const { Text } = Typography;

const OptionValues = ({ visible, option, onClose, addOption }: Props) => {
  return (
    <div className={styles.webTypeModals}>
      <Modal
        visible={visible}
        title="Сонголт"
        className={styles.webTypeModals}
        style={{ borderRadius: '11px ', overflow: 'auto' }}
        footer={null}
        width={300}
        centered
        onCancel={onClose}
        bodyStyle={{ borderRadius: '11px', padding: '16px' }}
      >
        <List
          dataSource={option.values}
          size="large"
          renderItem={(item: any) => (
            <List.Item onClick={() => addOption(item)}>
              <List.Item.Meta title={<Text>{item}</Text>} />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default OptionValues;
