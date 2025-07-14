import EnvManager from '@/lib/EnvManager';
import type { NextConfig } from 'next';
import path from 'path';
import type { Configuration } from 'webpack';

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
  basePath: EnvManager.isDevEnv() ? '/sf25-site' : '',
  assetPrefix: EnvManager.isDevEnv() ? '/sf25-site' : '',
  webpack: (
    config: Configuration,
    { buildId, dev, isServer, defaultLoaders, webpack }
  ) => {
    config.module?.rules?.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/], // .ts, .tsx, .js, .jsx, .md, .mdx ファイルからインポートされる場合に適用
      },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false, // viewBoxを削除しない
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
