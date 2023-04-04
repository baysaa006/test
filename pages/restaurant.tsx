/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SingleRestaurantBanner from '../components/singleRestaurantBanner/SingleRestaurantBanner';
import SingleRestaurantFilterContainer from '../components/singleRestaurantFilterContainer/SingleRestaurantFilterContainer';
import SingleRestaurantFooter from './layout/SingleRestaurantFooter';
import Headers from './layout/Header';
import { useLazyQuery, useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_BRANCH } from '../graphql/query/branch.qeury';
import { Row, Image, message, Typography } from 'antd';
import KaraokeAffix from '../components/karaokeAffix/KaraokeAffix';
import logoLoader from '../assets/loader/logoLoader.gif';
import styles from './layout/style.module.scss';
import { AuthContext, getAccessToken, getPayload, setAccessToken } from '../contexts/auth.context';
import { useStore, useStoreFoods } from '../contexts/food.store';
import { Layout } from 'antd';
import { ON_TRACK_ORDER } from '../graphql/subscription/onUpdatedOrder';
import IOrders from '../types/order';
import { isEmpty } from 'lodash';
import SelectedOrder from '../components/OrderHistory/SelectedOrder';
import useSound from 'use-sound';
import { useCartStore } from '../contexts/cart.store';
import { Translator } from 'react-auto-translate';
import { cacheProvider } from '../contexts/translate.context';
import { GOOGLE_CLOUD_KEY } from '../constants/Api';
import { CURRENT_TOKEN } from '../graphql/mutation/scan';
import { ME } from '../graphql/query/user.query';
import { GET_SALES } from '../graphql/query/sale.qeury';
import client from '../providers/client';

function restaurant() {
  const router = useRouter();
  const { id } = router.query;

  const { isAuthenticated, authenticate } = useContext(AuthContext);
  const [completeOrder, setCompleteOrder] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentLanguage, setCurrentLanguage] = useState(getPayload()?.languages?.filter((language) => language)[0]);
  // const {
  //   loading: loadingUser,
  //   error: errorUser,
  //   data: userData,
  // } = useQuery(ME, {
  //   onCompleted: (data) => {},
  // });

  const { setParticipant, participant } = useStoreFoods();
  const { completeOrderId, setCompleteOrderID } = useStore();
  const { historyId } = useCartStore();

  const [play] = useSound('https://qmenu-images.s3.ap-east-1.amazonaws.com/sound.mp3', {
    volume: 1,
  });

  const showOrder = (selectedItem: any) => {
    setCompleteOrder(selectedItem);
    setVisible(true);
  };

  const { data: saleData } = useQuery(GET_SALES, {
    skip: !completeOrderId,
    onCompleted: (data) => {
      if (participant?.channel === 'Q') {
        if (completeOrderId) {
          showOrder(data.getSales.find((item: any) => item.id === completeOrderId));
        }
      }
    },
  });

  const onCloseSelectedDrawer = () => {
    setCompleteOrderID('');
    setVisible(false);
  };
  useSubscription(ON_TRACK_ORDER, {
    variables: { buyer: getPayload()?.sub },
    skip: !getPayload()?.sub,
    onSubscriptionData({ client, subscriptionData: { data } }) {
      if (data) {
        const caches = client.readQuery<{ getSales: any[] }>({ query: GET_SALES });
        if (caches && caches.getSales) {
          switch (data.onTrackSale.event) {
            case 'CREATED':
            case 'UPDATED': {
              const exists = caches.getSales.find((sale) => data.onTrackSale.sale.id === sale.id);
              if (exists) {
                play();

                client.writeQuery({
                  query: GET_SALES,
                  data: {
                    getSales: caches.getSales.map((sale) => {
                      if (sale.id === data.onTrackSale.sale.id) return data.onTrackSale;
                      return sale;
                    }),
                  },
                });
              }
              break;
            }
            case 'DELETE': {
              client.writeQuery({
                query: GET_SALES,
                data: {
                  getSales: caches.getSales.map((sale) => {
                    if (sale.id === data.onTrackSale.sale.id) return data.onTrackSale;
                    return sale;
                  }),
                },
              });
              break;
            }

            default:
              break;
          }
        }
      }
    },
  });

  const [getParticipantBuyer, { data }] = useLazyQuery(GET_BRANCH, {
    onCompleted(data) {
      setParticipant(data?.getParticipantBuyer);
    },
    onError(err) {
      console.log(err);
      router.push('/notfound');
    },
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getParticipantBuyer();
    }
  }, []);
  const token = () => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
  };

  return (
    <div>
      <Layout>
        {isAuthenticated === true && (
          <>
            {!participant && <Typography>{token()}</Typography>}
            {/* {loading ? (
              <div className={styles.qmenuLoader}>
                <Row justify="center">
                  <Image src={logoLoader} alt="loader" height={50} width={50} preview={false} />
                </Row>
              </div>
            ) : ( */}
            {/* <>{(getAccessToken(), setAccessToken('oe6A8CGyhdPU3xS0AJRZlnUUapJAnRWKw4d4HcJGYkhpaWCm7v'))}</> */}
            {participant && (
              <Translator cacheProvider={cacheProvider} from="mn" to={currentLanguage} googleApiKey={GOOGLE_CLOUD_KEY}>
                <div
                  style={
                    participant && {
                      background: `url(${
                        participant && isEmpty(participant?.branch?.background) ? null : participant?.branch?.background
                      })`,
                      backgroundPosition: 'center',
                      height: '100%',
                      backgroundSize: '100% ',
                      backgroundRepeat: 'repeat',
                    }
                  }
                >
                  <Headers
                    // refetch={getParticipantBuyer}
                    branchData={participant}
                    setCurrentLanguage={setCurrentLanguage}
                    currentLanguage={currentLanguage}
                    loading={loading}
                  />
                  <SingleRestaurantBanner restaurantInfo={participant} loading={loading} />
                  <SingleRestaurantFilterContainer
                    branchData={participant}
                    loading={loading}
                    // loadingUser={loadingUser}
                    // userData={userData}
                  />
                  <SingleRestaurantFooter footerInfo={participant?.branch} />
                  {/* {data?.getParticipantBuyer.channel !== 'K' && <KaraokeAffix />} */}
                </div>
              </Translator>
            )}

            {/* )} */}
          </>
        )}
        {completeOrder && (
          <SelectedOrder
            selectedItems={completeOrder}
            visible={visible}
            onClose={onCloseSelectedDrawer}
            branchData={participant}
          />
        )}
      </Layout>
    </div>
  );
}

export default restaurant;
