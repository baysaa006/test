import { Button, Modal, Row, Typography } from 'antd';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { dateFormat, moneyFormat } from '../../../helper/constant';
import styles from './style.module.scss';
import QRCode from 'qrcode';
import { useStoreFoods } from '../../../contexts/food.store';
import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

type Props = {
  visible: boolean;
  order: any;
  withVat: boolean;
  onClose: () => void;
};

const { Text } = Typography;

const ReceiptModal = ({ visible, order, withVat, onClose }: Props) => {
  const { participant } = useStoreFoods();

  const [qrImg, setQrImg] = useState('');
  const { t, i18n } = useTranslation('language');
  const withVats = order?.vatState === 'G' && withVat;
  const orderTaxSum = order && Math.abs(order?.taxAmount + order?.vatAmount + order?.cityTax).toFixed(2);
  var qrData = [{ data: isEmpty(order?.vatData) ? '' : order?.vatData, mode: 'numeric' }];
  QRCode.toDataURL(qrData, { errorCorrectionLevel: 'L' })
    .then((url: any) => {
      setQrImg(url);
    })
    .catch((err: any) => {
      console.error(err);
    });

  const headerTitle = (
    <>
      <Row justify="center">
        <Text strong>{t('mainPage.RECEIPT')}</Text>
      </Row>
      <div className={styles.closeButton}>
        <CloseOutlined style={{ fontSize: '20px' }} onClick={onClose} />
      </div>
    </>
  );

  // const footer = (
  //   <Row className={styles.resOrderButton} justify="center">
  //     {/* <Button style={{ width: '100%' }} disabled size="middle">
  //       Бүртгэх
  //     </Button> */}
  //   </Row>
  // );
  const content = (
    <div className={styles.receiptOrder}>
      {participant?.branch && (
        <div className={styles.info}>
          <div className={styles.logo}>
            <img src={participant.branch.logo} alt="logo" />
          </div>
          <div>
            <span>
              Хаяг : {participant.branch.address}
              <br />
              {participant.branch.email && (
                <>
                  И-Майл : {participant.branch.email}
                  <br />
                </>
              )}
              Утас : {participant.branch.phone}
              <br />
            </span>
          </div>
        </div>
      )}

      {participant?.branch && (
        <>
          <div className={styles.center}>
            <h3>{participant.branch.name}</h3>
          </div>
        </>
      )}
      <div>
        <span className={styles.title}>Дугаар : </span>
        <span>{order?.number.slice(8)}</span>
      </div>
      <div>
        <span className={styles.title}>Огноо : </span>
        <span>{dateFormat(order?.createdAt, 'yyyy-MM-DD HH:mm')}</span>
      </div>
      <div>
        <span>Захиалгын дугаар : </span>
        <span>{order?.number}</span>
      </div>
      {withVats && (
        <div>
          <span>ДДТД : </span>
          <span>{order?.vatBillId}</span>
        </div>
      )}
      {withVats && order?.vatType === 3 && (
        <>
          <div className={styles.bodLine}>Худалдан авагч :</div>
          <div>
            <span>ТТД : </span>
            <span>{order?.register}</span>
          </div>
          <div>
            <span>Нэр : </span>
            <span>{order?.buyer}</span>
          </div>
        </>
      )}

      <table className={styles.line}>
        <thead className={styles.header}>
          <tr>
            <th align="left">Бараа</th>
            <th align="center">Тоо</th>
            <th align="right">Үнэ</th>
            <th align="right">Дүн</th>
          </tr>
        </thead>
        <tbody>
          {order?.items
            .filter((val: any) => val.state !== 'MOVED' && val.state !== 'RETURN')
            .map((item: any) => (
              <tr>
                <td width={'40%'}>
                  {item.name} <></> {item.unitValue === 0 ? <>1</> : item.unitValue} {t(`mainPage.${item.unitType}`)}
                </td>
                <td width={'20%'} align="center">
                  {item.quantity}
                </td>
                <td width={'12%'} align="right">
                  {moneyFormat(item.price)}
                </td>
                <td width={'25%'} align="right">
                  {moneyFormat(item.quantity * item.price)}
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot className={styles.footer}>
          <tr>
            <td />
            <td className={styles.bold} align="center">
              {/* {order?.items
                .filter((val: any) => val.state !== 'MOVED' && val.state !== 'RETURN')
                .reduce((sum: any, a: any) => sum + a.quantity, 0)} */}
            </td>
            <td />

            <td className={styles.bold} align="right">
              {moneyFormat(
                order?.items
                  .filter((val: any) => val.state !== 'MOVED' && val.state !== 'RETURN')
                  .reduce((sum: any, a: any) => sum + a.quantity * a.price, 0),
              )}
            </td>
          </tr>
        </tfoot>
      </table>

      <table className={styles.line} width={'100%'}>
        {!isEmpty(order?.discounts) && (
          <>
            {order?.discounts.map((item: any) => (
              <tr>
                <td width={'100%'} align="left">
                  <span style={{ marginLeft: '10px' }}>{item.name}</span>
                </td>
                <td width={'100%'} />
                <td width={'100%'} align="right">
                  {item.amount !== 0 && '-'}
                  {moneyFormat(item.amount)}
                </td>
              </tr>
            ))}
          </>
        )}

        {!isEmpty(order?.charges) && (
          <>
            {order?.charges.map((item: any) => (
              <tr>
                <td width={'100%'} align="left">
                  <span style={{ marginLeft: '10px' }}> {item.name}:</span>
                </td>
                <td width={'100%'} />

                <td width={'100%'} align="right">
                  {moneyFormat(item.amount)}
                </td>
              </tr>
            ))}
          </>
        )}

        {withVats && (
          <tr>
            <td width={'100%'} align="left">
              <span style={{ marginLeft: '10px' }}>НӨАТ : </span>
            </td>
            <td width={'100%'} />

            <td width={'100%'} align="right">
              {moneyFormat(order?.vatAmount)}
            </td>
          </tr>
        )}
        {withVats && order?.cityTax !== 0 && (
          <tr>
            <td width={'100%'} align="left">
              <span style={{ marginLeft: '10px' }}>НХАТ : </span>
            </td>
            <td width={'100%'} />

            <td width={'100%'} align="right">
              {moneyFormat(order?.cityTax)}
            </td>
          </tr>
        )}
        <tr>
          <td width={'100%'} align="left">
            <strong>Төлөх дүн : </strong>
          </td>
          <td width={'100%'} />

          <td width={'100%'} align="right">
            <strong>{moneyFormat(order?.grandTotal)}</strong>
          </td>
        </tr>
      </table>

      <div className={styles.line} />
      {withVats && (
        <div className={styles.vat}>
          <div className={styles.qr}>{order?.vatData && <img src={qrImg} width={'100%'} />}</div>
          {order?.vatType === 1 && (
            <div>
              <strong>
                Сугалааны No : {order.vatLottery}
                <br />
                Бүртгэх дүн : {order.grandTotal}
                <br />
              </strong>
            </div>
          )}
        </div>
      )}

      <div className={styles.centerFooter}>
        <strong>Та дахин ирж үйлчлүүлээрэй </strong>
        <h2>Баярлалаа</h2>
      </div>
      <br />
      <br />
    </div>
  );

  return (
    <div className={styles.orderHistoryDiv}>
      <Modal
        className={styles.styleModal}
        closeIcon={false}
        title={headerTitle}
        onCancel={onClose}
        visible={visible}
        bodyStyle={{ borderRadius: '20px', padding: '0px' }}
        style={{ borderRadius: '20px' }}
        closable={false}
        footer={null}
        width={1000}
      >
        <Row justify="center">{content}</Row>
      </Modal>
    </div>
  );
};

export default ReceiptModal;
