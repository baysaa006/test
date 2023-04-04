import { useLazyQuery, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SingleRestaurantDrawer from '../components/singleRestaurantDrawer/SingleRestaurantDrawer';
import FooterNavBar from '../components/singleRestaurantFilterContainer/FooterNavBar';
import { useStoreFoods } from '../contexts/food.store';
import { useActiveMenuStore } from '../contexts/activeMenuContext';
import { GET_BRANCH } from '../graphql/query/branch.qeury';
import KaraokeBanner from '../karaokeComponents/karaokeBanner/KaraokeBanner';
import HeaderKaraoke from '../karaokeComponents/layout/headerKaraoke/HeaderKaraoke';
import SearchContent from '../karaokeComponents/seachContent/seachContent';
import CurrentBranchType from '../types/participant';
import { Translator } from 'react-auto-translate';
import { cacheProvider } from '../contexts/translate.context';
import { GOOGLE_CLOUD_KEY } from '../constants/Api';
import { getPayload } from '../contexts/auth.context';
import { ME } from '../graphql/query/user.query';
export default function Karaoke() {
  const router = useRouter();

  const [stateOnfocus, setOnfocus] = useState(false);

  const { id } = router.query;
  const [stateCurrentBranchData, setCurrentBranchData] = useState<CurrentBranchType>();
  const { visibleShow, setVisibleShow } = useStoreFoods();
  const { setActiveMenu, setKaraokeActive } = useActiveMenuStore();
  const [currentLanguage, setCurrentLanguage] = useState(getPayload()?.languages?.filter((language) => language)[0]);
  // const {
  //   loading: loadingUser,
  //   error: errorUser,
  //   data: userData,
  // } = useQuery(ME, {
  //   onCompleted: (data) => {},
  // });

  const [getCurrentBranch, { loading, error }] = useLazyQuery(GET_BRANCH, {
    onCompleted: (data) => {
      setCurrentBranchData(data?.getParticipantBuyer);
    },
    onError(err) {
      router.push('/notfound');
    },
  });

  useEffect(() => {
    if (id) {
      getCurrentBranch({ variables: { id: id } });
      setActiveMenu(4);
      setKaraokeActive(true);
    }
  }, [id]);

  const onFocus = (e: any) => {
    setOnfocus(e.bubbles);
  };

  const onBlur = (e: any) => {
    setOnfocus(e.cancelable);
  };

  return (
    <>
      <Translator cacheProvider={cacheProvider} from="mn" to={currentLanguage} googleApiKey={GOOGLE_CLOUD_KEY}>
        <div
          style={
            id === '7d78f82b-e661-4636-b83d-d0d278256413' ? { fontFamily: 'italic, serif', fontStyle: 'italic' } : {}
          }
        >
          <HeaderKaraoke
            branchData={stateCurrentBranchData}
            setCurrentLanguage={setCurrentLanguage}
            currentLanguage={currentLanguage}
          />
          <KaraokeBanner stateOnfocus={stateOnfocus} branchData={stateCurrentBranchData} />
          <SearchContent onFocus={onFocus} onBlur={onBlur} stateOnfocus={stateOnfocus} />
          <FooterNavBar
            branchData={stateCurrentBranchData}
            loading={loading}
            setVisible={setVisibleShow}
            // loadingUser={loadingUser}
            // userData={userData}
          />
          <SingleRestaurantDrawer
            isIndex
            branchData={stateCurrentBranchData}
            visible={visibleShow}
            setVisible={setVisibleShow}
          />
        </div>
      </Translator>
    </>
  );
}
