import { useMutation } from '@apollo/client';
import { Image, message, Row } from 'antd';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { useStore, useStoreFoods } from '../../contexts/food.store';
import { CURRENT_TOKEN } from '../../graphql/mutation/scan';
import styles from '../layout/style.module.scss';
import logoLoader from '../../assets/loader/logoLoader.gif';
const Kiosk = () => {
  const router = useRouter();
  const { id } = router.query;
  const { editFoods, setCreateOrderID } = useStoreFoods();
  const { addAFish } = useStore();

  const { authenticate } = useContext(AuthContext);

  const [getCurrentToken, { loading }] = useMutation(CURRENT_TOKEN, {
    onCompleted: (data) => {
      editFoods([]);
      addAFish(0);
      setCreateOrderID('');
      authenticate(data.getToken.token, () => router.push(`/restaurant?id=${data.getToken.id}`));
    },
    onError(err) {
      message.warning(err.message);
      router.push('/notfound');
    },
  });

  React.useEffect(() => {
    if (id) {
      getCurrentToken({ variables: { code: id, type: 'K' } });
    }
  }, [id]);

  return (
    <div className={styles.qmenuLoader}>
      <Row justify="center">
        <Image src={logoLoader} alt="loader" height={50} width={50} preview={false} />
      </Row>
    </div>
  );
};

export default Kiosk;
