import React, { useState, useEffect } from "react";
import { SearchInput } from "../components/SearchInput";
import { ProductCard } from "../components/ProductCard";
import { generateIntegratedMarketReport } from "../services/gemini";
import { AppView, SearchResult, SavedReport } from "../types";
import {
  AlertCircle,
  History,
  ArrowLeft,
  BarChart3,
  Globe2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function DealFinder() {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [report, setReport] = useState<SearchResult | null>(null);
  const [currentNiche, setCurrentNiche] = useState<string>("");
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("trendsource_saved");
    if (saved) {
      try {
        setSavedReports(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved reports");
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const saveReport = (data: SearchResult, niche: string) => {
    const newSaved: SavedReport = {
      id: `report-${Date.now()}`,
      niche,
      timestamp: Date.now(),
      data,
    };
    const updated = [newSaved, ...savedReports].slice(0, 10);
    setSavedReports(updated);
    localStorage.setItem("trendsource_saved", JSON.stringify(updated));
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setCurrentNiche(query);

    try {
      const result = await generateIntegratedMarketReport(query);
      setReport(result);
      saveReport(result, query);
      setView(AppView.RESULTS);
    } catch (err: any) {
      console.error(err);
      setError(
        "Market intelligence failed to generate. This usually happens if the search grounding is restricted or the niche is too broad. Please try another specific niche."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadSavedReport = (saved: SavedReport) => {
    setReport(saved.data);
    setCurrentNiche(saved.niche);
    setView(AppView.RESULTS);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd]">
      <div className="flex justify-center items-center gap-4 mt-16">
        <button
          onClick={() => setView(AppView.SAVED)}
          className={`flex items-center space-x-2 text-sm font-bold transition-colors ${
            view === AppView.SAVED
              ? "text-indigo-600"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <History className="h-6 w-6" />
          <span className="text-xl text-slate-400">History</span>
        </button>

        {view !== AppView.HOME && (
          <button
            onClick={() => setView(AppView.HOME)}
            className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors"
          >
            New Pulse
          </button>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {view === AppView.HOME ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-widest mb-6 animate-bounce">
                Next-Gen Sourcing Intelligence
              </div>
              <h2 className="text-5xl sm:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
                Find the product. <br />
                <span className="text-indigo-600">Identify the source.</span>
              </h2>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto">
                Real-time market analysis that doesn't just find products—it
                builds your entire supply chain report in seconds.
              </p>
            </div>

            <SearchInput onSearch={handleSearch} isLoading={loading} />

            {error && (
              <div className="mt-10 p-5 bg-red-50 border border-red-200 rounded-2xl flex items-start text-red-700 max-w-2xl w-full">
                <AlertCircle className="h-6 w-6 mr-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold mb-1">Intelligence Breach</p>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              </div>
            )}
          </div>
        ) : view === AppView.SAVED ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Recent Research
                </h2>
                <p className="text-slate-500 font-medium">
                  Your last 10 sourcing operations
                </p>
              </div>
              <History className="h-10 w-10 text-slate-200" />
            </div>

            <div className="space-y-4">
              {savedReports.length > 0 ? (
                savedReports.map((saved) => (
                  <button
                    key={saved.id}
                    onClick={() => loadSavedReport(saved)}
                    className="w-full bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all text-left group"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {saved.niche}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">
                          {new Date(saved.timestamp).toLocaleDateString()} at{" "}
                          {new Date(saved.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">
                            {saved.data.products.length}
                          </p>
                          <p className="text-[10px] text-slate-400 uppercase font-black">
                            Products
                          </p>
                        </div>
                        <ArrowLeft className="h-5 w-5 text-slate-300 group-hover:translate-x-1 transition-transform rotate-180" />
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold italic">
                    No history yet. Start a search to see it here.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button
              onClick={() => setView(AppView.HOME)}
              className="mb-8 flex items-center space-x-2 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Pulse</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar: Market Overview */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
                  <div className="flex items-center space-x-3 mb-6">
                    <BarChart3 className="h-6 w-6" />
                    <h3 className="text-lg font-black uppercase tracking-tighter">
                      Market Matrix
                    </h3>
                  </div>
                  <h2 className="text-3xl font-black mb-4 leading-none">
                    {report?.analysis.niche}
                  </h2>
                  <div className="prose prose-invert prose-sm max-w-none opacity-90 leading-relaxed mb-6">
                    <ReactMarkdown>{report?.analysis.overview}</ReactMarkdown>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest opacity-60">
                      Critical Trends
                    </h4>
                    <div className="space-y-2">
                      {report?.analysis.keyTrends.map((trend, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-3 bg-indigo-500/50 p-3 rounded-xl border border-white/10"
                        >
                          <span className="text-indigo-200 font-black text-xs mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-sm font-medium">{trend}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-8">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
                    Competitive Landscape
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    {report?.analysis.competitiveLandscape}
                  </p>
                </div>
              </div>

              {/* Main: Product Opportunities */}
              <div className="lg:col-span-2 space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Prime Opportunities
                  </h2>
                  <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {report?.products.length} Items Found
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {report?.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Sources Footer */}
                {report && report.sources.length > 0 && (
                  <div className="mt-12 pt-10 border-t border-slate-100">
                    <div className="flex items-center space-x-3 mb-6">
                      <Globe2 className="h-5 w-5 text-slate-400" />
                      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                        Grounding Intelligence
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {report.sources.map((source, idx) => (
                        <a
                          key={idx}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-white transition-all group"
                        >
                          <span className="text-[10px] font-black text-slate-300 group-hover:text-indigo-300">
                            {(idx + 1).toString().padStart(2, "0")}
                          </span>
                          <span className="text-xs font-bold text-slate-500 truncate group-hover:text-indigo-600">
                            {source.title}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
