"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MOCK_POSTS, AFFILIATE_DISCLAIMER } from "@/constants";
import { AffiliateCTA, ComparisonTable } from "@/components/ReviewUI";
import {
  CheckCircle2,
  Calendar,
  Share2,
  MessageSquare,
  ChevronRight,
  LinkIcon,
  Info,
} from "lucide-react";

export default function PostDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const post = MOCK_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      // Dynamic SEO Title
      document.title = `${post.title} | SuyoohTech Blog`;

      // Dynamic SEO Meta Description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", post.description);
      }

      // Inject JSON-LD Structured Data for Featured Snippets
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "Review",
        headline: post.title,
        description: post.description,
        image: [post.featuredImage],
        datePublished: post.date,
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

        reviewRating: {
          "@type": "Rating",
          ratingValue: post.product?.rating,
          bestRating: "5",
        },

        itemReviewed: {
          "@type": "Product",
          name: post.product?.name,
          description: post.description,
          image: [post.featuredImage],

          brand: {
            "@type": "Brand",
            name: post.product?.brand,
          },

          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: post.product?.rating,
          },

          offers: {
            "@type": "Offer",
            url: post.product?.amazonLink,
            price: post.product?.price?.replace(/[^0-9.]/g, ""),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2026-12-31",

            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingRate: {
                "@type": "MonetaryAmount",
                value: "0",
                currency: "USD",
              },
              shippingDestination: {
                "@type": "DefinedRegion",
                addressCountry: "US",
              },
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: {
                  "@type": "QuantitativeValue",
                  minValue: 1,
                  maxValue: 2,
                  unitCode: "d",
                },
                transitTime: {
                  "@type": "QuantitativeValue",
                  minValue: 3,
                  maxValue: 5,
                  unitCode: "d",
                },
              },
            },

            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              returnPolicyCategory:
                "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 30,
              returnMethod: "https://schema.org/ReturnByMail",
              returnFees: "https://schema.org/FreeReturn",
            },
          },

          review: {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: post.product?.rating,
              bestRating: "5",
            },
            author: {
              "@type": "Organization",
              name: "SuyoohTech Blog Editorial Team",
            },
          },
        },
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schemaData);
      script.id = "json-ld-schema";
      document.head.appendChild(script);

      return () => {
        const existingScript = document.getElementById("json-ld-schema");
        if (existingScript) existingScript.remove();
      };
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Review Not Found</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Article Header */}
      <header className="bg-slate-50 border-b border-slate-200 pt-12 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-slate-900">{post.category}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-start gap-8">
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <Calendar size={14} />
              <span>Published {post.date}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Article Body */}
          <article className="lg:w-2/3">
            <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl bg-slate-100 aspect-[16/9]">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Discover Snippet Box: At a Glance */}
            <div className="bg-blue-50 rounded-3xl p-8 mb-12 border border-blue-100">
              <div className="flex items-center gap-2 mb-4">
                <Info className="text-blue-600" size={20} />
                <h2 className="text-lg font-bold text-slate-900">
                  Review at a Glance
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                    Verdict
                  </span>
                  <p className="text-sm font-bold text-blue-600">
                    Highly Recommended
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                    Key Strength
                  </span>
                  <p className="text-sm font-bold text-slate-800">
                    Performance Efficiency
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                    Price Value
                  </span>
                  <p className="text-sm font-bold text-slate-800">
                    Premium but Worth It
                  </p>
                </div>
              </div>
            </div>
            <div className="prose prose-slate lg:prose-xl max-w-none">
              <p className="text-xl leading-relaxed text-slate-600 font-medium mb-8">
                {post.description}
              </p>

              <div className="bg-slate-50 border-l-4 border-blue-600 p-8 rounded-r-2xl mb-12 italic text-slate-700">
                &quot;Our reviews are based on actual hands-on testing and data
                metrics in our US labs. We prioritize long-term durability and
                real-world performance.&quot;
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="rich-content space-y-6 text-slate-800 leading-loose"
              />

              {/* Primary Affiliate Card - Strategic for Featured Snippets */}
              {post.product && (
                <>
                  <div className="flex items-center gap-2 mt-12 mb-6">
                    <CheckCircle2 className="text-emerald-500" size={24} />
                    <h2 className="text-2xl font-bold m-0">
                      Editor&apos;s Choice Recommendation
                    </h2>
                  </div>
                  <AffiliateCTA product={post.product} type="primary" />
                </>
              )}

              {/* Comparison if available */}
              {post.product && post.compareWith && (
                <>
                  <h2 className="text-2xl font-bold mt-16 mb-6">
                    Expert Comparison: Which Should You Buy?
                  </h2>
                  <ComparisonTable
                    productA={post.product}
                    productB={post.compareWith}
                  />
                </>
              )}

              <h2 className="text-3xl font-bold mt-16 mb-8">
                The Final Verdict
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                After 40+ hours of testing, we concluded that the{" "}
                {post.product?.name} offers the best balance of features for the
                average US tech enthusiast. It justifies its premium price tag
                through superior build quality and a future-proof set of
                specifications.
              </p>

              <div className="bg-slate-900 rounded-3xl p-10 text-white mt-16 relative overflow-hidden shadow-2xl border-l-8 border-blue-600">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="md:w-1/2">
                    <div className="text-5xl font-black mb-4 text-blue-500">
                      9.5<span className="text-slate-500 text-2xl">/10</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Key Takeaway</h3>
                    <p className="text-slate-300 leading-relaxed">
                      The {post.product?.name} defines the standard for its
                      category in 2024. Its integration of AI-driven performance
                      and sustainable materials sets a high bar for competitors.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex flex-col items-center">
                    <div className="text-center mb-6">
                      <div className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">
                        Live Market Price
                      </div>
                      <div className="text-3xl font-black">
                        {post.product?.price}
                      </div>
                    </div>
                    <a
                      href={post.product?.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="w-full bg-blue-600 text-white text-center py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      SHOP AT AMAZON <LinkIcon size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Right Column: Sidebar / Recs */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24 space-y-10">
              {/* Related Articles */}
              <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Share2 size={18} className="text-blue-600" /> More from{" "}
                  {post.category}
                </h3>
                <div className="space-y-6">
                  {MOCK_POSTS.filter(
                    (p) => p.id !== post.id && p.category === post.category
                  )
                    .slice(0, 10)
                    .map((p) => (
                      <Link
                        key={p.id}
                        href={`/post/${p.slug}`}
                        className="flex gap-4 group"
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-100">
                          <img
                            src={p.featuredImage}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                            {p.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 block">
                            {p.date}
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              {/* DealFinder Side Box */}
              <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Tech Deal Finder
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Stay ahead of the curve. Get the most important tech updates
                  by the help of Ai.
                </p>
                <Link href="/deal">
                  <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg">
                    Find Best Deal
                  </button>
                </Link>
                <p className="text-[10px] text-slate-400 text-center italic mt-2">
                  Next-Gen Sourcing Intelligence
                </p>
              </div>

              <div className="border border-blue-100 bg-blue-50/50 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="text-blue-600" size={20} />
                  <span className="text-sm font-bold text-slate-900">
                    Affiliate Link Info
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {AFFILIATE_DISCLAIMER}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
