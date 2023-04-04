import { useLazyQuery } from '@apollo/client';
import { Card, Form, Input, message, Radio, Row, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PATTERN_COMPANY_REGISTER } from '../../../../../constants/Pattern';
import { GET_VAT_PAYER } from '../../../../../graphql/query/vat';
import styles from './style.module.scss';

const { Text } = Typography;

export default function VATReceipt(props: any) {
  const { t, i18n } = useTranslation('language');
  const { form, onFinish, onChangeVat, stateValueVat, setCompanyName, companyName, stateCreateOrderData } = props;

  const [getVatPayer, { loading: loadingVatPayer, error, data: companyData }] = useLazyQuery(GET_VAT_PAYER, {
    onCompleted(data) {
      setCompanyName(data.getVatPayer.name);
    },
    onError(err) {
      message.warning(err.message);
    },
  });

  const onValuesChange = (c: any) => {
    if (c.register?.length === 7) {
      getVatPayer({ variables: { register: c.register } });
    }
  };

  return (
    <>
      {stateCreateOrderData?.vatState === 'A' ? (
        <>
          <Card style={{ borderRadius: '10px' }}>
            <Row className={styles.orderType}>
              <Text strong>{t('mainPage.VATreceipt')}</Text>
            </Row>
            <Row justify="center" style={{ marginTop: '10px', marginBottom: '10px' }} className={styles.vatRadioButton}>
              <Radio.Group
                defaultValue={stateCreateOrderData?.vatType}
                buttonStyle="solid"
                value={stateValueVat}
                onChange={onChangeVat}
              >
                <Radio.Button style={{ marginRight: '2px' }} value={1}>
                  {t('mainPage.Individual')}
                </Radio.Button>
                <Radio.Button style={{ marginLeft: '3px' }} value={3}>
                  {t('mainPage.Institution')}
                </Radio.Button>
              </Radio.Group>
            </Row>
            {stateValueVat === 3 && (
              <>
                <div className={styles.VATForm}>
                  <Form form={form} onValuesChange={onValuesChange} name="forms" layout="vertical" onFinish={onFinish}>
                    <div className={styles.placeholderText}>
                      <Form.Item
                        rules={[
                          { required: true, message: `${t('mainPage.OrganizationalRegisters')}` },
                          {
                            min: 2,
                            pattern: PATTERN_COMPANY_REGISTER,
                            message: ' Регистерийн дугаар буруу байна!',
                            warningOnly: true,
                          },
                        ]}
                        required
                        name="register"
                        className={styles.placeholderText}
                      >
                        <Input inputMode="numeric" autoFocus />
                      </Form.Item>
                      <Text>{t('mainPage.OrganizationalRegisters')} </Text>
                    </div>
                    <div className={styles.placeholderText}>
                      <Form.Item className={styles.placeholderText}>
                        <Input readOnly disabled value={companyName} />
                      </Form.Item>
                      <Text>{t('mainPage.CompanyName')} </Text>
                    </div>
                  </Form>
                </div>
              </>
            )}
          </Card>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
