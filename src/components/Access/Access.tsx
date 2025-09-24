import styles from './Access.module.scss';

export default function Access() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h3>アクセス</h3>
        </div>
        <div className={styles.contents}>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2084.7582434757614!2d135.5119765564246!3d34.65660272864267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e759111d6023%3A0x12ea7a9f1323bc!2z5aSn6Ziq5pif5YWJ5a2m6Zmi5Lit5a2m5qCh44O76auY562J5a2m5qCh!5e0!3m2!1sja!2sjp!4v1757117733159!5m2!1sja!2sjp'
            width='600'
            height='450'
            className={styles.googlemap}
            allowFullScreen={true}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          />
          <div className={styles.descriptionBox}>
            <div className={styles.description}>
              <h4>🚅 電車をご利用の場合</h4>

              <p>
                <strong>
                  <span className={styles.highlight}>
                    大阪メトロ谷町線「四天王寺前夕陽ヶ丘駅」
                  </span>
                </strong>
                <br />
                3番または5番出口より南へ
                <span className={styles.highlight}>徒歩約2分</span>です。
              </p>

              <h4>🚗 車をご利用の場合</h4>
              <p>
                本校には駐車場がありません。
                <br />
                お車での来校はご遠慮ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
