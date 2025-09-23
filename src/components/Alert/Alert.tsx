"use client";
import styles from './Alert.module.scss';
import useAlert from '../../store/useAlert';

export function Alert() {
  const { now } = useAlert();
  if (now !== null) {
    const { message, status } = now;
    const className = styles[status] + ' ' + styles.container + ' ';
    return (
      <>
        <div className={className}>
          <img src={`icon/${status}.svg`} alt='icon' width={30} height={30} />
          <span>{message}</span>
        </div>
      </>
    );
  } else {
    return <></>
  }
}
