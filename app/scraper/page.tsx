import { addOrUpdateListing, getListings } from "./actions";
import { ScraperForm } from "@/components/ScraperForm";
import { ListingCard } from "@/components/ListingCard";
import { ProductListing } from "@/types";
import { NeonLogo } from "@/components/NeonLogo";

export const dynamic = "force-dynamic";

export default async function ScraperPage() {
  const listings = (await getListings()) as ProductListing[];

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-['Inter']">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100 rotate-3 transition-transform hover:rotate-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
                SCRAPEX <span className="text-indigo-600">Pro</span>
              </h1>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] -mt-1">
                Cloud Sync Enabled
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://neon.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#00e599] hover:brightness-110 text-slate-900 text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-emerald-50 active:scale-95"
            >
              <NeonLogo className="h-4" />
              Powered by Neon
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <section className="mb-20">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-10 py-12 text-center">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                AI Affiliate Scraper
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
                Generate structured blog data with local asset paths and
                optional Neon DB cloud sync.
              </p>
            </div>
            <ScraperForm addOrUpdateListing={addOrUpdateListing} />
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4 uppercase italic">
              Collection
              <span className="bg-slate-100 text-slate-400 text-sm font-black px-4 py-1.5 rounded-2xl not-italic">
                {listings.length}
              </span>
            </h2>
            <div className="h-0.5 flex-1 bg-slate-100 mx-10"></div>
          </div>
          {listings.length === 0 ? (
            <div className="text-center py-40 bg-white border border-slate-200 rounded-[3rem] shadow-sm">
              <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-slate-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <p className="text-slate-400 font-black text-xl uppercase tracking-[0.2em]">
                Ready for input
              </p>
            </div>
          ) : (
            <div className="space-y-12 pb-32">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
