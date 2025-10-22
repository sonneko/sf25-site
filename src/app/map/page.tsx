'use client';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('../../components/Map/Map'), {
  ssr: false,
  loading: () => <p>地図を読み込み中...</p>,
});

export default function MapPage() {
  return (
    <>
      <DynamicMap />
    </>
  );
}
