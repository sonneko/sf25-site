import 'server-only';

import ConstantsManager from './ConstantsManager';

export type SitemapInfo = {
  path: string;
  changeFrequency: string;
  priority: number;
};

export default function generateSitemap(sitemapInfos: SitemapInfo[]) {
  const baseUrl = ConstantsManager.get('app-url');
  const sitemap = sitemapInfos
    .map(sitemapInfo => {
      return `
            <url>
              <loc>${baseUrl}/${sitemapInfo.path}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>${sitemapInfo.changeFrequency}</changefreq>
              <priority>${sitemapInfo.priority}</priority>
            </url>
        `;
    })
    .join('')
    .trim();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${sitemap}
    </urlset>
  `;
}
