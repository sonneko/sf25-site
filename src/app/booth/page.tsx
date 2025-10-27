import BoothCard from '../../components/BoothCard/BoothCard';
import { getAllBooths } from '../../lib/BoothsProvider';
import styles from './page.module.scss';

export default async function BoothPage() {
  const booths = await getAllBooths();
  const length = booths.length;
  return (
    <>
      <h1 className={styles.title}>Booths</h1>
      <div>{length}</div>
      {booths.map((booth, index) => (
        <div key={index} className={styles.spacer}>
          <BoothCard key={index} data={booth} />
        </div>
      ))}
    </>
  );
}
