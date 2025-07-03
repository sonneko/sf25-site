import BlogManager from '@/lib/BlogManager';
import { type Blog } from '@/types/blog';
import { beforeEach, describe, expect, it } from 'vitest';

describe('BlogManager', () => {
  beforeEach(() => {
    BlogManager.checkoutDevEnv();
    BlogManager.load(true); // forceをtrueにして強制的に再ロード
  });

  it('should load all blogs correctly when in dev environment', () => {
    const allBlogs = BlogManager.getAllBlogs();

    // 期待されるブログの数を確認
    expect(allBlogs).toHaveLength(2);

    // 特定のブログデータが正しく読み込まれているかを確認
    const blogTest1 = allBlogs.find(
      blog => blog.id === 'blog_test_1'
    );
    expect(blogTest1).toBeDefined();
    expect(blogTest1?.title).toBe('テストブログ1');
    expect(blogTest1?.author).toBe('テスト太郎');
    expect(blogTest1?.parsedContent).toBe('これはテストブログ1のコンテンツです。\n');

    const blogTest2 = allBlogs.find(blog => blog.id === 'blog_test_2');
    expect(blogTest2).toBeDefined();
    expect(blogTest2?.title).toBe('別のテストブログ');
    expect(blogTest2?.author).toBe('開発者A');
    expect(blogTest2?.parsedContent).toBe('これは別のテストブログのコンテンツです。キーワード「開発」を含みます。\n');
  });

  it('should return null for a non-existent blog id', () => {
    const blog = BlogManager.getBlogById('non_existent_id');
    expect(blog).toBeNull();
  });

  it('should return the correct blog by id', () => {
    const blog = BlogManager.getBlogById('blog_test_2');
    expect(blog).toBeDefined();
    expect(blog?.title).toBe('別のテストブログ');
    expect(blog?.author).toBe('開発者A');
  });

  it('should search blogs by keyword in title, author, or content (case-insensitive)', () => {
    const testBlogs = BlogManager.searchBlogs('テスト');
    expect(testBlogs).toHaveLength(2);
    expect(testBlogs.some(blog => blog.id === 'blog_test_1')).toBe(true);
    expect(testBlogs.some(blog => blog.id === 'blog_test_2')).toBe(true);

    const authorBlogs = BlogManager.searchBlogs('開発者');
    expect(authorBlogs).toHaveLength(1);
    expect(authorBlogs[0]?.id).toBe('blog_test_2');

    const contentBlogs = BlogManager.searchBlogs('コンテンツ');
    expect(contentBlogs).toHaveLength(2);

    const caseInsensitiveSearch = BlogManager.searchBlogs('テストブログ1');
    expect(caseInsensitiveSearch).toHaveLength(1);
    expect(caseInsensitiveSearch[0]?.id).toBe('blog_test_1');

    const emptySearchResult = BlogManager.searchBlogs('存在しないキーワード');
    expect(emptySearchResult).toHaveLength(0);
  });

  it('should generate the correct blog URL', () => {
    const dummyBlog: Blog = {
      id: 'test_blog',
      title: 'テストブログ',
      author: 'テスト作者',
      date: '2023-01-01',
      content: 'テストコンテンツ',
      parsedContent: 'テストコンテンツ',
      tags: ['after']
    };
    const url = BlogManager.generateBlogUrl(dummyBlog);
    expect(url).toBe('/blog/test_blog');
  });

  it('should throw error if methods requiring loaded data are called before load', () => {
    // キャッシュを強制的にクリアし、未ロード状態にする
    BlogManager['blogsDataCache'] = null;

    expect(() => BlogManager.getAllBlogs()).toThrowError(
      '\nloadメソッドよりも先にload必須のメソッドが呼ばれました。BlogManagerクラスのメソッドはloadメソッドを使用してからでないと使用できません。\n\n'
    );
  });
});
