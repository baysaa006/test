import { useTranslation } from 'react-i18next';
import styles from '../style.module.scss';
import { checkIfOpen } from './calculations';
import clock from '../../../assets/icons/Clock.svg';

export default function TimeTableRestaurant(props: any) {
  const { branchData, ...others } = props;
  const { t, i18n } = useTranslation('language');

  return (
    <div className={styles.container}>
      <div className={styles.openHours}>
        <img src={clock} alt="" />
        <h5 className={styles.aboutRestaurant}>{t('mainPage.OpeningHours')}</h5>
      </div>
      <div style={{ paddingLeft: '3.5rem' }}> {checkIfOpen(branchData.branch.timetable)}</div>
      <div className="widget widget-timing">
        <ul className={styles.timetableCon}>
          <li className={styles.time}>
            <p className={styles.timetableDays}>Даваа</p>
            {branchData.branch.timetable.mon ? (
              <p className={styles.timetable}>
                {branchData.branch.timetable.monOpen} - {branchData.branch.timetable.monClose}
              </p>
            ) : (
              <p className={styles.timetable}>Closed</p>
            )}
          </li>
          <li className={styles.time}>
            <h4 className={styles.timetableDays}>Мягмар</h4>
            {branchData.branch.timetable.tue ? (
              <p className={styles.timetable}>
                {branchData.branch.timetable.tueOpen} - {branchData.branch.timetable.tueClose}
              </p>
            ) : (
              <p className={styles.timetable}>Closed</p>
            )}
          </li>
          <li className={styles.time}>
            <h4 className={styles.timetableDays}>Лхагва</h4>
            {branchData.branch.timetable.wed ? (
              <p className={styles.timetable}>
                {branchData.branch.timetable.wedOpen} - {branchData.branch.timetable.wedClose}
              </p>
            ) : (
              <p className={styles.timetable}>Closed</p>
            )}
          </li>
          <li className={styles.time}>
            <h4 className={styles.timetableDays}>Пүрэв</h4>
            {branchData.branch.timetable.thu ? (
              <p className={styles.timetable}>
                {branchData.branch.timetable.thuOpen} - {branchData.branch.timetable.thuClose}
              </p>
            ) : (
              <p className={styles.timetable}>Closed</p>
            )}
          </li>
          <li className={styles.time}>
            <h4 className={styles.timetableDays}>Баасан</h4>
            {branchData.branch.timetable.fri ? (
              <p className={styles.timetable}>
                {branchData.branch.timetable.friOpen} - {branchData.branch.timetable.friClose}
              </p>
            ) : (
              <p className={styles.timetable}>Closed</p>
            )}
          </li>
          <li className={styles.time}>
            <h4 className={styles.timetableDays}>Бямба</h4>
            {branchData.branch.timetable.sat ? (
              <p className={styles.timetable}>
                {branchData.branch.timetable.satOpen} - {branchData.branch.timetable.satClose}
              </p>
            ) : (
              <p className={styles.timetable}>Closed</p>
            )}
          </li>
          <li className={styles.time}>
            <h4 className={styles.timetableDays}>Ням</h4>
            {branchData.branch.timetable.sun ? (
              <p className={styles.timetable}>
                {branchData.branch.timetable.sunOpen} - {branchData.branch.timetable.sunClose}
              </p>
            ) : (
              <p className={styles.timetable}>Closed</p>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
