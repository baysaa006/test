import { CloseOutlined, LoadingOutlined, ManOutlined, UserOutlined, WomanOutlined } from '@ant-design/icons';
import { Drawer, Row, Avatar, Typography, Spin, Form, Input, Col, Button, Radio, Space } from 'antd';
import React, { useState } from 'react';
import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { PATTERN_EMAIL, PATTERN_PHONE } from '../../../constants/Pattern';
import Confirmation from '../../userModal/components/Confirmation';
import { omit } from 'lodash';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from '../../../graphql/mutation/getSession';
import { ME } from '../../../graphql/query/user.query';
import IMe from '../../../types/me';
import SuccessModal from '../../userModal/components/components/SuccessModal';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#007BFF' }} spin />;
export default function UserInformation(props: any) {
  const { onClose, visible, userData, loadingUser, isWeb } = props;
  const { t, i18n } = useTranslation('language');
  const [isModalVisibleConfirmation, setIsModalVisibleConfirmation] = useState(false);
  const [changed, setChanged] = useState(false);
  const [form] = Form.useForm();
  const { Text } = Typography;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateSuccessTitle, setSuccessTitle] = useState('');

  // const [updateProfile, { loading: loadingProfile }] = useMutation(UPDATE_PROFILE, {
  //   update(cache, { data: { updateProfile } }) {
  //     const caches = cache.readQuery<{ me: IMe }>({ query: ME });
  //     if (caches && caches.me) {
  //       cache.writeQuery({
  //         query: ME,
  //         data: {
  //           me: caches.me.id === updateProfile.id ? updateProfile : caches.me,
  //         },
  //       });
  //     }
  //   },
  //   onCompleted: (data) => {
  //     setSuccessTitle('Мэдээлэл амжилттай бүртгэгдлээ.');
  //     setIsModalVisible(true);
  //     form.resetFields();
  //     setChanged(false);
  //   },
  //   onError(err) {},
  // });

  const ModalTitile = (
    <div className={styles.drawerHeader}>
      {userData && (
        <>
          <Row justify="center">
            <Text>Хэрэглэгчийн мэдээлэл</Text>
          </Row>
          <CloseOutlined style={{ fontSize: 20, position: 'absolute', right: '18px', top: '16px' }} onClick={onClose} />
          <br />

          <Row justify="center">
            <Avatar size={64} icon={<UserOutlined />} />
          </Row>
        </>
      )}
    </div>
  );

  const changePhoneNumberModal = () => {
    setIsModalVisibleConfirmation(true);
  };

  const closeConfirmationModal = () => {
    setIsModalVisibleConfirmation(false);
  };

  // const onFinish = (values: any) => {
  //   updateProfile({
  //     variables: {
  //       input: {
  //         ...values,
  //       },
  //     },
  //   });
  // };

  const confirmFooter = (
    <Row justify="center" className={!changed ? styles.disableButton : styles.confirmButton}>
      <Col span={24}>
        <Button onClick={() => form.submit()} disabled={!changed}>
          <Row justify="center">
            <Text className={styles.text} strong>
              {t('mainPage.save')}
            </Text>
          </Row>
        </Button>
      </Col>
    </Row>
  );

  return (
    <div className={styles.DrawerStyling}>
      {userData && (
        <Drawer
          footer={confirmFooter}
          width={isWeb ? '350px' : '100%'}
          zIndex={1}
          size="default"
          title={ModalTitile}
          visible={visible}
          closable={false}
        >
          <Spin indicator={antIcon}>
            <div style={{ flexDirection: 'column' }} className={styles.mobileDiv}>
              <div className={styles.customerInformation}>
                <Form
                  name="forms"
                  form={form}
                  layout="vertical"
                  size="large"
                  initialValues={userData}
                  onValuesChange={() => setChanged(true)}
                >
                  <div className={styles.placeholderText}>
                    <Form.Item
                      required
                      name="phone"
                      rules={[
                        {
                          pattern: PATTERN_PHONE,
                          required: true,
                          message: `${t('mainPage.PleaseEnterPhoneNumber')}`,
                        },
                      ]}
                    >
                      <Input readOnly onClick={changePhoneNumberModal} />
                    </Form.Item>
                    <Text>{t('mainPage.PhoneNumber')} </Text>
                  </div>
                  <div className={styles.placeholderText}>
                    <Form.Item
                      required
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: `${t('mainPage.PleaseEnterName')}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Text>Овог </Text>
                  </div>
                  <div className={styles.placeholderText}>
                    <Form.Item
                      required
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: `${t('mainPage.PleaseEnterName')}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Text>{t('mainPage.username')} </Text>
                  </div>

                  <div className={styles.placeholderText}>
                    <Form.Item
                      required
                      name="email"
                      rules={[
                        {
                          type: 'email',
                          required: true,
                          message: `${t('mainPage.PleaseEnterEmail')}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Text>{t('mainPage.EmailAddress')} </Text>
                  </div>

                  <Form.Item
                    name="gender"
                    initialValue={userData?.gender}
                    rules={[{ required: true, message: 'Хүйс оруулна уу.' }]}
                  >
                    <Row className={styles.genderRadioButton} justify="center">
                      <Radio.Group defaultValue={userData?.gender} buttonStyle="solid">
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
                </Form>
              </div>
            </div>
          </Spin>
        </Drawer>
      )}

      <Confirmation
        isModalVisibleConfirmation={isModalVisibleConfirmation}
        closeConfirmationModal={closeConfirmationModal}
        isSessionType={'C'}
      />

      <SuccessModal
        stayHere={true}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title={stateSuccessTitle}
      />
    </div>
  );
}
