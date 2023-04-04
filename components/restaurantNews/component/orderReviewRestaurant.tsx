import { timeAgo } from './calculations';
import styles from '../style.module.scss';
import { useTranslation } from 'react-i18next';
import like from '../../../assets/icons/Like.svg';
import { ArrowLeftOutlined, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
export default function OrderReview(props: any) {
  const { orderReviews, ...other } = props;
  const { t, i18n } = useTranslation('language');
  return (
    <div className={styles.review}>
      <div style={{ display: 'flex', gap: '10px', paddingBottom: '0.5rem', alignItems: 'center' }}>
        <img src={like} />
        <h5 className={styles.aboutRestaurant}>{t(`mainPage.Review`)}</h5>
      </div>
      <div className={styles.reviewContainer}>
        {orderReviews?.map((review: any, index: any) => (
          <div key={index} className={review.additional === '' ? '' : styles.reviewCon}>
            {review.additional === '' ? (
              ''
            ) : (
              <div style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '1.5rem' }}>
                <Avatar size="default" className={styles.avatar}>
                  <h4 style={{ margin: '0' }}> {review.customer.firstName.slice(0, 1)}</h4>
                </Avatar>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    gap: '1rem',
                    flexDirection: 'column',
                  }}
                >
                  <div className={styles.reviewAdditional1}>
                    <h4 className={styles.reviewFirstname}>{review.customer.firstName}</h4>
                    <div className={styles.liked}>
                      <p style={{ margin: '0' }}>{review.comment.replace(/\[|\]/g, '')}</p>
                      {review.liked === 1 ? (
                        <LikeOutlined style={{ fontSize: '18px' }} />
                      ) : (
                        <DislikeOutlined style={{ fontSize: '18px' }} />
                      )}
                    </div>
                  </div>

                  <div className={styles.reviewAdditional}>
                    <h4 className={styles.comment}>{review.additional}</h4>
                    <p style={{ margin: '0' }}>{timeAgo(review.createdAt)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
