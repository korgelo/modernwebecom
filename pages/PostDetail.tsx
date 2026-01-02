import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_POSTS, AFFILIATE_DISCLAIMER } from "../constants";
import { AffiliateCTA, ComparisonTable } from "../components/ReviewUI";
import {
  Clock,
  Calendar,
  Share2,
  Bookmark,
  MessageSquare,
  ChevronRight,
  Facebook,
  Twitter,
  Link as LinkIcon,
} from "lucide-react";

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = MOCK_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      document.title = `${post.title} | TechVantage US`;
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Review Not Found</h1>
        <Link to="/" className="text-blue-600 hover:underline">
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
            <Link to="/" className="hover:text-blue-600">
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
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <Clock size={14} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Article Body */}
          <article className="lg:w-2/3">
            <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>

            {/* Social Share Floating Left (Simulated) */}
            <div className="flex lg:flex-col items-center gap-4 mb-8 lg:fixed lg:left-8 lg:top-1/3 z-10 lg:bg-white lg:p-4 lg:rounded-2xl lg:shadow-xl lg:border lg:border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase mb-2 hidden lg:block">
                Share
              </span>
              <button className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
                <Twitter size={20} />
              </button>
              <button className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors">
                <Facebook size={20} />
              </button>
              <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-600 hover:text-white transition-colors">
                <LinkIcon size={20} />
              </button>
              <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-600 hover:text-white transition-colors mt-4 hidden lg:block">
                <Bookmark size={20} />
              </button>
            </div>

            <div className="prose prose-slate lg:prose-xl max-w-none">
              <p className="text-xl leading-relaxed text-slate-600 font-medium mb-8">
                {post.excerpt}
              </p>

              <div className="bg-slate-50 border-l-4 border-blue-600 p-8 rounded-r-2xl mb-12 italic text-slate-700">
                "Our reviews are based on actual hands-on testing and data
                metrics. We don't just read specs; we use these products in the
                real world to see how they perform in your daily life."
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="rich-content space-y-6 text-slate-800 leading-loose"
              />

              {/* Primary Affiliate Card */}
              {post.product && (
                <>
                  <h2 className="text-2xl font-bold mt-12 mb-6">
                    Our Recommendation
                  </h2>
                  <AffiliateCTA product={post.product} type="primary" />
                </>
              )}

              {/* Comparison if available */}
              {post.product && post.compareWith && (
                <>
                  <h2 className="text-2xl font-bold mt-16 mb-6">
                    How they Stack Up
                  </h2>
                  <ComparisonTable
                    productA={post.product}
                    productB={post.compareWith}
                  />
                </>
              )}

              <h2 className="text-3xl font-bold mt-16 mb-8">Final Verdict</h2>
              <p className="text-lg text-slate-700 mb-8">
                If you are looking for the best performance in this category,
                the choice is clear. While there are cheaper alternatives, the
                longevity and support ecosystem make this investment worthwhile
                for most US consumers.
              </p>

              <div className="bg-blue-600 rounded-3xl p-10 text-white mt-16 relative overflow-hidden shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="md:w-1/2">
                    <div className="text-4xl font-black mb-4">9.5/10</div>
                    <h3 className="text-2xl font-bold mb-4">The Bottom Line</h3>
                    <p className="text-blue-100 leading-relaxed">
                      The {post.product?.name} is a triumph of engineering,
                      offering features that actually matter without the fluff
                      of standard marketing.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex flex-col items-center">
                    <div className="text-center mb-6">
                      <div className="text-sm font-bold uppercase tracking-widest text-blue-200 mb-2">
                        Check Today's Price
                      </div>
                      <div className="text-3xl font-black">
                        {post.product?.price}
                      </div>
                    </div>
                    <a
                      href={post.product?.amazonLink}
                      target="_blank"
                      rel="noopener"
                      className="w-full bg-white text-blue-600 text-center py-4 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-lg"
                    >
                      VIEW ON AMAZON
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
                  {MOCK_POSTS.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 10).map((p) => (
                    <Link
                      key={p.id}
                      to={`/post/${p.slug}`}
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

              {/* FAQ Box */}
              <div className="bg-slate-900 rounded-3xl p-8 text-white">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <MessageSquare size={18} className="text-blue-400" /> Quick
                  FAQ
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-blue-400 mb-2">
                      Is it worth the upgrade?
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Only if you're coming from a model 2+ years old.
                      Incremental yearly changes are minimal.
                    </p>
                  </div>
                  <div className="h-px bg-slate-800"></div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-400 mb-2">
                      What is the warranty?
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      In the US, standard 1-year limited warranty is included
                      with optional extended plans.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-blue-100 bg-blue-50/50 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="text-blue-600" size={20} />
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
};

const ShieldCheck = ({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default PostDetail;
