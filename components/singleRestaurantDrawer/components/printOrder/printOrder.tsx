import { isEmpty } from 'lodash';
import React, { forwardRef } from 'react';
import { useStoreFoods } from '../../../../contexts/food.store';
import styles from './style.module.scss';
import { dateFormat, moneyFormat } from '../../../../helper/constant';

type OrderViewProps = {
  order: any;
  withVat: boolean;
  qrUrl?: string;
};

const PrintOrder = forwardRef<HTMLDivElement, OrderViewProps>((props, ref) => {
  const { participant } = useStoreFoods();
  const { order, qrUrl } = props;

  const withVat = order.vatState === 'G' && props.withVat;

  const orderTaxSum = order && Math.abs(order.taxAmount + order.vatAmount + order.cityTax).toFixed(2);

  return (
    <div ref={ref} className={styles.receiptOrder}>
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
        <div className={styles.center}>
          <h3>{participant.branch.name}</h3>
        </div>
      )}
      <table className={styles.line} width={'100%'}>
        <tr>
          <td width={'1%'} align="left">
            <div className={styles.numberLine}>Дугаар: </div>
          </td>
          <td width={'10%'} align="left">
            <div className={styles.numberLine}>{order.number.slice(8)} </div>
          </td>
        </tr>
        <tr>
          <td width={'1%'} align="left">
            <div className={styles.tableName}>Ширээ: </div>
          </td>
          <td width={'10%'} align="left">
            <div className={styles.tableName}>{order?.table?.name} </div>
          </td>
        </tr>
      </table>
      <div className={styles.boldLine}>Борлуулагч :</div>
      <div>
        <span className={styles.title}>Огноо : </span>
        <span>{dateFormat(order.createdAt, 'yyyy-MM-DD HH:mm')}</span>
      </div>
      <div>
        <span>Захиалгын дугаар : </span>
        <span>{order.number}</span>
      </div>
      {withVat && (
        <div>
          <span>ДДТД : </span>
          <span>{order.vatBillId}</span>
        </div>
      )}
      {withVat && order.vatType === 3 && (
        <>
          <div className={styles.bodLine}>Худалдан авагч :</div>
          <div>
            <span>ТТД : </span>
            <span>{order.register}</span>
          </div>
          <div>
            <span>Нэр : </span>
            <span>{order.buyer}</span>
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
          {order.items
            .filter((val: any) => val.state !== 'MOVED' && val.state !== 'RETURN')
            .map((item: any) => (
              <tr>
                <td width={'40%'}>{item.name}</td>
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
              {order.items
                .filter((val: any) => val.state !== 'MOVED' && val.state !== 'RETURN')
                .reduce((sum: any, a: any) => sum + a.quantity, 0)}
            </td>
            <td />

            <td className={styles.bold} align="right">
              {moneyFormat(
                order.items
                  .filter((val: any) => val.state !== 'MOVED' && val.state !== 'RETURN')
                  .reduce((sum: any, a: any) => sum + a.quantity * a.price, 0),
              )}
            </td>
          </tr>
        </tfoot>
      </table>

      <table className={styles.line} width={'100%'}>
        <tr>
          <td width={'100%'} align="left">
            <strong>Хөнгөлөлт </strong>
          </td>
          <td width={'100%'} />
          <td width={'100%'} align="right">
            <strong>
              {order.discountAmount !== 0 && '-'}
              {moneyFormat(order.discountAmount)}
            </strong>
          </td>
        </tr>

        {!isEmpty(order.discounts) && (
          <>
            {order.discounts.map((item: any) => (
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

        <tr>
          <td width={'100%'} align="left">
            <strong>Татвар,хураамж: </strong>
          </td>
          <td width={'100%'} />
          <td width={'100%'} align="right">
            <strong>{orderTaxSum}</strong>
          </td>
        </tr>

        {!isEmpty(order.charges) && (
          <>
            {order.charges.map((item: any) => (
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

        {withVat && (
          <tr>
            <td width={'100%'} align="left">
              <span style={{ marginLeft: '10px' }}>НӨАТ : </span>
            </td>
            <td width={'100%'} />

            <td width={'100%'} align="right">
              {moneyFormat(order.vatAmount)}
            </td>
          </tr>
        )}
        {withVat && order.cityTax !== 0 && (
          <tr>
            <td width={'100%'} align="left">
              <span style={{ marginLeft: '10px' }}>НХАТ : </span>
            </td>
            <td width={'100%'} />

            <td width={'100%'} align="right">
              {moneyFormat(order.cityTax)}
            </td>
          </tr>
        )}
        <tr>
          <td width={'100%'} align="left">
            <strong>Төлөх дүн : </strong>
          </td>
          <td width={'100%'} />

          <td width={'100%'} align="right">
            <strong>{moneyFormat(order.grandTotal)}</strong>
          </td>
        </tr>
      </table>

      <div className={styles.line} />
      {withVat && (
        <div className={styles.vat}>
          <div className={styles.qr}>{qrUrl && <img src={qrUrl} width={'100%'} />}</div>
          {order.vatType === 1 && (
            <div>
              <strong>
                Сугалааны No : {order.vatLottery}
                <br />
                Бүртгэх дүн : {order.grandTotal}
                <br />
              </strong>
            </div>
          )}
          <br />
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
});
export default PrintOrder;
