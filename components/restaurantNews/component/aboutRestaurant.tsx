import { useTranslation } from 'react-i18next';
import styles from '../style.module.scss';

export default function AboutRestaurant(props: any) {
  const { branchData, ...others } = props;
  const { t, i18n } = useTranslation('language');

  return (
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <h5 className={styles.aboutRestaurant}>{t('mainPage.aboutRestaurant')}</h5>
      <div className={styles.imageContainer}>
        <p className={styles.description}>{branchData?.branch?.description}</p>
        {branchData.branch.images.length > 0 && (
          <div className={styles.scrollImages}>
            {branchData.branch.images.map((image: any, index: any) => (
              <img className={styles.image} src={image} width={250} key={index} alt="" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
