import { Modal } from 'antd';
import React from 'react';
import styles from './style.module.scss';
import SimpleMap from './Maps';

export default function CurrentAddressModal(props: any) {
  const { isModalVisible, onClose, setCenter, center, searchLocation, selectedAddress } = props;

  return (
    <>
      <div className={styles.currentLocationDiv}>
        <Modal
          centered
          visible={isModalVisible}
          onCancel={onClose}
          className="modalStyle"
          closable={false}
          footer={false}
        >
          <SimpleMap
            currentLocation={searchLocation}
            selectedAddress={selectedAddress}
            setCenter={setCenter}
            isModalVisible={isModalVisible}
            center={center}
          />
        </Modal>
      </div>
    </>
  );
}
