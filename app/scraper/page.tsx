"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { ProductListing, GenerationStatus, FormInputs } from '@/types';
import { scrapeAndGenerateListing, saveListing } from '@/services/geminiService';
import { ListingCard } from '@/components/ListingCard';

const INITIAL_FORM_STATE: FormInputs = {
  sourceLink: '',
  amazonLink: '',
  imageUrl: '',
};

const App: React.FC = () => {
  const [form, setForm] = useState<FormInputs>(INITIAL_FORM_STATE);
  const [listings, setListings] = useState<ProductListing[]>([]);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('affiliate_listings_v9');
    if (saved) {
      try {
        setListings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved listings", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('affiliate_listings_v9', JSON.stringify(listings));
  }, [listings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === GenerationStatus.LOADING) return;
    if (!form.sourceLink.includes('amazon.')) {
      setError("Please provide a valid Amazon product URL to scrape.");
      return;
    }

    setStatus(GenerationStatus.LOADING);
    setError(null);

    try {
      const scrapedData = await scrapeAndGenerateListing(form);
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

      const slug = scrapedData.slug || 'untitled-product';
      const featuredImage = `../../assets/images/posts/${slug}.jpg`;

      const newListing: ProductListing = {
        internalId: crypto.randomUUID(),
        id: scrapedData.id || 'N/A',
        slug: slug,
        title: scrapedData.title || 'Untitled Product',
        excerpt: scrapedData.excerpt || '',
        category: scrapedData.category || 'General',
        date: formattedDate,
        featuredImage: featuredImage,
        content: scrapedData.content || '',
        product: {
          name: scrapedData.product?.name || '',
          brand: scrapedData.product?.brand || '',
          price: scrapedData.product?.price || '$0.00',
          rating: scrapedData.product?.rating || 0,
          specs: scrapedData.product?.specs || [],
          pros: scrapedData.product?.pros || [],
          cons: scrapedData.product?.cons || [],
          amazonLink: form.amazonLink,
          imageUrl: form.imageUrl || ''
        },
        sourceLink: form.sourceLink,
        timestamp: Date.now(),
        originalPrice: scrapedData.originalPrice || 0,
        reviews: scrapedData.reviews || 0,
      };

      setListings(prev => [newListing, ...prev]);
      setStatus(GenerationStatus.SUCCESS);
      setForm(INITIAL_FORM_STATE);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to scrape data. Please check your API key.');
      setStatus(GenerationStatus.ERROR);
    }
  };

  const handleDelete = useCallback((id: string) => {
    setListings(prev => prev.filter(l => l.internalId !== id));
  }, []);

  const handleSave = async (listing: ProductListing) => {
    setIsSaving(prev => ({ ...prev, [listing.internalId]: true }));
    try {
      const savedListing = await saveListing(listing);
      setListings(prev =>
        prev.map(l =>
          l.internalId === listing.internalId ? { ...l, isSaved: true } : l
        )
      );
    } catch (err: any) {
      setError(err.message || "Failed to save listing.");
    } finally {
      setIsSaving(prev => ({ ...prev, [listing.internalId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-['Inter']">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100 rotate-3 transition-transform hover:rotate-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">SCRAPEX <span className="text-indigo-600">Pro</span></h1>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] -mt-1">Static Blog Pipeline</p>
            </div>
          </div>
          
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <section className="mb-20">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-10 py-12 text-center">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">AI Affiliate Scraper</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">Generate structured blog data with local asset paths automatically configured.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="px-10 pb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Amazon Source URL</label>
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
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Affiliate Redirect Link</label>
                  <input
                    type="url"
                    name="amazonLink"
                    value={form.amazonLink}
                    onChange={handleChange}
                    placeholder="https://amzn.to/..."
                    className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all text-slate-800 font-bold placeholder:text-slate-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3 mb-12">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">External Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="Paste direct product image URL..."
                  className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all text-slate-800 font-bold placeholder:text-slate-300"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={status === GenerationStatus.LOADING}
                  className="group relative bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-300 text-white px-20 py-6 rounded-[2rem] font-black text-xl transition-all shadow-2xl shadow-indigo-100 flex items-center gap-4 active:scale-95"
                >
                  {status === GenerationStatus.LOADING ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Extracting Product...
                    </>
                  ) : (
                    <>
                      Start Scraping
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="mt-10 p-6 bg-rose-50 border-2 border-rose-100 text-rose-600 text-[11px] font-black uppercase tracking-widest rounded-3xl flex items-center gap-4">
                  <span className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">!</span>
                  {error}
                </div>
              )}
            </form>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4 uppercase italic">
              Collection
              <span className="bg-slate-100 text-slate-400 text-sm font-black px-4 py-1.5 rounded-2xl not-italic">{listings.length}</span>
            </h2>
            <div className="h-0.5 flex-1 bg-slate-100 mx-10"></div>
          </div>

          {listings.length === 0 && status !== GenerationStatus.LOADING ? (
            <div className="text-center py-40 bg-white border border-slate-200 rounded-[3rem] shadow-sm">
              <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-slate-400 font-black text-xl uppercase tracking-[0.2em]">Ready for input</p>
            </div>
          ) : (
            <div className="space-y-12 pb-32">
              {listings.map(listing => (
                <ListingCard 
                  key={listing.internalId} 
                  listing={listing} 
                  onDelete={handleDelete}
                  onSave={handleSave}
                  isSaving={isSaving[listing.internalId] || false}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
