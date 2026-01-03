import React from 'react';
import { X, ExternalLink, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { SupplierReport } from '../types';

interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: SupplierReport | null;
  isLoading: boolean;
  productName: string;
}

export const SupplierModal: React.FC<SupplierModalProps> = ({ 
  isOpen, 
  onClose, 
  report, 
  isLoading,
  productName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-bold text-slate-900" id="modal-title">
                Sourcing Report: <span className="text-indigo-600">{productName}</span>
              </h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-500 focus:outline-none">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-slate-50 px-4 py-6 sm:p-6 max-h-[70vh] overflow-y-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-4 border-slate-200"></div>
                  <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
                </div>
                <p className="text-slate-600 font-medium">Scouring global databases for suppliers...</p>
                <p className="text-slate-400 text-sm">This typically takes 10-15 seconds.</p>
              </div>
            ) : report ? (
              <div className="space-y-6">
                <div className="prose prose-slate prose-sm max-w-none">
                  <ReactMarkdown 
                     components={{
                        a: ({node, ...props}) => <a {...props} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer" />,
                        h1: ({node, ...props}) => <h1 {...props} className="text-xl font-bold text-slate-900 mt-6 mb-4" />,
                        h2: ({node, ...props}) => <h2 {...props} className="text-lg font-bold text-slate-900 mt-5 mb-3" />,
                        h3: ({node, ...props}) => <h3 {...props} className="text-md font-bold text-slate-900 mt-4 mb-2" />,
                        ul: ({node, ...props}) => <ul {...props} className="list-disc pl-5 space-y-1 my-2" />,
                     }}
                  >
                    {report.content}
                  </ReactMarkdown>
                </div>

                {report.sources.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      Verified Sources
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {report.sources.map((source, idx) => (
                        <a 
                          key={idx}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
                        >
                          <Globe className="h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
                          <span className="text-sm text-slate-600 truncate group-hover:text-slate-900">
                            {source.title}
                          </span>
                          <ExternalLink className="h-3 w-3 text-slate-300 group-hover:text-indigo-400 ml-auto" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                Failed to load supplier data. Please try again.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-slate-100">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
