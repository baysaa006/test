import { useLazyQuery, useQuery } from '@apollo/client';
import { Drawer } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GET_BRANCH } from '../../graphql/query/branch.qeury';
import CurrentBranchType from '../../types/participant';
import Feedback from './component/Feedback';
import OrderHistory from './component/OrderHistory';
// import OrderHistory from '../OrderHistory/OrderHistory';
import QmenuRelated from './component/QmenuRelated';
import RestarantInfo from './component/RestarantInfo';

export default function AboutRestaurantModal(props: any) {
  const { visible, setIsModalVisible, onCloser, isClassComponent, isKey, setModalConfirm, modalConfirm, orderReviews } =
    props;
  const router = useRouter();
  const { id } = router.query;
  const onClose = () => {
    if (isClassComponent === true) {
      setIsModalVisible({ showInfo: false });
    }
    setIsModalVisible(false);
  };

  const fullwidth = global.window?.innerWidth;

  const [stateCurrentBranchData, setCurrentBranchData] = useState<CurrentBranchType>();

  const [getCurrentBranch, { loading, error }] = useLazyQuery(GET_BRANCH, {
    onCompleted: (data) => {
      setCurrentBranchData(data.getParticipantBuyer);
    },
    onError(err) {
      router.push('/notfound');
    },
  });

  useEffect(() => {
    getCurrentBranch();
  }, []);
  return (
    <>
      <Drawer
        bodyStyle={isKey === 2 ? { padding: 0 } : { padding: '20px', background: '#F6F7F8' }}
        height={'100%'}
        size="large"
        placement={fullwidth > 742 ? 'right' : 'bottom'}
        visible={visible}
        closeIcon={false}
        closable={false}
        onClose={isClassComponent ? onCloser : onClose}
      >
        {isKey === 1 && (
          <OrderHistory branchData={stateCurrentBranchData} onClose={isClassComponent ? onCloser : onClose} />
        )}
        {isKey === 2 && (
          <RestarantInfo
            closable={false}
            restarantInfoData={stateCurrentBranchData}
            orderReviews={orderReviews}
            onClose={isClassComponent ? onCloser : onClose}
          />
        )}
        {isKey === 4 && (
          <Feedback setModalConfirm={setModalConfirm} onClose={onClose} feedBackData={stateCurrentBranchData?.branch} />
        )}
        {isKey === 5 && <QmenuRelated onClose={onClose} />}
      </Drawer>
    </>
  );
}
