import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AffiliateCTA, ComparisonTable } from "@/components/ReviewUI";
import {
  getPostBySlug,
  getPostsByCategory,
  getAffiliateDisclaimer,
} from "@/lib/posts";
import {
  CheckCircle2,
  Calendar,
  Share2,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Metadata */
/* ------------------------------------------------------------------ */

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;}
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Review Not Found | SuyoohTech Blog" };
  }

  return {
    title: `${post.title} | SuyoohTech Blog`,
    description: post.description,
    alternates: {
      canonical: `https://www.suyooh.com/post/${post.slug}`,
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD */
/* ------------------------------------------------------------------ */

function generateJsonLd(post: Awaited<ReturnType<typeof getPostBySlug>>) {
  if (!post || !post.product) return null;

  const price =
    post.product.price?.replace(/[^0-9.]/g, "") || undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Review",
    headline: post.title,
    description: post.description,
    image: [post.featuredImage],
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Organization",
      name: "SuyoohTech Blog Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "SuyoohTech Blog",
      logo: {
        "@type": "ImageObject",
        url: "https://picsum.photos/id/1/200/200",
      },
    },
    reviewRating: post.product.rating && {
      "@type": "Rating",
      ratingValue: post.product.rating,
      bestRating: "5",
    },
    itemReviewed: {
      "@type": "Product",
      name: post.product.name,
      image: [post.featuredImage],
      brand: {
        "@type": "Brand",
        name: post.product.brand,
      },
      aggregateRating:
        post.product.rating && post.product.ratingCount
          ? {
              "@type": "AggregateRating",
              ratingValue: post.product.rating,
              ratingCount: post.product.ratingCount,
            }
          : undefined,
      offers: post.product.amazonLink && {
        "@type": "Offer",
        url: post.product.amazonLink,
        price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        priceValidUntil: "2026-12-31",
      },
    },
  };
}

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default async function PostDetail(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const [post, affiliateDisclaimer] = await Promise.all([
    getPostBySlug(slug),
    getAffiliateDisclaimer(),
  ]);

  if (!post) notFound();

  const relatedPosts = (await getPostsByCategory(post.category))
    .filter((p) => p.id !== post.id)
    .slice(0, 10);

  const jsonLd = generateJsonLd(post);

  return (
    <div className="bg-white min-h-screen">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Header */}
      <header className="bg-slate-50 border-b pt-12 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-xs font-bold uppercase mb-8 text-slate-400">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-slate-900">{post.category}</span>
          </nav>

          <h1 className="text-4xl font-black mb-6">{post.title}</h1>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar size={14} />
            Published {post.date}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-16">
        {/* Article */}
        <article className="lg:w-2/3">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="rounded-3xl mb-12 shadow-xl aspect-[16/9] object-cover w-full"
          />

          <div className="prose prose-xl max-w-none">
            <p className="text-xl">{post.description}</p>

            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="space-y-6"
            />

            {post.product && (
              <>
                <h2 className="flex items-center gap-2 mt-12">
                  <CheckCircle2 className="text-emerald-500" />
                  Editor’s Choice
                </h2>
                <AffiliateCTA product={post.product} type="primary" />
              </>
            )}

            {post.product && post.compareWith && (
              <>
                <h2 className="mt-16">Expert Comparison</h2>
                <ComparisonTable
                  productA={post.product}
                  productB={post.compareWith}
                />
              </>
            )}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:w-1/3 sticky top-24 space-y-10">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h3 className="flex items-center gap-2 mb-6">
              <Share2 className="text-blue-600" size={18} />
              More from {post.category}
            </h3>

            {relatedPosts.map((p) => (
              <Link
                key={p.id}
                href={`/post/${p.slug}`}
                className="flex gap-4 mb-4 group"
              >
                <img
                  src={p.featuredImage}
                  alt={p.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm group-hover:text-blue-600">
                    {p.title}
                  </h4>
                  <span className="text-xs text-slate-400">{p.date}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-blue-50 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="text-blue-600" />
              Affiliate Disclosure
            </div>
            <p className="text-xs text-slate-500">{affiliateDisclaimer}</p>
          </div>
        </aside>
      </main>
    </div>
  );
}
