import type { SitemapInfo } from '@/lib/generateSitemap';
import generateSitemap from '@/lib/generateSitemap';

export async function GET() {
  const staticMaps: SitemapInfo[] = [
    { path: '', changeFrequency: 'weekly', priority: 1.0 },
    { path: 'info', changeFrequency: 'weekly', priority: 0.7 },
    { path: 'stage', changeFrequency: 'weekly', priority: 0.7 },
    { path: 'booth', changeFrequency: 'weekly', priority: 0.7 },
    { path: 'map', changeFrequency: 'weekly', priority: 0.7 },
    { path: 'blog', changeFrequency: 'weekly', priority: 0.7 },
    { path: 'video', changeFrequency: 'weekly', priority: 0.7 },
    { path: 'search', changeFrequency: 'weekly', priority: 0.7 },
  ];

  // const blogMaps: SitemapInfo[] = BlogManager.getAllBlogs().map(blog => ({
  //   path: `blog/${blog.id}`,
  //   changeFrequency: 'daily',
  //   priority: 0.8,
  // }));

  // const boothMaps: SitemapInfo[] = BoothManager.getAllBooths().map(booth => ({
  //   path: `booth/${booth.id}`,
  //   changeFrequency: 'daily',
  //   priority: 0.8,
  // }));

  const maps: SitemapInfo[] = [...staticMaps /*...blogMaps, ...boothMaps*/];

  return new Response(generateSitemap(maps), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
