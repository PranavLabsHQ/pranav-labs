import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/shared/PageHero";
import { blogPosts } from "@/content/ecosystem";
import { siteConfig } from "@/content/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHero
        description={post.description}
        eyebrow={`${post.category} - ${post.date}`}
        title={post.title}
      />
      <article className="bg-background py-20 md:py-32">
        <div className="container-wide max-w-3xl space-y-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          {post.body.map((paragraph) => (
            <p
              className="text-base leading-8 text-muted-foreground md:text-lg"
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </>
  );
}
