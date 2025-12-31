import React from "react";
import { MOCK_POSTS, TRENDING_POSTS } from "../constants";
import BlogCard from "../components/BlogCard";
import { ArrowRight, Zap, TrendingUp, Award, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const featuredPost = MOCK_POSTS.find((p) => p.featured) || MOCK_POSTS[0];
  const latestPosts = MOCK_POSTS.slice(0, 6);

  return (
    <div className="pb-20">
      {/* Featured Hero Section */}
      <section className="relative bg-slate-900 py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 text-white">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-600/30">
                <Zap size={14} fill="currentColor" /> Featured Review
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                {featuredPost.title}
              </h1>
              <p className="text-slate-400 text-lg sm:text-xl mb-8 leading-relaxed max-w-xl">
                {featuredPost.excerpt}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/post/${featuredPost.slug}`}
                  className="bg-white text-slate-900 px-8 py-4 rounded-full font-extrabold text-sm hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Read Full Review
                </Link>
                <button className="bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-sm border border-slate-700 hover:bg-slate-700 transition-colors">
                  View Latest Deals
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-[16/10] rounded-3xl overflow-hidden border-8 border-slate-800 shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Quick stats floating bar */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-8 border border-slate-100 hidden sm:flex">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Editor Score
                  </span>
                  <span className="text-lg font-black text-slate-900">
                    9.4/10
                  </span>
                </div>
                <div className="w-px h-8 bg-slate-100"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Performance
                  </span>
                  <span className="text-lg font-black text-slate-900">
                    Elite
                  </span>
                </div>
                <div className="w-px h-8 bg-slate-100"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Value
                  </span>
                  <span className="text-lg font-black text-slate-900">
                    High
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending / Category Quick Nav */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2 flex-shrink-0">
              <TrendingUp size={16} className="text-rose-500" /> Trending Now:
            </span>
            {TRENDING_POSTS.map((cat) => (
              <Link
                to={`/tag/${cat.slug}`}
                key={cat.slug}
                className="whitespace-nowrap bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              >
                {cat.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Latest Feed */}
          <main className="lg:w-2/3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                Latest Reviews{" "}
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
              </h2>
              <Link
                to="/reviews"
                className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1 group"
              >
                View All{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {latestPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
              {/* Duplicate some posts for mock appearance */}
              {/* {MOCK_POSTS.map((post) => (
                <BlogCard key={`copy-${post.id}`} post={post} />
              ))} */}
            </div>

            <button className="w-full mt-12 py-4 border-2 border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all uppercase tracking-widest text-xs">
              Load More Content
            </button>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-12">
            {/* Top Picks Sidebar Box */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <Award
                className="absolute -top-4 -right-4 text-white/5"
                size={140}
              />
              <h3 className="text-xl font-bold mb-6 relative z-10 flex items-center gap-2">
                Best Sellers 2024
              </h3>
              <div className="space-y-6 relative z-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer">
                    <div className="w-16 h-16 bg-slate-800 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700">
                      <img
                        src={`https://picsum.photos/id/${100 + i}/200/200`}
                        alt="Product"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-blue-400 uppercase">
                        #0{i} Pick
                      </span>
                      <h4 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        Ultimate Workstation Pro {i}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <span className="text-white font-bold">$1,299</span>
                        <span className="flex items-center gap-0.5 text-yellow-500">
                          <Star size={10} fill="currentColor" /> 4.9
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/buying-guides"
                className="mt-8 block w-full bg-blue-600 text-center py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
              >
                See Best Recommendations
              </Link>
            </div>

            {/* Newsletter Side Box */}
            <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Tech Insights Daily
              </h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Stay ahead of the curve. Get the most important tech updates
                directly to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg">
                  Subscribe Now
                </button>
                <p className="text-[10px] text-slate-400 text-center italic mt-2">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </div>

            {/* Deal of the day */}
            <div className="border border-slate-200 rounded-3xl p-6 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900">Today's Best Deal</h3>
                <span className="text-[10px] font-black bg-rose-500 text-white px-2 py-0.5 rounded animate-pulse">
                  45% OFF
                </span>
              </div>
              <div className="aspect-square bg-slate-50 rounded-2xl mb-4 overflow-hidden">
                <img
                  src="https://picsum.photos/id/119/400/400"
                  alt="Deal"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">
                MacBook Air M3 (2024 Model)
              </h4>
              <p className="text-slate-500 text-xs mb-4 line-clamp-2">
                The ultimate everyday laptop. Thin, light, and faster than ever
                with the M3 chip.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-slate-400 text-xs line-through">
                    $1,099
                  </span>
                  <span className="text-xl font-black text-slate-900">
                    $899
                  </span>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-blue-700 transition-colors">
                  Get Deal
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;
