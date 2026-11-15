import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';
import CartItemCard from './CartItemCard';

const OrderSummary = () => {
  const { cart, cartTotal } = useShop();
  const totalItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="bg-white border rounded-2xl p-3 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b pb-3">
        <FiShoppingBag className="w-5 h-5 text-indigo-600 shrink-0" />
        {/* whitespace-nowrap ensures Order Summary stays on one single line */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 whitespace-nowrap">
          Order Summary ({totalItemsCount})
        </h3>
      </div>

      <div className="space-y-3">
        {cart.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">Ksh. {cartTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Courier Shipping</span>
          <span className="text-emerald-700 font-medium">Calculated at dispatch</span>
        </div>
        <div className="flex justify-between text-base sm:text-lg font-extrabold pt-2 border-t text-gray-900">
          <span>Total</span>
          <span className="text-indigo-600">Ksh. {cartTotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;