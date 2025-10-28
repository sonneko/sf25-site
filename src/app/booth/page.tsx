import BoothCard from '../../components/BoothCard/BoothCard';
import { getAllBooths } from '../../lib/BoothsProvider';
import styles from './page.module.scss';

export default async function BoothPage() {
  const booths = await getAllBooths();
  return (
    <>
      <h1 className={styles.title}>企画一覧</h1>
      {booths.map((booth, index) => (
        <div key={index} className={styles.spacer}>
          <BoothCard key={index} data={booth} />
        </div>
      ))}
    </>
  );
}
