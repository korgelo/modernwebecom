"use client";
import React, { useState } from "react";
import { ProductListing, GenerationStatus, FormInputs } from "@/types";
import { scrapeAndGenerateListing } from "@/services/geminiService";

const INITIAL_FORM_STATE: FormInputs = {
  sourceLink: "",
  amazonLink: "",
  imageUrl: "",
};

export const ScraperForm = ({
  addOrUpdateListing,
}: {
  addOrUpdateListing: (listing: ProductListing) => Promise<any>;
}) => {
  const [form, setForm] = useState<FormInputs>(INITIAL_FORM_STATE);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === GenerationStatus.LOADING) return;
    if (!form.sourceLink.includes("amazon.")) {
      setError("Please provide a valid Amazon product URL to scrape.");
      return;
    }

    setStatus(GenerationStatus.LOADING);
    setError(null);

    try {
      const scrapedData = await scrapeAndGenerateListing(form);
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const slug = scrapedData.slug || "untitled-product";
      const featuredImage = `../../assets/images/posts/${slug}.jpg`;

      const newListing: ProductListing = {
        internalId: crypto.randomUUID(),
        id: scrapedData.id || "N/A",
        slug: slug,
        title: scrapedData.title || "Untitled Product",
        excerpt: scrapedData.excerpt || "",
        category: scrapedData.category || "General",
        date: formattedDate,
        featuredImage: featuredImage,
        content: scrapedData.content || "",
        product: {
          name: scrapedData.product?.name || "",
          brand: scrapedData.product?.brand || "",
          price: scrapedData.product?.price || "$0.00",
          rating: scrapedData.product?.rating || 0,
          specs: scrapedData.product?.specs || [],
          pros: scrapedData.product?.pros || [],
          cons: scrapedData.product?.cons || [],
          amazonLink: form.amazonLink,
          imageUrl: form.imageUrl || "",
        },
        sourceLink: form.sourceLink,
        timestamp: Date.now(),
        originalPrice: scrapedData.originalPrice || 0,
        reviews: scrapedData.reviews || 0,
      };

      await addOrUpdateListing(newListing);
      setStatus(GenerationStatus.SUCCESS);
      setForm(INITIAL_FORM_STATE);
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || "Failed to scrape data. Please check your API key."
      );
      setStatus(GenerationStatus.ERROR);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-10 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="space-y-3">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Amazon Source URL
          </label>
          <input
            type="url"
            name="sourceLink"
            value={form.sourceLink}
            onChange={handleChange}
            placeholder="https://www.amazon.com/dp/B0..."
            className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all text-slate-800 font-bold placeholder:text-slate-300"
            required
          />
        </div>
        <div className="space-y-3">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Affiliate Redirect Link
          </label>
          <input
            type="url"
            name="amazonLink"
            value={form.amazonLink}
            onChange={handleChange}
            placeholder="https://amzn.to/"
            className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all text-slate-800 font-bold placeholder:text-slate-300"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1">
        <div className="space-y-3">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
            External Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Paste direct product image URL..."
            className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all text-slate-800 font-bold placeholder:text-slate-300"
          />
        </div>
      </div>

      <div className="flex justify-center pt-12">
        <button
          type="submit"
          disabled={status === GenerationStatus.LOADING}
          className="group relative bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-300 text-white px-20 py-6 rounded-[2rem] font-black text-xl transition-all shadow-2xl shadow-indigo-100 flex items-center gap-4 active:scale-95"
        >
          {status === GenerationStatus.LOADING ? (
            <>
              <svg
                className="animate-spin h-6 w-6 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Extracting Product...
            </>
          ) : (
            <>
              Start Scraping
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 group-hover:translate-x-2 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-10 p-6 bg-rose-50 border-2 border-rose-100 text-rose-600 text-[11px] font-black uppercase tracking-widest rounded-3xl flex items-center gap-4">
          <span className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
            !
          </span>
          {error}
        </div>
      )}
    </form>
  );
};
