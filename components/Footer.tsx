import React from "react";
import { Link } from "react-router-dom";
import {
  Monitor,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Mail,
} from "lucide-react";
import { SITE_NAME, AFFILIATE_DISCLAIMER } from "../constants";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1 rounded">
                <Monitor className="text-white" size={20} />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                SUYOOH<span className="text-blue-500">TECH</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Empowering US consumers with honest, data-driven technology
              reviews and expert buying advice since 2018. Your shortcut to
              better gadget choices.
            </p>
            <div className="flex space-x-4">
              <Twitter
                className="hover:text-white cursor-pointer transition-colors"
                size={20}
              />
              <Facebook
                className="hover:text-white cursor-pointer transition-colors"
                size={20}
              />
              <Instagram
                className="hover:text-white cursor-pointer transition-colors"
                size={20}
              />
              <Youtube
                className="hover:text-white cursor-pointer transition-colors"
                size={20}
              />
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Popular Categories</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/category/laptops"
                  className="hover:text-blue-400 transition-colors"
                >
                  Laptop Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/category/phones"
                  className="hover:text-blue-400 transition-colors"
                >
                  Smartphone Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/category/smart-home"
                  className="hover:text-blue-400 transition-colors"
                >
                  Smart Home Gear
                </Link>
              </li>
              <li>
                <Link
                  to="/category/gaming"
                  className="hover:text-blue-400 transition-colors"
                >
                  PC Gaming Hardware
                </Link>
              </li>
              <li>
                <Link
                  to="/category/deals"
                  className="hover:text-blue-400 transition-colors"
                >
                  Daily Tech Deals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Company</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  About TechVantage
                </Link>
              </li>
              <li>
                <Link
                  to="/editorial-standards"
                  className="hover:text-blue-400 transition-colors"
                >
                  Editorial Standards
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/affiliate-disclosure"
                  className="hover:text-blue-400 transition-colors"
                >
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Newsletter</h3>
            <p className="text-sm mb-4">
              Get the best tech news and deals delivered weekly.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  size={16}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800 border-none rounded-lg w-full pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-bold transition-colors">
                Subscribe Free
              </button>
            </form>
          </div>
        </div>

        <div className="text-xs text-slate-500 space-y-4">
          <p className="italic leading-relaxed">{AFFILIATE_DISCLAIMER}</p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-800 pt-8">
            <p>
              &copy; {new Date().getFullYear()} {SITE_NAME}. All rights
              reserved. Designed for US Consumers.
            </p>
            <div className="flex gap-6">
              <Link to="/sitemap" className="hover:text-slate-300">
                Sitemap
              </Link>
              <Link to="/contact" className="hover:text-slate-300">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
