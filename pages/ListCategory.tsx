import React from "react";
import { useParams } from "react-router-dom";
import { MOCK_POSTS } from "../constants";
import BlogCard from "../components/BlogCard";
import { Category } from "../types";
import { ArrowRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

// Map slugs to Category enum values
const slugToCategoryMap: Record<string, Category> = {
  "headset": Category.AUDIO_DEVICES,
  "laptops": Category.LAPTOP_PC,
  "phones": Category.SMARTPHONES,
  "smart-home": Category.SMART_HOME,
  "guides": Category.BUYING_GUIDES,
  "comparisons": Category.COMPARISONS,
  "how-to": Category.HOW_TO,
};

const ListCategory: React.FC = () => {
  const { cat } = useParams<{ cat: string }>();
  const category = cat ? slugToCategoryMap[cat] : undefined;
  const filteredPosts = category
    ? MOCK_POSTS.filter((post) => post.category === category)
    : MOCK_POSTS;
  return (
    <div className="pb-20">
      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Latest Feed */}
          <main>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                {category || "All Reviews"}{" "}
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
              </h2>
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1 group"
              >
                Back to Home{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <button className="w-full mt-12 py-4 border-2 border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all uppercase tracking-widest text-xs">
              Load More Content
            </button>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ListCategory;
