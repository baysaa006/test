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
import logoLoader from '../assets/loader/logoLoader.gif';
import styles from './layout/style.module.scss';
import { AuthContext, getAccessToken, getPayload, setAccessToken } from '../contexts/auth.context';
import { useStore, useStoreFoods } from '../contexts/food.store';
import { Layout } from 'antd';
import { ON_TRACK_ORDER } from '../graphql/subscription/onUpdatedOrder';
import { isEmpty } from 'lodash';
import SelectedOrder from '../components/OrderHistory/SelectedOrder';
import useSound from 'use-sound';
import { useCartStore } from '../contexts/cart.store';
import { Translator } from 'react-auto-translate';
import { cacheProvider } from '../contexts/translate.context';
import { GOOGLE_CLOUD_KEY } from '../constants/Api';
import { GET_SALES } from '../graphql/query/sale.qeury';

function restaurant() {
  const router = useRouter();
  const { id } = router.query;

  const { isAuthenticated, authenticate } = useContext(AuthContext);
  const [completeOrder, setCompleteOrder] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<any>('');

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
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'network-only',
    onCompleted(data) {
      setParticipant(data?.getParticipantBuyer);
    },
    onError(err) {
      console.log(err);
      router.push('/notfound');
    },
  });

  useEffect(() => {
    getParticipantBuyer();
  }, [token]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!participant) {
  //       if (navigator.userAgent.indexOf('SamsungBrowser') > -1) {
  //         // If the current browser is Samsung Internet, redirect to Google Chrome
  //         window.location.href = 'googlechrome://navigate?url=' + encodeURIComponent(window.location.href);
  //       } else if (navigator.userAgent.indexOf('Firefox') > -1) {
  //         // If the current browser is Firefox, redirect to Microsoft Edge
  //         window.location.href = 'microsoft-edge-https:' + encodeURIComponent(window.location.href);
  //       } else {
  //         // If the current browser is not supported, show an error message
  //         message.warning('Sorry, your browser is not supported. Please use Google Chrome or Microsoft Edge.');
  //       }
  //     }
  //   }, 4000);
  // }, [token]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);
  console.log(data?.getParticipantBuyer.id);

  return (
    <div>
      <Layout>
        {isAuthenticated === true && <>{data?.getParticipantBuyer.id}</>}
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
