import DOMPurify from 'dompurify';
import fs from 'fs';
import yaml from 'js-yaml';
import { marked } from 'marked';
import React from 'react';
import type z from 'zod';
import type { Schema } from 'zod';

/**
 * ファイルを開いて文字列として返す
 * @param filePath 開くファイルのプロジェクトのルートからの相対パス
 * @returns ファイルの中身の文字列
 */
export function openFile(filePath: string): string {
  try {
    const fileContents: string = fs.readFileSync(filePath, 'utf8');
    return fileContents;
  } catch (e) {
    throw new Error(`Failed to open file: ${filePath}.\n error_message: ${e}`);
  }
}

/**
 * schemaを元に、yamlとして文字列をパースする。
 * @param fileContents 入力文字列
 * @param schema 型情報
 * @param filePath どのファイルの文字列なのか（エラーメッセージの表示に用いる）
 * @returns 結果のオブジェクト
 */
export function parseYaml(
  fileContents: string,
  schema: Schema,
  filePath: string
): z.infer<typeof schema> {
  try {
    const parsed = schema.parse(yaml.load(fileContents));
    return parsed;
  } catch (e) {
    throw new Error(`Failed to parse yaml file: ${filePath}.\n error_message: ${e}`);
  }
}

/**
 * mdとして文字列をパースする。
 * @param fileContents 入力文字列
 * @param filePath どのファイルの文字列なのか（エラーメッセージの表示に用いる）
 * @returns 結果のhtml
 */
export function parseMd(
  fileContents: string,
  filePath: string
): React.ReactNode {
  try {
    const parsedDangerous = marked.parse(fileContents, {
      gfm: true,
      breaks: true,
      pedantic: false,
      async: false
    });
    const cleanHtml = DOMPurify.sanitize(parsedDangerous);
    // innerHTMLを使用しているが、サニタイズ処理をしているので安全
    return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
  } catch (e) {
    throw new Error(`Failed to parse md file: ${filePath}.\n error_message: ${e}`);
  }
}