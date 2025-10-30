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
        <InfoSection title='田沢神父/校長先生 挨拶'>
          <p>SF(スクールフェア)に、ようこそおいでくださいました。</p>
          <p>
            楽しい時を過ごしてほしいと思います。今年のテーマは「SinFonia」(調和)です。
            <br />
            シンフォニアは、ギリシア語の「syn-(一緒に)」と「phone(音)」を語源とするイタリア語で、合奏曲を意味する言葉です。多くの楽器が調和して、全体として良い音を奏でるものになることを期待します。
          </p>
          <p>
            生徒たちは、今日のために様々な企画を準備してきましたが、
            皆さんに喜んでもらえることを意識してきたと思います。
            準備段階では苦労もありますが、共に協力して何かを作り出すのは、
            大きな喜びです。そして、本番でお客さんの笑顔を見るのもうれしいものです。
          </p>
          <p>それでは、ゆっくりとお楽しみください。</p>
        </InfoSection>
        <InfoSection title='中村/SF運営代表 挨拶'>
          <p>
            2025年度SFにようこそ！SF運営委員長を担当しております中村天です。
          </p>
          <p>
            「とにかく、みんなが楽しいと言っちゃうSFを作りたい！」という気持ちでここまで頑張ってきました。
            <br />
            学校中の生徒がこの日のためにたくさんの準備をしてきました。それら全てが一つにまとまった「SinFonia」がみなさんの心に響くのを願っております。
            <br />
            とにかく楽しんでください！
          </p>
        </InfoSection>
        <Access />
      </div>
      <div className={styles.logo_box}>
        <img src='/icon/sf-logo-color.svg' width={400} />
      </div>
    </>
  );
}
