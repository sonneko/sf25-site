import path from 'path';
import { z } from 'zod';
import { openFile, parseYaml, parseMd } from './loader';

import { BlogSchema, type Blog } from '@/types/blog';
import EnvManager from './EnvManager';

export default class BlogManager {
  private static blogsDataCache: Blog[] | null = null;
  private static pathGenerater: () => [string, string] =
    this.pathGenerateForProductEnv;

  /**
   * 開発環境の場合、パスをテスト用のダミーアセットに変更する
   */
  public static checkoutDevEnv() {
    this.pathGenerater = this.pathGenerateForDevEnv;
  }

  // 本番環境用のpathGenerater関数
  private static pathGenerateForProductEnv(): [string, string] {
    return ['assets/blogs-index.yaml', 'assets/blogs'];
  }

  private static pathGenerateForDevEnv(): [string, string] {
    return [
      'src/tests/dummy_assets/blogs-index.yaml',
      'src/tests/dummy_assets/blogs',
    ];
  }

  // ヘルパー関数として分離
  private static loadBlogData(): Blog[] {
    const [indexBlog, blogsDirectory] = this.pathGenerater();
    const filePath: string = path.join(process.cwd(), indexBlog);

    const fileContents = openFile(filePath);
    const blogIndex = parseYaml(fileContents, z.array(z.string()), filePath);

    // assets/blogs/[blog_name].yamlからid列を用いてそれぞれの詳細情報を取得
    const blogsData: Blog[] = blogIndex.map((blog_name: string): Blog => {
      const metaFilePath = path.join(
        process.cwd(),
        blogsDirectory,
        `${blog_name}.yaml`
      );
      const mdFilePath = path.join(
        process.cwd(),
        blogsDirectory,
        `${blog_name}.md`
      );

      const metaFileContents = openFile(metaFilePath);
      const mdFileContents = openFile(mdFilePath);
      const eachBlogMetaData = parseYaml(
        metaFileContents,
        BlogSchema,
        metaFilePath
      );
      const parsedContent = parseMd(mdFileContents, filePath);

      return { ...eachBlogMetaData, parsedContent };
    });

    return blogsData;
  }

  /**
   * Blogsのデータをロードする関数
   * @param {boolean} [force=false]- trueでキャッシュを無視して強制的に再ロード
   */
  public static load(force?: boolean): BlogManager {
    if (EnvManager.isDevEnv()) {
      this.checkoutDevEnv();
    }

    if (BlogManager.blogsDataCache === null || force === true) {
      BlogManager.blogsDataCache = this.loadBlogData();
    }
    return this;
  }

  public static getAllBlogs(): Blog[] {
    if (BlogManager.blogsDataCache === null) {
      throw new Error(
        '\nloadメソッドよりも先にload必須のメソッドが呼ばれました。BlogManagerクラスのメソッドはloadメソッドを使用してからでないと使用できません。\n\n'
      );
    }
    return BlogManager.blogsDataCache;
  }

  /**
   * IDでブログを検索
   * @param {string} id - ブログID
   * @return {Blog | null} 指定したIDのブログ、見つからなければnull
   */
  public static getBlogById(id: string): Blog | null {
    const found = this.getAllBlogs().find(eachBlog => eachBlog.id === id);
    return found ?? null;
  }

  /**
   * 指定したキーワードを含むブログを取得（部分一致・大文字小文字無視）
   * @param {string} keyword - 検索キーワード
   * @return {Blog[]} 検索結果のBlogの配列
   */
  public static searchBlogs(keyword: string): Blog[] {
    const lower = keyword.toLowerCase();
    return this.getAllBlogs().filter(
      blog =>
        blog.title.toLowerCase().includes(lower) ||
        blog.author.toLowerCase().includes(lower) ||
        blog.content.toLowerCase().includes(lower)
    );
  }

  /**
   * ブログのURLを生成
   * @param {Blog} blog - ブログオブジェクト
   * @return {string} ブログのURL
   */
  public static generateBlogUrl(blog: Blog): string {
    return `/blog/${blog.id}`;
  }
}
