'use client';
import { useState, useRef } from 'react';
import styles from './Map.module.scss';
import 'pinch-zoom-element';

type Layer = 1 | 2 | 3 | 4 | 5;

// TODO: 最適化の余地あり
export default function Map() {
  const [nowLayer, setNowLayer] = useState<Layer>(1);
  const [detailInfo, setDetailInfo] = useState<string>(
    '地図中の文字をクリックするとここに詳細が表示されます。'
  );
  const [is_highschool, setIs_highSchool] = useState<boolean>(false);
  const pinchTargetRef = useRef<HTMLDivElement>(null);

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
      <div className={styles.map_container}>
        <div>
          <div className={styles.button_block}>{nowLayer}階</div>
          <button
            className={`${styles.upButton} ${styles.button_block}`}
            onClick={upButtonHandler}
            disabled={nowLayer === 5}
          >
            ↑
          </button>
          <button
            className={`${styles.downButton} ${styles.button_block}`}
            onClick={downButtonHandler}
            disabled={nowLayer === 1}
          >
            ↓
          </button>
          <div
            className={`${styles.button_block} ${is_highschool ? 'h' : 'm'}`}
          ></div>
        </div>
        <div className={styles.map}>
          <pinch-zoom ref={pinchTargetRef} className={styles.map_svg}>
            <img
              src={`/map/${is_highschool ? 'h' : 'm'}f${nowLayer}.jpeg`}
              width={700}
            />
          </pinch-zoom>
          <p className={styles.map_ui}>ピンチアウトで拡大縮小できます</p>
        </div>
        <div className={styles.detail_section}>{detailInfo}</div>
      </div>
    </>
  );
}
