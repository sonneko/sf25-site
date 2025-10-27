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
          SFとは、星光生が....
        </InfoSection>
        <InfoSection title='中村/SF運営代表 挨拶'>
          2025年度SFにようこそ！SF運営委員長を担当しております中村天
          です。「とにかく、みんなが楽しいと言っちゃうSFを作りたい！」と
          いう気持ちでここまで頑張ってきました。学校中の生徒がこの日の
          ためにたくさんの準備をしてきました。それら全てが一つにまとまっ
          た「SinFonia」がみなさんの心に響くのを願っております。とにか
          く楽しんでください！
        </InfoSection>
        <Access />
      </div>
    </>
  );
}
