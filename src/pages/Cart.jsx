import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock, FiArrowLeft, FiShoppingBag, FiCheckCircle } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import OrderSummary from '../components/cart/OrderSummary';
import DeliveryForm from '../components/cart/DeliveryForm';

const Cart = () => {
  const { cart, cartTotal, clearCart, user } = useShop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    county: '',
    town: '',
    courier: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.county || !formData.town) return;
    
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-white border rounded-2xl p-8 shadow-xs space-y-4">
          <FiCheckCircle className="w-14 h-14 text-emerald-600 mx-auto" />
          <h2 className="text-2xl font-extrabold text-gray-900">Order Placed Successfully!</h2>
          <p className="text-sm text-gray-600">
            Thank you, <span className="font-semibold">{formData.fullName}</span>. We are processing your order and will contact you via <span className="font-semibold">{formData.phone}</span> to coordinate countrywide dispatch.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl text-sm transition"
          >
            Back to Storefront
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-white border rounded-2xl p-8 shadow-xs space-y-4">
          <FiShoppingBag className="w-12 h-12 text-gray-400 mx-auto" />
          <p className="text-gray-600 font-medium">Your cart is currently empty.</p>
          <Link
            to="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition"
          >
            Explore Storefront
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-6">
      <div className="mb-6 space-y-2">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-indigo-600 hover:underline font-medium">
          <FiArrowLeft /> Back to Storefront
        </Link>
        {/* whitespace-nowrap ensures Secure Checkout fits on one single line */}
        <div className="flex items-center gap-2">
          <FiLock className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 shrink-0" />
          <h2 className="text-xl sm:text-3xl font-extrabold text-gray-900 tracking-tight whitespace-nowrap">
            Secure Checkout
          </h2>
        </div>
      </div>

      <form onSubmit={handleCheckout} className="space-y-6">
        {/* Order Summary at the Top */}
        <OrderSummary />

        {/* Delivery Form */}
        <DeliveryForm formData={formData} onChange={setFormData} />

        {/* Place Order Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm sm:text-base transition flex items-center justify-center gap-2"
        >
          <FiLock className="w-4 h-4" /> Place Order (Ksh. {cartTotal.toLocaleString()})
        </button>
      </form>
    </div>
  );
};

export default Cart;