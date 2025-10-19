'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import styles from './Map.module.scss';
import 'pinch-zoom-element';

type Layer = 1 | 2 | 3 | 4 | 5;

// TODO: 最適化の余地あり
export default function Map() {
  const [nowLayer, setNowLayer] = useState<Layer>(1);
  const [detailInfo, setDetailInfo] = useState<string>(
    '地図中の文字をクリックするとここに詳細が表示されます。'
  );
  const [svgData, setSvgData] = useState<
    [string, string, string, string, string]
  >(['...', '...', '...', '...', '...']);
  const focuedSvgEle = useRef<SVGElement>(null);
  const pinchTargetRef = useRef<HTMLDivElement>(null);

  // SVGのfetch
  useEffect(() => {
    Promise.all([
      ...([1, 2, 3, 4, 5] as const).map((i: Layer) =>
        fetch(`map/f${i}.svg`).then(res => res.text())
      ),
    ]).then(svgs =>
      setSvgData(svgs as [string, string, string, string, string])
    );
  }, []);

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

  const displayDetail = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const targetElement = event.target as SVGElement; // クリックされたSVG要素
      const originalId = targetElement.id; // クリックされた要素のID

      const placeId: string | undefined = (() => {
        // SVG要素のIDは `maps_ID` 形式なので、`maps_` プレフィックスを削除して `notedata` のキーと比較
        if (originalId.startsWith('maps_')) {
          return originalId.substring(5);
        } else if (
          targetElement.tagName === 'tspan' &&
          targetElement.parentElement?.id.startsWith('maps_')
        ) {
          // tspanがクリックされた場合、その親要素のIDをチェック
          return targetElement.parentElement.id.substring(5);
        }
      })();
      if (placeId !== undefined) {
        const ele = document.getElementById(
          `maps_${placeId}`
        ) as SVGElement | null;
        if (ele) {
          if (focuedSvgEle.current) {
            const DEFAULT_MAP_FILL_COLOR = '#d5d5d5';
            focuedSvgEle.current.style.fill = DEFAULT_MAP_FILL_COLOR;
          }
          const FOCUSED_MAP_FILL_COLOR = '#fffc4aff';
          ele.style.fill = FOCUSED_MAP_FILL_COLOR;
          focuedSvgEle.current = ele;
        }
        setDetailInfo(placeId); // TODO: placeIdから企画情報を取得するコード
      }
    },
    [setDetailInfo]
  );

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
        </div>
        <div className={styles.map}>
          <pinch-zoom
            ref={pinchTargetRef}
            dangerouslySetInnerHTML={{
              __html: svgData[nowLayer - 1] as string, // WARNING: XSS注意
            }}
            onClick={displayDetail}
            className={styles.map_svg}
          />
          <p className={styles.map_ui}>ピンチアウトで拡大縮小できます</p>
        </div>
        <div className={styles.detail_section}>{detailInfo}</div>
      </div>
    </>
  );
}
