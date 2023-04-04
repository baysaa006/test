import { useTranslation } from 'react-i18next';
import styles from '../style.module.scss';
import contact from '../../../assets/icons/AddressBook.svg';
import { isEmpty } from 'lodash';

export default function ContactRestaurant(props: any) {
  const { branchData, ...others } = props;
  const { t, i18n } = useTranslation('language');
  // Google map api key needed
  // const address = () => {
  //   let address = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_CLOUD_KEY}&q=Eiffel+Tower,Paris+France`;
  //   return address;
  // };
  return (
    <div className={styles.container}>
      <div className={styles.openHours}>
        <img src={contact} alt="" />
        <h5 className={styles.aboutRestaurant}>{t(`mainPage.ContactInformation`)}</h5>
      </div>
      <div style={{ paddingTop: '1rem', position: 'relative' }} id="map" className="map-sec-holder">
        <div className="cs-map-section">
          <div className="cs-map">
            <div className="cs-map-content">
              <div className="mapouter">
                <div className="gmap_canvas">
                  <iframe
                    width="100"
                    height="180"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=Seoul+Business+Center,+Ulaanbaatar,+Mongolia&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className={styles.timetableCon}>
        {isEmpty(branchData?.branch.address) ? (
          <></>
        ) : (
          <li className={styles.contactInfo}>
            <a className={styles.phone} href="#map">
              <h4 className={styles.contact} style={{ width: '85%' }}>
                {' '}
                {branchData?.branch.address}
              </h4>{' '}
              <div className={styles.iconContainer}>
                {' '}
                <i style={{ fontSize: '20px', color: '#fff' }} className="icon-location-pin"></i>
              </div>
            </a>
          </li>
        )}
        {isEmpty(branchData?.branch.email) ? (
          <></>
        ) : (
          <li className={styles.contactInfo}>
            <a className={styles.phone} href={`mailto:${branchData?.branch?.email}`}>
              <h4 className={styles.contact}> {branchData?.branch.email}</h4>
              <div className={styles.iconContainer}>
                <i style={{ fontSize: '20px', color: '#fff' }} className="icon-mail5"></i>
              </div>
            </a>
          </li>
        )}
        {isEmpty(branchData?.branch?.phone) ? (
          <></>
        ) : (
          <li className={styles.contactInfo}>
            <a className={styles.phone} href={`tel:+976${branchData?.branch?.phone}`}>
              <h4 className={styles.contact}> {branchData?.branch?.phone}</h4>
              <div className={styles.iconContainer}>
                <i style={{ fontSize: '20px', color: '#fff' }} className="icon-phone"></i>
              </div>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
