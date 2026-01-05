"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MOCK_POSTS } from "@/constants";
import BlogCard from "@/components/BlogCard";
import { Category } from "@/types";
import { ArrowRight } from "lucide-react";

// Map slugs to Category enum values
const slugToCategoryMap: Record<string, Category> = {
  "audio-devices": Category.AUDIO_DEVICES,
  "laptop-pc": Category.LAPTOP_PC,
  smartwatch: Category.SMARTWATCH,
};

// Map slugs to human-friendly names
const slugToDisplayName: Record<string, string> = {
  "audio-devices": "Headset",
  "laptop-pc": "Laptops",
  smartwatch: "Smartwatch",
};

export default function ListCategory() {
  const params = useParams();
  const cat = params.cat as string;

  // Scroll to top on category change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cat]);

  // Try to match by slug map first, then by direct category value
  const category = cat
    ? slugToCategoryMap[cat] || (Object.values(Category).includes(cat as Category) ? cat as Category : undefined)
    : undefined;

  const displayName = cat
    ? slugToDisplayName[cat] ?? (category ? cat : "All Reviews")
    : "All Reviews";

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
                {displayName}{" "}
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
              </h2>
              <Link
                href="/"
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
}
