// import BoothManager from '@/lib/BoothManager';

type Props = {
  params: Promise<{ booth_id: string }>;
};

export default async function EachBoothPage({ params }: Props) {
  const id = (await params).booth_id;

  return <>This is each booths page in "/booth/{id}".</>;
}

export async function generateStaticParams() {
  // BoothManager.load();
  // const data = BoothManager.getAllBooths();
  // return data.map(eachBooth => {
  //   return { booth_id: eachBooth.id };
  // });
  return [];
}
