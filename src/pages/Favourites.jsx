import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Favourites = () => {
  const { favourites, toggleFavourite, addToCart } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Saved Favourites ({favourites.length})</h2>
        <Link to="/" className="text-sm text-indigo-600 font-semibold hover:underline">
          &larr; Back to Shop
        </Link>
      </div>

      {favourites.length === 0 ? (
        <div className="bg-white border rounded-2xl p-10 text-center max-w-md mx-auto">
          <p className="text-gray-600 font-medium mb-2">No saved items yet.</p>
          <p className="text-xs text-gray-500 mb-5">Tap the heart icon on any product to save it for later.</p>
          <Link to="/" className="inline-block bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm">
            Explore Store
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[230px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {favourites.map((product) => (
            <div key={product.id} className="bg-white border rounded-xl overflow-hidden flex flex-col shadow-2xs">
              <div className="h-40 sm:h-48 bg-gray-100 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => toggleFavourite(product)}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white text-rose-600 w-8 h-8 rounded-full flex items-center justify-center shadow-xs text-sm"
                  title="Remove from favourites"
                >
                  ♥
                </button>
              </div>
              <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-800 text-xs sm:text-base mb-2 line-clamp-2">{product.name}</h3>
                <div className="mt-auto pt-2 border-t flex items-end justify-between">
                  <div className="flex flex-col">
                    {product.compareAtPrice && (
                      <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                        KES {product.compareAtPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-sm sm:text-base font-bold text-indigo-600">
                      KES {product.sellingPrice.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;