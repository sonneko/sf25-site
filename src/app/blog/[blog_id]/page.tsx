import BlogManager from '@/lib/BlogManager';

type Props = {
  params: Promise<{ blog_id: string }>;
};

export default async function EachBlogPage({ params }: Props) {
  const path = (await params).blog_id;
  return <>This is each blogs page in "/blog/{path}".</>;
}

export async function generateStaticParams() {
  BlogManager.load();
  const data = BlogManager.getAllBlogs();
  return data.map(eachBlog => {
    return { booth_id: eachBlog.id };
  });
}
