import BoothCard from '@/components/BoothCard/BoothCard';
import { getAllBoothsIDs, getBoothsById } from '../../../lib/BoothsProvider';

type Props = {
  params: Promise<{ booth_id: string }>;
};

export default async function EachBoothPage({ params }: Props) {
  const id = (await params).booth_id;
  const booth = getBoothsById(id);
  return (
    <>
      This is each blogs page in "/blog/{id}".
      <br />
      {booth === undefined ? (
        <>Not found</>
      ) : (
        <>
          <BoothCard data={booth} />
        </>
      )}
    </>
  );
}

export async function generateStaticParams(): Promise<
  {
    booth_id: string;
  }[]
> {
  return getAllBoothsIDs().map(id => {
    return { booth_id: id };
  });
}
