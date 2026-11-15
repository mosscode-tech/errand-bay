import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white py-12 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <span className="inline-block bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          📦 Best Prices • Countrywide Delivery
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
          Quality Goods, Unbeatable Prices
        </h2>
        <p className="text-indigo-200 text-xs sm:text-base max-w-xl mx-auto mb-5">
          Sourced directly on demand from trusted wholesalers and delivered securely to your doorstep anywhere in Kenya.
        </p>
        <Link
          to="/sourcing"
          className="inline-block bg-white text-indigo-900 font-bold px-5 py-2.5 rounded-xl shadow hover:bg-indigo-50 transition text-xs sm:text-sm"
        >
          Can&apos;t find an item? Request Custom Sourcing
        </Link>
      </div>
    </section>
  );
};

export default HeroBanner;