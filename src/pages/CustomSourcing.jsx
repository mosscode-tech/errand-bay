import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiSend, FiArrowLeft } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';

const CustomSourcing = () => {
  const { addToCart } = useShop();
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [targetBudget, setTargetBudget] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  
  const whatsappNumber = '254140333434'; 
  const whatsappMessage = encodeURIComponent(
    `Hello Errand Bay, I would like to request custom sourcing for: *${itemName || 'Custom Item'}*. Details: ${description}. Budget: Ksh. ${targetBudget}`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName || !contactInfo) return;

    // Optional: Add custom item as a provisional cart item or save request
    const customItem = {
      id: `custom-${Date.now()}`,
      name: `Custom Sourcing: ${itemName}`,
      category: 'Custom Request',
      sellingPrice: Number(targetBudget) || 0,
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&auto=format&fit=crop&q=60',
      description: description || 'Custom sourced item request.',
      qty: 1
    };

    addToCart(customItem);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-white border rounded-2xl p-8 shadow-xs space-y-4">
          <div className="text-4xl">✨</div>
          <h2 className="text-2xl font-extrabold text-gray-900">Request Submitted!</h2>
          <p className="text-sm text-gray-600">
            We have added your custom request to your cart and our sourcing team will review wholesale availability and contact you shortly.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/cart"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl text-sm transition"
            >
              Proceed to Checkout
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl text-sm transition inline-flex items-center justify-center gap-2"
            >
              <FiMessageSquare className="w-4 h-4" /> Chat on WhatsApp for Faster Quote
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-8">
      <div className="mb-6 space-y-2">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-indigo-600 hover:underline font-medium">
          <FiArrowLeft /> Back to Storefront
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Request Custom Sourcing</h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Can&apos;t find what you are looking for in our catalog? Tell us what item you need, and our sourcing team will track down the best wholesale supplier for you.
        </p>
      </div>

      <div className="bg-white border rounded-2xl p-5 sm:p-8 shadow-xs space-y-6">
        {/* Direct WhatsApp Action Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-emerald-900 text-sm">Want an instant quote right now?</h4>
            <p className="text-xs text-emerald-700">Chat directly with our sourcing agents on WhatsApp.</p>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition inline-flex items-center gap-2 shrink-0"
          >
            <FiMessageSquare className="w-4 h-4" /> Chat on WhatsApp
          </a>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-xs text-gray-400 uppercase tracking-wider font-semibold">Or submit request below</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Item Name / Title *</label>
            <input
              type="text"
              required
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Specific Gold Pendant or Imported Artifact"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Detailed Description & Specifications</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Include size, color, brand, or paste any reference links..."
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Target Budget (Ksh.)</label>
              <input
                type="number"
                value={targetBudget}
                onChange={(e) => setTargetBudget(e.target.value)}
                placeholder="e.g. 2500"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Your Phone / WhatsApp *</label>
              <input
                type="tel"
                required
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="07XXXXXXXX"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-extrabold py-3.5 rounded-xl shadow-md text-sm transition inline-flex items-center justify-center gap-2"
          >
            <FiSend className="w-4 h-4" /> Submit Sourcing Request & Proceed to Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomSourcing;