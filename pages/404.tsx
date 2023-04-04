import { Button, Image, Row, Typography, Col } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import errorImg from '../assets/notFound/Unhappy.png';

const { Text } = Typography;

export default function NotFound() {
  const router = useRouter();

  const clickHome = () => {
    router.push('/restaurant');
  };
  return (
    <>
      <div style={{ position: 'absolute', width: '100%', background: 'white', height: '100%', top: '0' }}>
        <div style={{ top: '25vh', position: 'absolute', width: '100%' }}>
          <Row justify="center">
            <Image src={errorImg} preview={false} />
          </Row>
          <Row justify="center" style={{ marginBottom: '10px' }}>
            <Text strong style={{ fontWeight: '700', fontSize: '20px' }}>
              Хуудас олдсонгүй
            </Text>
          </Row>
          <Row justify="center" style={{ marginBottom: '10px' }}>
            <Col span={20} style={{ textAlign: 'center' }}>
              <Text style={{ color: 'hsla(224, 9%, 40%, 1)', fontSize: '18px', textAlign: 'center' }}>
                Таны уншуулсан qr код буруу байна дахин шалгаад уншуулна уу.
              </Text>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={20} sm={15} md={10} lg={5} xl={4} xxl={4} style={{ textAlign: 'center' }}>
              <Button
                onClick={clickHome}
                style={{ width: '100%', height: ' 40px', borderRadius: '10px', color: 'white', background: '#007BFF' }}
              >
                Үндсэн Хуудас
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
