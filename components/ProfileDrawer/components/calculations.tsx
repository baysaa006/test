import styles from '../style.module.scss';
import { ArrowLeftOutlined, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export const reviewPrecentage = (props: any) => {
  const { t, i18n } = useTranslation('language');

  if (props?.length == 0) return '';
  let count = props?.filter((x: any) => x.liked === 1).length;
  let percentage = Math.floor((count / props?.length) * 100);
  if (percentage === 0) return;
  return (
    <span className={styles.totalText}>
      <LikeOutlined style={{ fontSize: '20px' }} />
      <h4 className={styles.totalReview}>
        {' '}
        {percentage}% ({props.length})
      </h4>
    </span>
  );
};
export const timeAgo = (props: any) => {
  const { t, i18n } = useTranslation('language');
  const currentTime = new Date().getTime();
  const givenTime = new Date(props).getTime();
  const difference = currentTime - givenTime;
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days} ${t(`mainPage.Days`)}`;
  } else if (hours > 0) {
    return `${hours} ${t(`mainPage.Hours`)}`;
  } else if (minutes > 0) {
    return `${minutes} ${t(`mainPage.Minutes`)}`;
  } else {
    return `${seconds} ${t(`mainPage.Seconds`)}`;
  }
};

export const checkIfOpen = (props: any) => {
  const { t, i18n } = useTranslation('language');

  const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const result: any[] = [];
  let isOpen = false;
  const currentDay = new Date().getDay();
  for (const prop in props) {
    if (weekdays.includes(prop)) {
      const day = prop;
      const open = props[`${day}Open`];
      const close = props[`${day}Close`];
      result.push({ [`${day}Open`]: open, [`${day}Close`]: close });
    }
    result.sort((a, b) => {
      const dayA = Object.keys(a)[0].slice(0, 3);
      const dayB = Object.keys(b)[0].slice(0, 3);
      return weekdays.indexOf(dayA) - weekdays.indexOf(dayB);
    });
  }

  function checkIfOpen(open: any, close: any) {
    const currentTime = new Date();
    let formattedTime = currentTime.getHours().toString();
    if (formattedTime >= open.slice(0, 2) && formattedTime < close.slice(0, 2)) {
      return true;
    }
    return false;
  }
  switch (currentDay) {
    case 0: // Sunday
      if (result[6].sunOpen && result[6].sunClose) {
        isOpen = checkIfOpen(result[6].sunOpen, result[6].sunClose);
      }
      break;
    case 1: // Monday
      if (result[0].monOpen && result[0].monClose) {
        isOpen = checkIfOpen(result[0].monOpen, result[0].monClose);
      }
      break;
    case 2: // Tuesday
      if (result[1].tueOpen && result[1].tueClose) {
        isOpen = checkIfOpen(result[1].tueOpen, result[1].tueClose);
      }
      break;
    case 3: // Wednesday
      if (result[2].wedOpen && result[2].wedClose) {
        isOpen = checkIfOpen(result[2].wedOpen, result[2].wedClose);
      }
      break;
    case 4: // Thursday
      if (result[3].thuOpen && result[3].thuClose) {
        isOpen = checkIfOpen(result[3].thuOpen, result[3].thuClose);
      }
      break;
    case 5: // Friday
      if (result[4].friOpen && result[4].friClose) {
        isOpen = checkIfOpen(result[4].friOpen, result[4].friClose);
      }
      break;
    case 6: // Saturday
      if (result[5].satOpen && result[5].satClose) {
        isOpen = checkIfOpen(result[5].satOpen, result[5].satClose);
      }
      break;
    default:
      break;
  }
  if (isOpen) return <span style={{ color: '#007BFF' }}>Нээлттэй</span>;
  else return <span style={{ color: '#007BFF' }}>Нээлттэй</span>;
};
