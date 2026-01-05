"use client";

import React, { useState } from 'react';
import { Search, Loader2, Zap } from 'lucide-react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-6 w-6 text-indigo-500 animate-spin" />
          ) : (
            <Search className="h-6 w-6 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
          placeholder="e.g. 'Biodegradable yoga mats' or 'Smart garden kits'"
          className="block w-full pl-16 pr-44 py-7 bg-white border-2 border-slate-100 rounded-[2rem] text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 shadow-2xl shadow-slate-200/50 transition-all text-xl font-medium"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-3 top-3 bottom-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:grayscale flex items-center shadow-lg shadow-indigo-200 active:scale-95"
        >
          {isLoading ? 'Scanning...' : (
            <>
              <Zap className="h-4 w-4 mr-2 fill-white" />
              Analyze
            </>
          )}
        </button>
      </form>
      <div className="mt-8 flex items-center justify-center space-x-8 opacity-40">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global Search</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Supplier Vetting</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Trend Verification</span>
      </div>
    </div>
  );
};
