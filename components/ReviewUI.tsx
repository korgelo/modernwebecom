
import React from 'react';
import { Product, ProductSpec } from '@/types';
import { ShoppingCart, Check, X, Star, ExternalLink, ShieldCheck } from 'lucide-react';

export const AffiliateCTA: React.FC<{ product: Product, type?: 'primary' | 'secondary' }> = ({ product, type = 'primary' }) => {
  return (
    <div className={`p-6 rounded-2xl border-2 ${type === 'primary' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white'} shadow-sm my-8`}>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-32 h-32 flex-shrink-0 bg-white p-2 rounded-xl border border-slate-100">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
        </div>
        <div className="flex-grow text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
             <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{product.brand}</span>
             <div className="flex items-center text-yellow-500">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
               ))}
               <span className="ml-2 text-slate-500 text-xs font-bold">{product.rating}/5</span>
             </div>
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h4>
          <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
             {product.specs.slice(0, 2).map(s => (
               <span key={s.label} className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200">{s.label}: {s.value}</span>
             ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
             <div className="text-2xl font-black text-slate-900">{product.price}</div>
             <a 
               href={product.amazonLink} 
               target="_blank" 
               rel="noopener noreferrer sponsored"
               className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1"
             >
               <ShoppingCart size={18} /> Check Price on Amazon
             </a>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-blue-100 pt-6">
        <div>
          <h5 className="text-xs font-bold uppercase text-emerald-600 mb-3 flex items-center gap-1"><Check size={14}/> Pros</h5>
          <ul className="space-y-2">
            {product.pros.map(p => <li key={p} className="text-sm text-slate-600 flex gap-2"><span>•</span> {p}</li>)}
          </ul>
        </div>
        <div>
          <h5 className="text-xs font-bold uppercase text-rose-600 mb-3 flex items-center gap-1"><X size={14}/> Cons</h5>
          <ul className="space-y-2">
            {product.cons.map(c => <li key={c} className="text-sm text-slate-600 flex gap-2"><span>•</span> {c}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const ComparisonTable: React.FC<{ productA: Product, productB: Product }> = ({ productA, productB }) => {
  const allSpecs = Array.from(new Set([
    ...productA.specs.map(s => s.label),
    ...productB.specs.map(s => s.label)
  ]));

  const getValue = (specs: ProductSpec[], label: string) => specs.find(s => s.label === label)?.value || '-';

  return (
    <div className="my-10 overflow-hidden border border-slate-200 rounded-2xl shadow-sm bg-white">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <ShieldCheck className="text-blue-600" size={18} />
        <h3 className="font-bold text-slate-800 text-sm">Side-by-Side Comparison</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 bg-white border-b border-r border-slate-100 w-1/3 text-slate-400 text-[10px] uppercase font-bold tracking-widest">Specification</th>
              <th className="p-4 bg-white border-b border-slate-100 w-1/3">
                <span className="text-[10px] font-bold text-blue-600 block mb-1 uppercase">{productA.brand}</span>
                <span className="font-bold text-slate-900 text-sm">{productA.name}</span>
              </th>
              <th className="p-4 bg-white border-b border-slate-100 w-1/3">
                <span className="text-[10px] font-bold text-blue-600 block mb-1 uppercase">{productB.brand}</span>
                <span className="font-bold text-slate-900 text-sm">{productB.name}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {allSpecs.map((label, idx) => (
              <tr key={label} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                <td className="p-4 border-r border-slate-100 text-sm font-semibold text-slate-600">{label}</td>
                <td className="p-4 text-sm text-slate-800">{getValue(productA.specs, label)}</td>
                <td className="p-4 text-sm text-slate-800">{getValue(productB.specs, label)}</td>
              </tr>
            ))}
            <tr className="bg-slate-50 font-bold">
               <td className="p-4 border-r border-slate-100 text-sm">Price</td>
               <td className="p-4 text-sm text-blue-600">{productA.price}</td>
               <td className="p-4 text-sm text-blue-600">{productB.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-50 flex flex-col sm:flex-row gap-4">
        <a href={productA.amazonLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white border border-slate-200 text-slate-800 text-center py-2.5 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
          View {productA.name} <ExternalLink size={14} />
        </a>
        <a href={productB.amazonLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white border border-slate-200 text-slate-800 text-center py-2.5 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
          View {productB.name} <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};
