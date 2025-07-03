import type { SitemapInfo } from '@/lib/generateSitemap';
import generateSitemap from '@/lib/generateSitemap';

export async function GET() {
  const maps: SitemapInfo[] = [
    // TODO: サイトマップのデータを挿入する
  ];
  return new Response(generateSitemap(maps), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
