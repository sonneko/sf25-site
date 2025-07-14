import TopSlideShow from '../components/TopSlideShow/TopSlideShow';
import CountDown from '../components/CountDown/CountDown';
import News from '../components/News/News';

export default function HomePage() {

  return (
    <>
      <main style={{ marginTop: '70px', position: 'relative', zIndex: 1 }}>
        <TopSlideShow />
        <CountDown />
        <News />
      </main>
    </>
  );
}
