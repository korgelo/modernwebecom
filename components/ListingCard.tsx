
import React from 'react';
import { ProductListing } from '../types';

interface ListingCardProps {
  listing: ProductListing;
  onDelete: (id: string) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onDelete }) => {
  const priceString = listing.product.price;
  const numericPrice = parseFloat(priceString.replace(/[$,]/g, '')) || 0;
  const originalPrice = listing.originalPrice;
  const savings = originalPrice > numericPrice 
    ? Math.round(((originalPrice - numericPrice) / originalPrice) * 100)
    : null;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-2xl transition-all group relative">
      <div className="flex flex-col md:flex-row">
        {/* Product Image Section */}
        <div className="md:w-72 bg-slate-50 flex flex-col items-center justify-center p-8 border-r border-slate-100 relative">
          {listing.product.imageUrl ? (
            <img src={listing.product.imageUrl} alt={listing.title} className="max-h-48 object-contain rounded-xl drop-shadow-2xl" />
          ) : (
            <div className="text-slate-300 text-center uppercase font-black text-[10px] tracking-widest px-4 py-12 border-2 border-dashed border-slate-200 rounded-2xl">
              External Image URL Empty
            </div>
          )}
          
          <div className="mt-6 flex flex-col items-center gap-2 w-full">
             <div className="text-2xl font-black text-slate-900">{priceString}</div>
             {savings && savings > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  Save {savings}%
                </span>
             )}
          </div>
          
          <div className="absolute top-4 left-4 flex flex-col gap-2">
             <span className="bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                ASIN: {listing.id}
             </span>
             <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm text-center">
                {listing.date}
             </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-100">
                  {listing.category}
                </span>
                <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter">
                  /{listing.slug}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                {listing.title}
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                {listing.product.brand} • {listing.product.name}
              </p>
            </div>
            <button 
              onClick={() => onDelete(listing.internalId)}
              className="ml-4 p-2 text-slate-300 hover:text-rose-500 transition-all hover:bg-rose-50 rounded-full flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div className="mb-6 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Featured Image (Asset Path):</p>
            <code className="text-[10px] text-indigo-500 font-mono break-all">{listing.featuredImage}</code>
          </div>

          <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-2 italic font-medium">
            {listing.excerpt}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Pros & Cons */}
            <div className="space-y-4">
               <div>
                  <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">Pros</h4>
                  <ul className="space-y-1">
                    {listing.product.pros.slice(0, 3).map((pro, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <span className="text-emerald-500 font-bold">✓</span> {pro}
                      </li>
                    ))}
                  </ul>
               </div>
               <div>
                  <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mb-2">Cons</h4>
                  <ul className="space-y-1">
                    {listing.product.cons.slice(0, 2).map((con, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <span className="text-rose-400 font-bold">×</span> {con}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>

            {/* Specs Preview */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Technical Specs</h4>
               <ul className="space-y-2">
                  {listing.product.specs.slice(0, 4).map((spec, i) => (
                    <li key={i} className="text-[10px] text-slate-500 font-medium">
                      <span className="font-black text-slate-700 uppercase">{spec.label}:</span> {spec.value}
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-amber-400 font-bold">★</span>
                  <span className="text-sm font-black text-slate-800">{listing.product.rating}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{listing.reviews.toLocaleString()} Reviews</span>
             </div>
             <a 
              href={listing.product.amazonLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200"
            >
              Amazon Link
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
