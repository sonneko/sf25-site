'use client'

/**
 * URLパラメータの指定のキーの値を取得する
 * @param key URLパラメータのキー
 * @returns 存在すればそのバリュー、存在しなければnull
 */
export default function getUrlParams(key: string): string | null {
    if (window === undefined) throw new Error('call getUrlParams called on build step which can only call on client.');
    const paramsStr = window.location.search;
    const params = new URLSearchParams(paramsStr);
    return params.get(key);
}