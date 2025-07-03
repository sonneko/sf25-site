import 'server-only';

import path from 'path';
import z from 'zod';
import { openFile, parseYaml } from './loader';

export const constantsSchema = z.object({
  'head-title': z.string(),
  'head-description': z.string(),
  // TODO: その他の定数定義
});
export type Constants = z.infer<typeof constantsSchema>;

export default class ConstantsManager {
  private static constants: Constants | null = null;

  private static load() {
    if (this.constants !== null) return;
    const filePath: string = path.join(process.cwd(), 'assets/constants.yaml');
    const file = openFile(filePath);
    this.constants = parseYaml(file, constantsSchema, filePath);
  }

  /**
   * 定数を取得する
   * @param key - 定数のキー
   * @returns 定数の内容
   */
  public static get(key: keyof Constants): string {
    this.load();
    return this.constants![key];
  }
}
