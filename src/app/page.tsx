import TopSlideShow from '../components/TopSlideShow/TopSlideShow';
import CountDown from '../components/CountDown/CountDown';
import News from '../components/News/News';
import { InfoSection } from '../components/InfoSection/InfoSection';

import styles from './page.module.scss';
import Access from '../components/Access/Access';

export default function HomePage() {
  return (
    <>
      <div className={styles.container}>
        <TopSlideShow />
        <CountDown />
        <News />
        <InfoSection title='SFとは？'>
          SFとは何か説明する。
          <br />
          SFとは何か説明する。
          <br />
          SFとは何か説明する。
          <br />
          SFとは何か説明する。
          <br />
          SFとは何か説明する。
          <br />
          SFとは何か説明する。
          <br />
          SFとは何か説明する。
          <br />
          SFとは何か説明する。
          <br />
          SFとは何か説明する。
          <br />
          SFとは何か説明する。
          <br />
        </InfoSection>
        <InfoSection title='SF運営代表挨拶'>
          SF運営代表のありがたいお言葉。
          <br />
          SF運営代表のありがたいお言葉。
          <br />
          SF運営代表のありがたいお言葉。
          <br />
          SF運営代表のありがたいお言葉。
          <br />
          SF運営代表のありがたいお言葉。
          <br />
          SF運営代表のありがたいお言葉。
          <br />
          SF運営代表のありがたいお言葉。
          <br />
          SF運営代表のありがたいお言葉。
        </InfoSection>
        <Access />
      </div>
    </>
  );
}
