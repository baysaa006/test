import { isEmpty } from 'lodash';
import singleRestBanner from '../../assets/extra-images/cover-photo01.jpg';
import styles from '../style.module.scss';
import restaurant from '../../../assets/icons/Restaurant.svg';
import delivery from '../../../assets/icons/Delivery.svg';
import pickup from '../../../assets/icons/Pickup.svg';
import preorder from '../../../assets/icons/Pre-order.svg';
import arrowLeft from '../../../assets/icons/ArrowLeft.svg';
import { reviewPrecentage } from './calculations';
export default function HeaderRestaurant(props: any) {
  const { branchData, onClose, orderReviews, ...others } = props;
  return (
    <div
      style={
        branchData
          ? {
              background: `url(${
                isEmpty(branchData?.branch?.banner) ? singleRestBanner : branchData?.branch?.banner
              }) no-repeat scroll 0 0 / cover`,
              height: 215,
              right: 0,
              left: 0,
              top: 0,
              zIndex: 50,
              position: 'absolute',
              backgroundPosition: 'top',
              scrollBehavior: 'smooth',
              overscrollBehaviorBlock: 'inherit',
            }
          : {
              background: `url(${
                isEmpty(branchData?.branch?.banner) ? singleRestBanner : branchData?.branch?.banner
              }) no-repeat scroll 0 0 / cover`,
              height: 215,
              right: 0,
              top: 0,
              zIndex: 50,
              position: 'sticky',
              backgroundPosition: 'top',
              scrollBehavior: 'smooth',
              overscrollBehaviorBlock: 'inherit',
            }
      }
    >
      <div className={styles.branchInfo}>
        <div className={styles.branchInfoHead}>
          {' '}
          <img
            src={arrowLeft}
            style={{ color: '#fff', zIndex: '50', fontStyle: 'bold', width: '24px', height: '24px' }}
            onClick={onClose}
          />
        </div>
        <div className={styles.branchText}>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <h5 className={styles.totalText}>{branchData.branch.type}</h5>
            <span style={{ display: 'flex', gap: '5px' }}>
              <h1 className={styles.branchName}>{branchData.branch.name}</h1>
            </span>
          </span>
          <span className={styles.branchFooter}>
            {/* <div className={styles.branchIcons}></div> */}
            <div className={styles.branchLike}>
              {/* {orderReviews?.length > 0 ? reviewPrecentage(orderReviews) : <span></span>} */}
            </div>
          </span>
        </div>
        <div className={styles.branchTextblur}></div>
      </div>
    </div>
  );
}
