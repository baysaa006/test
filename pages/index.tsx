import { useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';
import i18next from 'i18next';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import BigCarousel from '../components/bigCarousel/BigCarousel';
import ContentCarousel from '../components/contentCarousel/ContentCarousel';
import RestaurantList from '../components/restaurantList/RestaurantList';
import SingleRestaurantDrawer from '../components/singleRestaurantDrawer/SingleRestaurantDrawer';
import FooterNavBar from '../components/singleRestaurantFilterContainer/FooterNavBar';
import { getAccessToken, setAccessToken } from '../contexts/auth.context';
import { useStoreFoods } from '../contexts/food.store';
import { CURRENT_TOKEN } from '../graphql/mutation/scan';
import { ME } from '../graphql/query/user.query';
import Footer from './layout/Footer';
import IndexHeader from './layout/IndexHeader';

const Home: NextPage = () => {
  const router = useRouter();
  const [stateLoadingToken, setLoadingToken] = useState(false);
  const { visibleShow, setVisibleShow } = useStoreFoods();

  // const {
  //   loading: loadingUser,
  //   error,
  //   data: userData,
  // } = useQuery(ME, {
  //   onCompleted: (data) => {},
  // });

  const [getToken, { loading }] = useMutation(CURRENT_TOKEN, {
    onCompleted: (data) => {
      setAccessToken(data.getToken.token);
    },
    onError(err) {
      message.warning(err.message);
      // router.push('/notfound');
    },
  });

  const fetchToken = useCallback(async () => {
    await getToken({ variables: { code: '', type: 'W' } });
    await getAccessToken();
    setLoadingToken(true);
  }, []);

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <>
      {stateLoadingToken ? (
        <>
          {/* <IndexHeader userData={userData} loadingUser={loadingUser} /> */}
          <BigCarousel />
          <RestaurantList />
          <ContentCarousel />
          <Footer />
          <FooterNavBar isMain setVisible={setVisibleShow} />
          <SingleRestaurantDrawer isIndex visible={visibleShow} setVisible={setVisibleShow} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
