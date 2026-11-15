import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';

const CartItemCard = ({ item }) => {
  const { updateCartQty, removeFromCart } = useShop();

  return (
    <div className="relative bg-white border rounded-xl p-2.5 sm:p-4 flex items-center gap-2.5 sm:gap-4 shadow-2xs">
      {/* Top-Right Red Delete Icon Button */}
      <button
        type="button"
        onClick={() => removeFromCart(item.id)}
        aria-label={`Remove ${item.name}`}
        title="Remove item"
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50 transition"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>

      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border shrink-0 bg-gray-50"
      />

      {/* Details & Larger Quantity Controls */}
      <div className="flex-grow min-w-0 pr-7">
        <h4 className="font-semibold text-gray-900 text-xs sm:text-sm truncate pr-2">{item.name}</h4>
        <p className="text-[11px] sm:text-xs font-bold text-indigo-600 mt-0.5">
          Ksh. {item.sellingPrice.toLocaleString()}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={() => updateCartQty(item.id, -1)}
            aria-label="Reduce quantity"
            className="w-7 h-7 rounded-lg border bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold text-sm flex items-center justify-center transition shadow-2xs"
          >
            -
          </button>
          <span className="text-xs sm:text-sm font-semibold w-6 text-center">{item.qty}</span>
          <button
            type="button"
            onClick={() => updateCartQty(item.id, 1)}
            aria-label="Increase quantity"
            className="w-7 h-7 rounded-lg border bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold text-sm flex items-center justify-center transition shadow-2xs"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;