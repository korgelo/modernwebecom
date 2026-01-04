import React, { useState } from "react";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Monitor,
  Headset,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { name: "Laptops", icon: <Monitor size={18} />, slug: "laptops" },
    {
      name: "Headset",
      icon: <Headset size={18} />,
      slug: "headset",
    },
    {
      name: "Smartwatch",
      icon: <Smartphone size={18} />,
      slug: "smartwatch",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Monitor className="text-white" size={24} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                SUYOOH<span className="text-blue-600">TECH</span>
                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded ml-1 font-bold text-slate-500 align-top uppercase tracking-widest">
                  BLOG
                </span>
              </span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              {categories.slice(0, 3).map((cat) => (
                <Link
                  key={cat.name}
                  to={`/category/${cat.slug}`}
                  className="text-slate-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              <div className="relative group flex items-center">
                <button className="text-slate-600 group-hover:text-blue-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                  More <ChevronDown size={14} className="ml-1" />
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block bg-white border border-slate-200 shadow-xl rounded-xl py-2 w-48 mt-0">
                  {categories.slice(3).map((cat) => (
                    <Link
                      key={cat.name}
                      to={`/category/${cat.slug}`}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <Link to="/deal">
              <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm">
                <Search size={16} />
                Search reviews
              </button>
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 pb-4">
          <div className="pt-2 pb-3 space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/category/${cat.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50"
              >
                {cat.icon}
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="px-4 mt-4">
            <Link to="/deal">
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
                Search reviews
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
