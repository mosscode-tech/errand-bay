import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Account = () => {
  const { user, setUser, favourites } = useShop();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    // Placeholder until wired to PostgreSQL /api/auth
    setUser({
      name: name || email.split('@')[0],
      email,
      phone,
      location,
    });
  };

  if (user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <div className="bg-white border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase text-indigo-600">Registered Member</span>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email} {user.phone ? `• ${user.phone}` : ''}</p>
          </div>
          <button
            onClick={() => setUser(null)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-xl p-5">
            <h3 className="font-bold text-gray-900 mb-2">Order History</h3>
            <p className="text-sm text-gray-500">
              Your past orders and custom sourcing quotes will appear here once connected to your account database.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3 className="font-bold text-gray-900 mb-2">Saved Details & Favourites</h3>
            <p className="text-sm text-gray-600 mb-3">
              Default Delivery Location: <span className="font-medium">{user.location || 'Not set'}</span>
            </p>
            <Link to="/favourites" className="text-sm text-indigo-600 font-semibold hover:underline">
              View {favourites.length} Saved Favourites &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-2xs">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {isRegister ? 'Create an Account' : 'Sign In to My Account'}
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          Creating an account is <strong>optional</strong>—you can always shop as a guest, or sign in to save your delivery details and track orders.
        </p>

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0712 345 678"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Default County / Town</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Mombasa / Nairobi"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm transition"
          >
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t text-center space-y-2">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-indigo-600 font-semibold hover:underline"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register (Optional)"}
          </button>
          <div>
            <Link to="/" className="text-xs text-gray-500 hover:text-gray-800">
              Continue browsing as Guest &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;