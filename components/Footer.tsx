import React from "react";
import Link from "next/link";
import { Monitor } from "lucide-react";

const Footer = () => {
  const siteName = "SuyoohTechBlog";
  const affiliateDisclaimer =
    "SuyoohTechBlog is supported by its audience. When you purchase through links on our site, we may earn an affiliate commission at no extra cost to you.";

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1 rounded">
                <Monitor className="text-white" size={20} />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                SUYOOH<span className="text-blue-500">TECH</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              We streamline the Amazon shopping experience by surfacing only the
              absolute highest-converting best-sellers.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Popular Categories</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="https://amzn.to/4s4F5Ns"
                  className="hover:text-blue-400 transition-colors"
                >
                  Electronic Storefront
                </Link>
              </li>
              <li>
                <Link
                  href="https://amzn.to/49rq4xT"
                  className="hover:text-blue-400 transition-colors"
                >
                  Computer Storefront
                </Link>
              </li>
              <li>
                <Link
                  href="https://amzn.to/4jauoow"
                  className="hover:text-blue-400 transition-colors"
                >
                  Lightning Deals
                </Link>
              </li>
              <li>
                <Link
                  href="https://amzn.to/4pO7XIl"
                  className="hover:text-blue-400 transition-colors"
                >
                  Today`s Deals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Compliance</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="https://www.amazon.com/privacyprefs"
                  className="hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.amazon.com/gp/help/customer/display.html"
                  className="hover:text-blue-400 transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.amazon.com/hz/contact-us/foresight/hubgateway"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.amazon.com/hz/contact-us/foresight/hubgateway"
                  className="hover:text-blue-400 transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-400 transition-colors"
                >
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Tech Deal Finder</h3>
            <p className="text-sm mb-4">Get the best tech updates and deals.</p>
            <Link href="/deal" className="hover:text-slate-300">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-bold transition-colors">
                Find Best Deal
              </button>
            </Link>
          </div>
        </div>

        <div className="text-xs text-slate-500 space-y-4">
          <p className="italic leading-relaxed">{affiliateDisclaimer}</p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-800 pt-8">
            <p>
              &copy; {new Date().getFullYear()} {siteName}. All rights
              reserved. Designed for US Consumers.
            </p>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-slate-300">
                Sitemap
              </Link>
              <Link href="/" className="hover:text-slate-300">
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
