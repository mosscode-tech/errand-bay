import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="bg-white border rounded-2xl p-6 sm:p-10 shadow-2xs">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">About Errand Bay</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1 mb-4">
          Your Direct Link to Trusted Wholesalers Across Kenya
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
          Errand Bay is an online retail marketplace built to save you time and money. Instead of maintaining expensive physical showrooms that inflate retail prices, we partner directly with verified wholesale distributors and importers—sourcing your items fresh on demand and delivering them straight to your doorstep anywhere in Kenya.
        </p>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Looking for something not listed on our storefront? Our <strong>Custom Sourcing</strong> desk tracks down hard-to-find electronics, household goods, fashion, and specialty items on your behalf.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-5">
          <div className="text-2xl mb-2">🏷️</div>
          <h3 className="font-bold text-gray-900 mb-1">Fair Retail Pricing</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            By sourcing straight from vetted wholesalers without showroom overhead, we pass real savings on to you.
          </p>
        </div>
        <div className="bg-white border rounded-xl p-5">
          <div className="text-2xl mb-2">🔎</div>
          <h3 className="font-bold text-gray-900 mb-1">Custom Sourcing</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Submit any product request and we will locate the best supplier, verify quality, and quote you quickly.
          </p>
        </div>
        <div className="bg-white border rounded-xl p-5">
          <div className="text-2xl mb-2">🚚</div>
          <h3 className="font-bold text-gray-900 mb-1">Countrywide Delivery</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Same-day dispatch within Nairobi and reliable parcel delivery across all 47 counties.
          </p>
        </div>
      </div>

      <div className="bg-indigo-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold">Need us to source a specific product?</h3>
          <p className="text-indigo-200 text-xs sm:text-sm mt-1">Tell us what you need and our team will find it for you.</p>
        </div>
        <Link
          to="/sourcing"
          className="bg-white text-indigo-900 font-bold px-5 py-2.5 rounded-xl text-sm shrink-0 hover:bg-indigo-50 transition"
        >
          Request Custom Sourcing
        </Link>
      </div>
    </div>
  );
};

export default About;