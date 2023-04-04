import { DatePicker, Dropdown, Form, Input, Menu, Radio, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from '../style.module.scss';
import { YEAR_FORMAT } from '../../../../constants/Constant';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { PATTERN_PASSWORD } from '../../../../constants/Pattern';

interface KeyValuePair {
  key: any;
  label: any;
}

const { Text } = Typography;
export default function Information(props: any) {
  const { form, onFinish, isSessionType } = props;
  const { t, i18n } = useTranslation('language');
  const [stateGender, setGender] = useState('Female');

  const [value, setValue] = useState('');

  const onChange = (e: any) => {
    setGender(e.target.value);
  };

  const getYears = () => {
    var d = new Date();
    var y = d.getFullYear();

    const times: KeyValuePair[] = [];
    var y = d.getFullYear();
    for (let i = 0; i < 60; i++) {
      times.push({ key: i, label: y-- });
    }
    return times;
  };

  const Years = getYears();

  const onClickMenu = (e: any) => {
    setValue(e.domEvent.currentTarget.innerText);
    form.setFieldsValue({
      dateYear: e.domEvent.currentTarget.innerText,
    });
  };

  const menu = <Menu onClick={onClickMenu} items={Years} />;

  return (
    <>
      <div className={styles.phoneNumberContainer}>
        <Row>
          <Text strong className={styles.header}>
            {t('mainPage.UserRegistration')}
          </Text>
        </Row>
        <br />
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {isSessionType === 'P' ? (
            <></>
          ) : (
            <>
              <Form.Item name="username" rules={[{ required: true, message: t('mainPage.EnterUserName') }]}>
                <Row className={styles.confirmationInputs}>
                  <Input placeholder={t('mainPage.username')} />
                </Row>
              </Form.Item>
              <Row className={styles.confirmationInputs}>
                <Dropdown
                  overlayStyle={{
                    height: '20vh',
                    overflowY: 'scroll',
                    borderRadius: '10px',
                    textAlignLast: 'center',
                  }}
                  overlay={menu}
                  trigger={['click']}
                >
                  <Form.Item
                    name="dateYear"
                    rules={[{ required: true, message: t('mainPage.EnterTheYearOfBirth') }]}
                    style={{ width: '100%' }}
                    className={styles.dropDownMenu}
                  >
                    {/* <DatePicker placeholder="Төрсөн он" disabled picker="year" allowClear format={YEAR_FORMAT} /> */}
                    <Input value={value} readOnly placeholder={t('mainPage.BirthYear')} />
                  </Form.Item>
                </Dropdown>
              </Row>
              <Form.Item
                name="gender"
                rules={[{ required: true, message: t('mainPage.EnterYourGender') }]}
                initialValue={stateGender}
              >
                <Row className={styles.genderRadioButton} justify="center">
                  <Radio.Group defaultValue="Female" buttonStyle="solid" value={stateGender} onChange={onChange}>
                    <Radio.Button style={{ marginRight: '5px' }} value="Female">
                      <Space>
                        {t('mainPage.Woman')}
                        <WomanOutlined style={{ fontSize: '15px' }} />
                      </Space>
                    </Radio.Button>
                    <Radio.Button style={{ marginLeft: '5px' }} value="Male">
                      <Space>
                        {t('mainPage.Male')}
                        <ManOutlined style={{ fontSize: '15px' }} />
                      </Space>
                    </Radio.Button>
                    <Radio.Button style={{ marginLeft: '5px' }} value="Custom">
                      {t('mainPage.Others')}
                    </Radio.Button>
                  </Radio.Group>
                </Row>
              </Form.Item>
            </>
          )}

          <Form.Item
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: t('mainPage.EnterPassword'),
              },
              {
                min: 2,
                pattern: PATTERN_PASSWORD,
                message: t('mainPage.Least6char'),
              },
              {
                max: 16,
                message: t('mainPage.16charOrLess'),
              },
            ]}
          >
            <Row className={styles.confirmationInputs}>
              <Input.Password placeholder={t('mainPage.UserPassword')} />
            </Row>
          </Form.Item>
          <Form.Item
            name="tryPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: t('mainPage.RepeatPassword') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('mainPage.PasswordDoesNotMatch')));
                },
              }),
            ]}
          >
            <Row className={styles.confirmationInputs}>
              <Input.Password placeholder={t('mainPage.RepeatUserPassword')} />
            </Row>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
