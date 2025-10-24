// import BoothManager from '@/lib/BoothManager';
import type { Booth } from '@/types/booth';
import styles from './BoothCard.module.scss';

export type BoothCardVariation = 'default' | 'small';

export default function BoothCard({
  data,
  variation = 'default',
}: {
  data: Booth;
  variation?: BoothCardVariation;
}) {
  const { booth_id, booth_name, group_name, long_description, tags } = data;

  if (variation === 'default') {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.card_body}>
            <img src={`booths-icon/${booth_id}.png`} alt={booth_name} width={200} height={200} className={styles.card_img}></img>
            <div className={styles.card_content}>
              <h5 className={styles.card_title}>{booth_name}</h5>
              <p className={styles.card_groupname}>{group_name}</p>
              <p className={styles.card_text}>{long_description}</p>
              <div className={styles.tag}>
                {
                  tags.map(tag => {
                    if (tag === "attraction") {
                      return "アトラクション"
                    } else if (tag === "exhibition") {
                      return "展示"
                    } else if (tag === "food") {
                      return "食べ物"
                    } else if (tag === "game/experience") {
                      return "ゲーム・体験"
                    } else if (tag === "magazine") {
                      return "部誌販売/配布"
                    } else if (tag == "movie") {
                      return "映像"
                    } else if (tag== "performance") {
                      return "パフォーマンス"
                    } else if (tag === "store") {
                      return "販売"
                    }
                  }).map(tag => <span className={styles.tag_item} key={tag}>{tag}</span>)
                }
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (variation === 'small') {
    return (
      <>
        unimplemented
      </>
    );
  }
}
