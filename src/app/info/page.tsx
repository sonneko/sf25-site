import styles from "./page.module.scss";

export default function InfoPage() {
  return(
    <>
      <h1>INFO: 開催情報</h1>
      <div className={styles.table}>
        <div className={styles.tr}>
          <div className={styles.th}>開催日時</div>
          <div className={styles.th}>11/3(日)・9:00〜15:30</div>
        </div>
        <div className={styles.tr}>
          <div className={styles.th}>持ち物</div>
          <div className={styles.th}>上履き/スリッパが必要です</div>
        </div>
        <div className={styles.tr}>
          <div className={styles.th}>開催場所</div>
          <div className={styles.th}>〒543-0061 大阪星光学院中学校・高等学校</div>
        </div>
      </div>

      <div>
        
      </div>
    </>
  )
}