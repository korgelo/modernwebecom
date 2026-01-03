import React, { useState } from "react";
import { AmzProduct } from "@/types";
import {
  TrendingUp,
  DollarSign,
  Factory,
  ChevronDown,
  ChevronUp,
  Star,
  Globe,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";

interface ProductCardProps {
  product: AmzProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showSuppliers, setShowSuppliers] = useState(false);

  const demandColors = {
    Low: "bg-slate-100 text-slate-600",
    Medium: "bg-blue-100 text-blue-700",
    High: "bg-orange-100 text-orange-700",
    Explosive: "bg-red-100 text-red-700",
  };

  /**
   * Editorial Keyword Injection Logic
   * Wraps 1–3 of the strongest intent words with an affiliate link.
   * Ensures the sentence remains natural and editorial.
   */
  const renderLinkedDescription = () => {
    if (!product.affiliateUrl) return product.description;

    const words = product.description.split(" ");
    // Identify high-intent chunks by looking for product name parts or benefit words
    const titleParts = product.name
      .toLowerCase()
      .split(" ")
      .filter((p) => p.length > 2);
    const benefitKeywords = [
      "perfect",
      "essential",
      "must-have",
      "versatile",
      "pro-grade",
      "high-performance",
      "reliable",
      "innovative",
    ];

    let linksAdded = 0;
    const maxLinks = 2; // Per rules: 1-3 strongest words

    const linkedContent = words.map((word, idx) => {
      const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, "");

      // We want to link the first occurrence of a title part or a benefit keyword
      const isTitlePart = titleParts.includes(cleanWord);
      const isBenefit = benefitKeywords.includes(cleanWord);

      if ((isTitlePart || isBenefit) && linksAdded < maxLinks) {
        linksAdded++;
        return (
          <React.Fragment key={idx}>
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-semibold border-b border-indigo-200 hover:border-indigo-600 transition-all cursor-pointer"
            >
              {word}
            </a>{" "}
          </React.Fragment>
        );
      }
      return word + " ";
    });

    return (
      <span className="text-slate-600 text-sm leading-relaxed">
        {linkedContent}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-indigo-200 transition-all">
      <div className="p-6 grow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-50 rounded-xl">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                demandColors[product.demandLevel]
              }`}
            >
              {product.demandLevel} Demand
            </span>
          </div>
          <span className="text-xs font-medium text-slate-400">
            {product.category}
          </span>
        </div>

        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/title block"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug group-hover/title:text-indigo-600 transition-colors">
            {product.name}
            <ExternalLink className="inline-block h-3 w-3 ml-2 opacity-0 group-hover/title:opacity-100 transition-opacity" />
          </h3>
        </a>

        <div className="mb-5">{renderLinkedDescription()}</div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-sm">
            <DollarSign className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="font-semibold text-slate-900">
              Target Price:{" "}
              <span className="font-normal text-slate-600">
                {product.targetPrice}
              </span>
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-800 uppercase text-[10px] tracking-widest">
                Market Hook
              </span>
            </div>
            <span className="text-slate-600 italic leading-relaxed">
              "{product.trendingReason}"
            </span>
          </div>
        </div>

        {/* Affiliate CTA */}
        {product.affiliateUrl && (
          <div className="mt-6">
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Find it on Amazon</span>
              <ExternalLink className="h-3 w-3 opacity-50" />
            </a>
            <p className="text-[9px] text-center text-slate-400 mt-2 font-medium uppercase tracking-tight">
              Search Result for "{product.name}"
            </p>
          </div>
        )}
      </div>

      {/* Supplier Section */}
      <div className="border-t border-slate-100 bg-white">
        <button
          onClick={() => setShowSuppliers(!showSuppliers)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Factory className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-semibold text-slate-700">
              {product.suppliers.length} Sourcing Partners
            </span>
          </div>
          {showSuppliers ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </button>

        {showSuppliers && (
          <div className="px-6 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            {product.suppliers.map((supplier, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition-all group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {supplier.name}
                  </h4>
                  <div className="flex items-center space-x-1 bg-white px-2 py-0.5 rounded border border-slate-200 text-[10px] font-bold">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    <span>{supplier.estimatedQualityScore}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Globe className="h-3 w-3" />
                    <span>{supplier.location}</span>
                  </div>
                  <div className="text-right">
                    <span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded text-[10px]">
                      {supplier.type}
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-slate-600">
                  <span className="font-semibold">Specialty:</span>{" "}
                  {supplier.specialty}
                </div>

                {supplier.url && (
                  <a
                    href={supplier.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block text-center text-[11px] font-bold text-indigo-600 hover:text-indigo-700 py-1.5 border border-indigo-100 rounded-lg hover:bg-indigo-50 transition-all"
                  >
                    View Supplier Profile
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
