'use client';

import styles from './PannhirettoDownloadButton.module.scss';

import Link from 'next/link';
import { useState } from 'react';

export default function PannhirettoDownloadButton() {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const toggle = () => {
    setIsShowing(!isShowing);
  };
  return (
    <>
      <button onClick={toggle} className={styles.button}>
        パンフレットをダウンロード
      </button>
      {isShowing === true ? (
        <>
          <div className={styles.telopBg}>
            <div className={styles.telop}>
              <h3>パンフレットをダウンロードする</h3>
              <p>パンフレットダウンロードのためには以下の規約に同意する必要があります。</p>
              <div className={styles.listBox}>
                <ul className={styles.list}>
                  <li>インターネット上に再公開しない</li>
                  <li>無断で改変しない</li>
                </ul>
              </div>
              <p>以上の規約に同意しますか？</p>
              <div className={styles.buttonBox}>
                <button onClick={toggle}>いいえ</button>
                <button onClick={toggle}>はい</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
