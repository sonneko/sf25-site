import EnvManager from '@/lib/EnvManager';
import type { NextConfig } from 'next';
import path from 'path';

const generateSassAdditionalData = (): string => {
  if (EnvManager.isDevEnv()) {
    return `@use './src/styles/_mixin' as *;`;
  } else {
    return `@use './src/styles/_mixin' as *; @use './src/styles/_debug' as *;`;
  }
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: EnvManager.isProductEnv(), // 本番では console を削除
  },
  typescript: {
    ignoreBuildErrors: false, // TypeScript エラー時にビルドを止める
  },
  output: 'export',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: generateSassAdditionalData(),
  },
  basePath: EnvManager.isDevEnv() ? '/sf25-site-temporary' : '',
  assetPrefix: EnvManager.isDevEnv() ? '/sf25-site-temporary' : '',
};

export default nextConfig;
