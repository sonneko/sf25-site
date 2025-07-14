interface Params {
  news_id: string;
}

export async function generateStaticParams() {
  return [{ news_id: 'iuu' }, { news_id: '2' }, { news_id: '3' }];
}

export default async function EachNewsPage({ params }: { params: Promise<Params> }) {
  const newsId = (await params).news_id;
  return (
    <>
      <div style={{ marginTop: '1000px' }} />
      <p>This is each news page with id: {newsId}</p>
    </>
  );
}
