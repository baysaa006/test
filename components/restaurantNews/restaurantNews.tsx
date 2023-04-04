import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import HeaderRestaurant from './component/headerRestaurant';
import AboutRestaurant from './component/aboutRestaurant';
import TimeTableRestaurant from './component/timeTableRestaurant';
import ContactRestaurant from './component/contactRestaurant';
import OrderReviewRestaurant from './component/orderReviewRestaurant';

export default function RestaurantNews(props: any) {
  const { branchData, orderReviews, onClose } = props;

  return (
    <>
      {branchData && (
        <div className={styles.branchDataContainer}>
          <HeaderRestaurant onClose={onClose} branchData={branchData} orderReviews={orderReviews} />
          <div
            style={{ paddingTop: '22.5rem', paddingLeft: '2rem', paddingRight: '2rem' }}
            className="contact-info-detail"
          >
            <div className="row">
              <AboutRestaurant branchData={branchData} />
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <TimeTableRestaurant branchData={branchData} />
              </div>
            </div>
            <ContactRestaurant branchData={branchData} />
          </div>
        </div>
      )}
    </>
  );
}
