"use client";
import React from 'react';
import { Post, temuPost } from "@/types";
import BlogCard from "@/components/BlogCard";

interface ProductPaginationProps {
  posts: (Post | temuPost)[];
}

const ProductPagination: React.FC<ProductPaginationProps> = ({ posts = [] }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 6;

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No products found.</p>
      </div>
    );
  }

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {currentPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-12 flex justify-center items-center gap-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border-2 border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-slate-500 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border-2 border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPagination;
