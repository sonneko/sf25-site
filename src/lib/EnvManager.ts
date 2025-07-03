import 'server-only';

export type Env = 'product' | 'dev';

export default class EnvManager {
  private static env: Env = 'product';
  private static isInited: boolean = false;

  private static init() {
    if (!this.isInited) {
      const envValue = process.env.NEXT_PUBLIC_ENV;
      if (envValue === 'product') {
        this.env = 'product';
      } else if (envValue === 'dev') {
        this.env = 'dev';
      } else if (envValue === undefined) {
        throw new Error('\nNEXT_PUBLIC_ENV is not configure.');
      } else {
        throw new Error(`\nNEXT_PUBLIC_ENV is invalid. ${envValue}`);
      }
      this.isInited = true;
    }
  }

  /**
   * @returns {boolean} 本番環境ならtrue・開発環境ならfalse
   */
  public static isProductEnv(): boolean {
    this.init();
    return this.env === 'product';
  }

  /**
   * @returns {boolean} 本番環境ならfalse・開発環境ならtrue
   */
  public static isDevEnv(): boolean {
    this.init();
    return this.env === 'dev';
  }
}
