import styles from './style.module.scss';

interface Props {
  width?: number;
}
const LoaderSpin = ({ width }: Props) => {
  return (
    <>
      <svg className={styles.wrapper} style={{ width: `${width}px` }} viewBox="0 0 20 20">
        <rect
          className={styles.item}
          width={18}
          height={18}
          fill-rule="evenodd"
          stroke-linecap="round"
          stroke-linejoin="round"
          radius="200"
          rx="4"
          transform="translate(1 1)"
        />
        <rect
          width={2}
          height={2}
          className={styles.item2}
          fill-rule="evenodd"
          stroke-linecap="round"
          stroke-linejoin="round"
          transform="translate(9 9)"
        />
      </svg>
    </>
  );
};

export default LoaderSpin;
