import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';

const ProductCard = ({ product, onSelect }) => {
  const { addToCart, toggleFavourite, isFavourite } = useShop();
  const liked = isFavourite(product.id);

  return (
    <div
      onClick={() => onSelect(product)}
      className="bg-white rounded-lg sm:rounded-xl border overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer group"
    >
      <div className="h-36 sm:h-48 bg-gray-100 overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <span className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[10px] sm:text-xs px-1.5 py-0.5 rounded">
          {product.category}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite(product);
          }}
          aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
          className={`absolute top-1.5 right-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-xs transition-transform duration-150 active:scale-90 ${
            liked
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/90 hover:bg-white text-gray-500 hover:text-rose-500'
          }`}
        >
          <span className="text-sm sm:text-base leading-none">{liked ? '♥' : '♡'}</span>
        </button>
      </div>

      <div className="p-2.5 sm:p-4 flex flex-col flex-grow">
        <h4 className="font-semibold text-gray-800 text-xs sm:text-base mb-1 line-clamp-2">{product.name}</h4>
        <p className="text-[11px] text-gray-500 mb-2.5 line-clamp-2 hidden sm:block">{product.description}</p>

        <div className="mt-auto pt-2 border-t flex items-end justify-between">
          <div className="flex flex-col">
            {product.compareAtPrice && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through leading-tight">
                KES {product.compareAtPrice.toLocaleString()}
              </span>
            )}
            <span className="text-sm sm:text-base font-bold text-indigo-600 leading-tight">
              KES {product.sellingPrice.toLocaleString()}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            aria-label={`Add ${product.name} to cart`}
            title="Add to Cart"
            className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white p-2.5 rounded-lg transition flex items-center justify-center shrink-0 shadow-xs"
          >
            <FiShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;