import styles from './CountDown.module.scss';

const SF_HELD_DATE = new Date('2025/11/03');

export default function CountDown() {
  const today = new Date();
  const diff = SF_HELD_DATE.getTime() - today.getTime();
  const leftDate = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (leftDate > 0) {
    const leftDateStr = leftDate.toLocaleString();
    return (
      <div className={styles.container}>
        <div className={styles.timer}>
          <span className={`${styles.first} ${styles.span}`}>
            <span className={styles.phoneHide}>開催まで</span>あと
          </span>
          <span className={`${styles.second} ${styles.span}`}>
            {Array.from(leftDateStr).map((digit, index) => {
              return (
                <span key={index} className={styles.spanDigit}>
                  {digit}
                </span>
              );
            })}
          </span>
          <span className={`${styles.third} ${styles.span}`}>日</span>
        </div>
      </div>
    );
  } else if (leftDate === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.timer}>
          <span className={`${styles.first} ${styles.span}`}>
            <span className={styles.phoneHide}>今日が開催日です！</span>
          </span>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.timer}>
          <span className={`${styles.first} ${styles.span}`}>
            <span className={styles.phoneHide}>SF2025は終了しました。</span>
          </span>
        </div>
      </div>
    )
  }
}
