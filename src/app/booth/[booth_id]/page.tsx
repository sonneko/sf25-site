import BoothManager from '@/lib/BoothManager';

type Props = {
  params: Promise<{ booth_id: string }>;
};

export default async function EachBoothPage({ params }: Props) {
  BoothManager.load();
  const id = (await params).booth_id;
  const booth = BoothManager.getBoothById(id);

  if (booth === null) {
    throw new Error(`Booth with id ${id} not found.`);
  }
  return <>This is each booths page in "/booth/{booth.id}".</>;
}

export async function generateStaticParams() {
  BoothManager.load();
  const data = BoothManager.getAllBooths();
  return data.map(eachBooth => {
    return { booth_id: eachBooth.id };
  });
}
