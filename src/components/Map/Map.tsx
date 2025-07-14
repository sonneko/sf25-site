'use client';
import { useState } from 'react';
import styles from './Map.module.scss';

type Layer = 1 | 2 | 3 | 4 | 5;

export default function Map() {
  const [nowLayer, setNowLayer] = useState<Layer>(1);
  const [isShowingDetail, setIsShowingDetail] = useState<boolean>(false);

  const upButtonHandler = () => {
    if (nowLayer === 5) {
      // disableに設定しているのでここでエラーは出ないはず
      throw new Error('already top layer!');
    }
    // 5の時はneverなので nowLayer + 1 は必ずLayerの範囲内
    setNowLayer((nowLayer + 1) as Layer);
  };

  const downButtonHandler = () => {
    if (nowLayer === 1) {
      throw new Error('already bottom layer!');
    }
    // 1の時はneverなので nowLayer - 1 は必ずLayerの範囲内
    setNowLayer((nowLayer - 1) as Layer);
  };
  return (
    <>
      <div className={styles.container}>
        <button
          className={styles.upButton}
          onClick={upButtonHandler}
          disabled={nowLayer === 5}
        >
          ↑
        </button>
        <button
          className={styles.downButton}
          onClick={downButtonHandler}
          disabled={nowLayer === 1}
        >
          ↓
        </button>
        <div className={styles.map}>
          {[1, 2, 3, 4, 5].map(i => (
            <></>
          ))}
        </div>
      </div>
    </>
  );
}
