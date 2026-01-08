import React from "react";
import { Post } from "@/types";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

interface BlogCardProps {
  post: Post;
  horizontal?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, horizontal = false }) => {
  if (horizontal) {
    return (
      <Link
        href={`/post/${post.slug}`}
        className="group flex flex-col sm:flex-row gap-6 bg-white p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all"
      >
        <div className="sm:w-2/5 aspect-[16/10] overflow-hidden rounded-xl">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="sm:w-3/5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {post.category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3 leading-snug">
            {post.title}
          </h3>
          <p className="text-slate-500 text-sm mb-4 line-clamp-2">
            {post.description}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300">
      <Link
        href={`/post/${post.slug}`}
        className="relative aspect-[16/9] overflow-hidden"
      >
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-slate-900/80 backdrop-blur px-2 py-1 rounded">
            {post.category}
          </span>
        </div>
        {post.product?.rating && post.product.rating >= 4.5 && (
          <div className="absolute bottom-4 left-4 bg-yellow-400 text-slate-900 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Star size={10} fill="currentColor" /> EDITORS CHOICE
          </div>
        )}
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
          <span>{post.date}</span>
        </div>
        <Link href={`/post/${post.slug}`} className="block">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3 leading-tight">
            {post.title}
          </h3>
        </Link>
        <p className="text-slate-500 text-sm mb-6 line-clamp-3">
          {post.description}
        </p>
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-end">
          <Link
            href={`/post/${post.slug}`}
            className="text-blue-600 hover:text-blue-700 font-bold text-xs flex items-center gap-1"
          >
            Read Review <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
