import { Col, Row, Skeleton } from 'antd';
import React from 'react';

export default function CardSkelton() {
  return (
    <>
      <Row justify="center" gutter={[10, 10]}>
        <Col span={11}>
          <Skeleton.Button active size="default" shape="square" block={true} />
          <Skeleton.Button active size="default" shape="square" block={true} />
          <Skeleton.Button active size="default" shape="square" block={true} style={{ marginBottom: '10px' }} />

          <Skeleton.Button
            active
            size="default"
            shape="round"
            block={true}
            style={{ height: '20px', marginBottom: '5px' }}
          />
          <Skeleton.Button active size="default" shape="round" block={true} style={{ height: '20px' }} />
        </Col>
        <Col span={11}>
          <Skeleton.Button active size="default" shape="square" block={true} />
          <Skeleton.Button active size="default" shape="square" block={true} />
          <Skeleton.Button active size="default" shape="square" block={true} style={{ marginBottom: '10px' }} />

          <Skeleton.Button
            active
            size="default"
            shape="round"
            block={true}
            style={{ height: '20px', marginBottom: '5px' }}
          />
          <Skeleton.Button active size="default" shape="round" block={true} style={{ height: '20px' }} />
        </Col>

        <Col span={11}>
          <Skeleton.Button active size="default" shape="square" block={true} />
          <Skeleton.Button active size="default" shape="square" block={true} />
          <Skeleton.Button active size="default" shape="square" block={true} style={{ marginBottom: '10px' }} />

          <Skeleton.Button
            active
            size="default"
            shape="round"
            block={true}
            style={{ height: '20px', marginBottom: '5px' }}
          />
          <Skeleton.Button active size="default" shape="round" block={true} style={{ height: '20px' }} />
        </Col>

        <Col span={11}>
          <Skeleton.Button active size="default" shape="square" block={true} />
          <Skeleton.Button active size="default" shape="square" block={true} />
          <Skeleton.Button active size="default" shape="square" block={true} style={{ marginBottom: '10px' }} />

          <Skeleton.Button
            active
            size="default"
            shape="round"
            block={true}
            style={{ height: '20px', marginBottom: '5px' }}
          />
          <Skeleton.Button active size="default" shape="round" block={true} style={{ height: '20px' }} />
        </Col>
      </Row>
    </>
  );
}
