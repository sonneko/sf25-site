'use client';
import type { Booth } from '../types/booth';
import { type SearchIndex, searchIndexSchema } from '../types/searchIndex';
import TinySegmenter from 'tiny-segmenter';
import { getBoothsById } from './BoothsProvider';

let searchIndex: SearchIndex | null = null;
const tinySegmenter = new TinySegmenter();

function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;

  // DPテーブルを作成
  const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

  // 初期化
  // @ts-ignore
  for (let i = 0; i <= len1; i++) dp[i][0] = i;
  // @ts-ignore
  for (let j = 0; j <= len2; j++) dp[0][j] = j;

  // DPテーブルを埋める
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        // @ts-ignore
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // @ts-ignore
        dp[i][j] = Math.min(
          // @ts-ignore
          dp[i - 1][j] + 1, // 削除
          // @ts-ignore
          dp[i][j - 1] + 1, // 挿入
          // @ts-ignore
          dp[i - 1][j - 1] + 1 // 置換
        );
      }
    }
  }

  // 最終的な編集距離を返す
  // @ts-ignore
  return dp[len1][len2];
}

function similarity(str1: string, str2: string) {
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);

  // 最大長が0の場合は100%（両方とも空文字列の場合）
  if (maxLength === 0) return 100;

  // 類似度計算
  const similarityScore = (1 - distance / maxLength) * 100;
  return similarityScore;
}

async function getSearchIndex(): Promise<SearchIndex> {
  if (searchIndex !== null) return searchIndex;
  const json = (await fetch('/search-index.json').then(res =>
    res.json()
  )) as unknown;

  try {
    searchIndex = searchIndexSchema.parse(json);
    return searchIndex;
  } catch (err) {
    alert('何らかのエラーで検索に失敗しました。');
    throw new Error(err + '\n\n' + 'failed to ');
  }
}

function segment(input: string): string[] {
  return tinySegmenter.segment(input);
}

export default async function search(keyword: string): Promise<Booth[]> {
  const searchIndex = await getSearchIndex();
  const segmentedKeywords = segment(keyword);
  const result = segmentedKeywords.map(word => {
    const wordResult: number[] = searchIndex.map(target => {
      const distances = target.tokens.map(token => similarity(token, word));
      const sumDistance = distances.reduce((curr, pre) => curr + pre);
      return sumDistance;
    });
    return wordResult;
  });
  const sumDistance: number[] = Array(searchIndex.length).fill(0);
  result.forEach(eachWordResult => {
    // @ts-expect-error
    eachWordResult.forEach((result, index) => (sumDistance[index] += result));
  });
  const idList = sumDistance
    .map((distance, index) => {
      // @ts-expect-error
      const boothId = searchIndex[index].booth_id;
      return { id: boothId, distance };
    })
    .sort((a, b) => b.distance - a.distance)
    .map(booth => booth.id);

  return await Promise.all(idList.map(async id => await getBoothsById(id) as Booth));
}
