import Link from "next/link";
import { Search } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/content/ecosystem";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Writing from Pranav Labs on software engineering, AI, automation, architecture, open source, and product development.",
  path: "/blog",
  keywords: ["engineering blog", "AI blog", "automation blog"],
});

type BlogPageProps = {
  searchParams: Promise<{ q?: string; category?: string; tag?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { q = "", category = "", tag = "" } = await searchParams;
  const query = q.toLowerCase().trim();
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = category ? post.category === category : true;
    const matchesTag = tag ? post.tags.includes(tag) : true;
    const matchesQuery = query
      ? [post.title, post.description, post.category, ...post.tags]
          .join(" ")
          .toLowerCase()
          .includes(query)
      : true;

    return matchesCategory && matchesTag && matchesQuery;
  });
  const categories = Array.from(
    new Set(blogPosts.map((post) => post.category)),
  );
  const tags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  return (
    <>
      <PageHero
        description="Engineering notes on systems, AI products, automation, architecture, and company building. Every post should teach a decision or pattern."
        eyebrow="Blog"
        title="Writing that teaches, not filler."
      />
      <section className="bg-background py-12 md:py-20">
        <div className="container-wide space-y-8">
          <form className="grid gap-3 rounded-xl border border-border bg-card p-4 shadow-sm md:grid-cols-[1fr_auto]">
            <label className="relative block">
              <span className="sr-only">Search blog</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                className="pl-11"
                defaultValue={q}
                name="q"
                placeholder="Search engineering notes"
                type="search"
              />
            </label>
            <button className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Search
            </button>
          </form>
          <div className="flex flex-wrap gap-2">
            <Link
              aria-current={!category && !tag ? "page" : undefined}
              className={`rounded-full border px-3 py-1 text-sm transition-colors hover:text-foreground ${
                !category && !tag
                  ? "border-primary text-foreground"
                  : "border-border text-muted-foreground"
              }`}
              href="/blog"
            >
              All
            </Link>
            {categories.map((item) => (
              <Link
                aria-current={category === item ? "page" : undefined}
                className={`rounded-full border px-3 py-1 text-sm transition-colors hover:text-foreground ${
                  category === item
                    ? "border-primary text-foreground"
                    : "border-border text-muted-foreground"
                }`}
                href={`/blog?category=${encodeURIComponent(item)}`}
                key={item}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((item) => (
              <Link
                aria-current={tag === item ? "page" : undefined}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:text-foreground ${
                  tag === item
                    ? "border-primary bg-background text-foreground"
                    : "border-transparent bg-secondary text-muted-foreground"
                }`}
                href={`/blog?tag=${encodeURIComponent(item)}`}
                key={item}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-background pb-20 md:pb-32">
        <div className="container-wide grid gap-5 md:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <Card className="h-full">
                <CardHeader>
                  <p className="text-sm font-medium text-primary">
                    {post.category}
                  </p>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
