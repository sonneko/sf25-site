// import BoothManager from '@/lib/BoothManager';
import type { Booth } from '@/types/booth';
import Link from 'next/link';
import styles from './BoothCard.module.scss';

export type BoothCardVariation = 'default' | 'small';

export default function BoothCard({
  data,
  variation = 'default',
}: {
  data: Booth;
  variation?: BoothCardVariation;
}) {
  const { booth_name } = data;

  if (variation === 'default') {
    return (
      <>
        <div className='container'>
          <div className={styles.title}>
            <Link href={'unimplemented!'}>
              {' '}
              {/*WARNING: not implemented"*/}
              <h5 className='title-name'>{booth_name}</h5>
            </Link>
          </div>
        </div>
      </>
    );
  } else if (variation === 'small') {
    return (
      <>
        <div className='container'>
          <div className='card-body'>
            <h5 className='card-title'>{booth_name}</h5>
          </div>
        </div>
      </>
    );
  }
}
