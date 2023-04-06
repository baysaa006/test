import { Button, Modal, Row, Typography, Col, Radio, RadioChangeEvent, Slider } from 'antd';
import { divide, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import done from '../image/done.svg';
import Image from 'next/image';
import { useRef } from 'react';
import { useMutation } from '@apollo/client';

import {
  CheckCircleOutlined,
  CloseOutlined,
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons';
import { CREATE_ORDER } from '../../../graphql/mutation/createOrder';
import { CREATE_ORDER_REVIEW } from '../../../graphql/mutation/createReview';

type Props = {
  visible: boolean;
  order: any;
  reviewed: any;
  onClose: () => void;
  setReviewed: (props: any) => void;
};
type Review = {
  type: String;
  liked: number;
  additional: string;
  comment: string[];
};

const { Text } = Typography;
const ReviewModal = ({ visible, order, onClose, setReviewed, reviewed }: Props) => {
  const [active, setActive] = useState<Review>({ type: 'S', liked: 1, additional: '', comment: [] });
  const data = ['Амт', 'Савалгаа', 'Хоолны орц'];
  const [createReview, { loading }] = useMutation(CREATE_ORDER_REVIEW);
  const submit = () => {
    createReview({
      variables: {
        id: order.id,
        input: active,
      },
      onCompleted() {
        setReviewed(true);
      },
    });
  };
  const onChange = (item: any) => {
    if (active.comment.includes(item))
      setActive({
        ...active,
        comment: active.comment.filter((c) => c !== item),
      });
    else setActive({ ...active, comment: [...active.comment, item] });
  };
  const headerTitle = (
    <div>
      <Text style={{ fontSize: '20px' }} strong>
        Үнэлгээ өгөх
      </Text>
      <div className={styles.closeButton}>
        <CloseOutlined style={{ fontSize: '20px' }} onClick={onClose} />
      </div>
    </div>
  );

  const footer = (
    <Row justify="center">
      {reviewed ? (
        <Button onClick={onClose} className={styles.nextButton} size="middle">
          <Text style={{ color: '#fff' }} strong>
            {' '}
            Баярлалаа
          </Text>
        </Button>
      ) : (
        <Button onClick={submit} className={styles.nextButton} size="middle" loading={loading}>
          <Text style={{ color: '#fff' }} strong>
            {' '}
            Үнэлгээ өгөх
          </Text>
        </Button>
      )}
    </Row>
  );

  const content = (
    <form typeof="submit" onSubmit={submit}>
      <Col className={styles.container}>
        <Col className={styles.reviewCon}>
          <Text strong>Танд хоолны амт чанар таалагдсан уу?</Text>
          <div className={styles.likeCointainer}>
            {active.liked == 1 ? (
              <LikeFilled className={styles.icon} />
            ) : (
              <LikeOutlined className={styles.icon} onClick={() => setActive({ ...active, liked: 1 })} />
            )}
            {active.liked == 1 ? (
              <DislikeOutlined className={styles.icon} onClick={() => setActive({ ...active, liked: 0 })} />
            ) : (
              <DislikeFilled className={styles.icon} />
            )}
          </div>
        </Col>
        <Col className={styles.reviewCon}>
          {active.liked == 1 ? (
            <Text strong>Таньд юу таалагдсан бэ?</Text>
          ) : (
            <Text strong>Сайжруулах зүйл нь юу байсан вэ?</Text>
          )}
          <Radio.Group buttonStyle="solid" style={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
            {data.map((item, index) => (
              <Button
                type="default"
                onClick={() => onChange(item)}
                className={active.comment.includes(item) ? styles.selected : styles.select}
                value={item}
                key={index}
              >
                <Text style={active.comment.includes(item) ? { color: '#fff' } : { color: '#000' }}>{item}</Text>
              </Button>
            ))}
          </Radio.Group>
        </Col>
        <Col className={styles.reviewCon}>
          <Text strong>Нэмэлт санал гомдол?</Text>
          <textarea
            value={active.additional}
            id="message"
            name="message"
            onChange={(e) => setActive({ ...active, additional: e.target.value })}
            className={styles.comment}
          />
        </Col>
      </Col>
    </form>
  );

  return (
    <Modal
      centered
      className={styles.styleModal}
      closeIcon={false}
      title={headerTitle}
      onCancel={onClose}
      visible={visible}
      bodyStyle={{ borderRadius: '20px', paddingTop: '5px', paddingBottom: '0' }}
      style={{ borderRadius: '20px' }}
      closable={false}
      footer={footer}
    >
      <Row justify="center">
        {reviewed ? (
          <div className={styles.loadingContainer}>
            <CheckCircleOutlined style={{ color: 'green', fontSize: '100px' }} />{' '}
            <Text style={{ fontSize: '25px', textAlign: 'center' }} strong>
              Үнэлгээ өгсөнд баярлалаа
            </Text>
          </div>
        ) : (
          <div>{content}</div>
        )}
      </Row>
    </Modal>
  );
};

export default ReviewModal;
