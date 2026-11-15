import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';

const ProductDetailModal = ({ product, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToCart, toggleFavourite, isFavourite } = useShop();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const liked = isFavourite(product.id);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-backdrop"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl relative animate-modal"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="h-64 sm:h-72 bg-gray-100 rounded-xl overflow-hidden border">
              <img
                src={product.images ? product.images[activeImageIndex] : product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-200"
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((imgUrl, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                      activeImageIndex === idx ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-xs uppercase font-semibold text-indigo-600 mb-1">{product.category}</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2 pr-6">{product.name}</h3>

            <div className="flex flex-col mb-4 bg-indigo-50 p-3 rounded-xl border border-indigo-100">
              {product.compareAtPrice && (
                <span className="text-xs text-gray-400 line-through">
                  Original Price: KES {product.compareAtPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xl font-black text-indigo-700">
                KES {product.sellingPrice.toLocaleString()}
              </span>
              <span className="text-[11px] text-emerald-700 font-medium mt-1">✓ In Stock & Available for Countrywide Delivery</span>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 mb-4">{product.description}</p>

            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Key Features</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-indigo-600 font-bold">•</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto pt-4 border-t flex gap-2.5">
              <button
                type="button"
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="flex-grow bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold py-3 rounded-xl shadow text-sm transition"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => toggleFavourite(product)}
                className={`px-4 py-3 rounded-xl border font-semibold text-sm transition flex items-center justify-center ${
                  liked
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                }`}
                title="Save to Favourites"
              >
                {liked ? '♥' : '♡'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;