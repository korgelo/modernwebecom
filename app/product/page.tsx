import React from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ArrowRight } from "lucide-react";
import ProductPagination from "@/components/ProductPagination";

const ProductPage = async () => {
  const allPosts = await getAllPosts();
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="pb-20">
      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Latest Feed */}
          <main>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                All product list
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
              </h2>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1 group"
              >
                Back to Home
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            <ProductPagination posts={sortedPosts} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
