import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, favourites, user } = useShop();
  const navigate = useNavigate();
  const navRef = useRef(null);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header ref={navRef} className="sticky top-0 z-50 bg-white border-b shadow-2xs">
        {/* Top Announcement Bar */}
        <div className="bg-indigo-900 text-indigo-100 text-[10px] sm:text-xs py-1.5 px-2 sm:px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 text-center sm:text-left">
            <p className="font-medium">
              Fast & Reliable <span className="underline font-semibold">Countrywide Delivery</span> Across Kenya
            </p>
            <div className="flex items-center gap-2 text-indigo-200">
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">About</Link>
              <span>•</span>
              <Link to="/sourcing" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Sourcing</Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2.5 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-1.5 shrink-0">
            <div className="bg-indigo-600 text-white font-black text-base px-2 py-0.5 rounded-lg tracking-wider">
              EB
            </div>
            <div className="hidden min-[270px]:block">
              <h1 className="text-sm sm:text-xl font-extrabold tracking-tight text-gray-900 leading-none">ERRAND BAY</h1>
              <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-widest text-indigo-600">Marketplace</span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-grow max-w-md mx-4">
            <input
              type="text"
              placeholder="Search products or categories..."
              value={searchQuery}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition"
            />
          </div>

          {/* Desktop Navigation Links & Icons */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">Shop</Link>
            <Link to="/sourcing" className="text-gray-700 hover:text-indigo-600 transition">Custom Sourcing</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition">About</Link>

            {/* Favourites Icon Button */}
            <Link
              to="/favourites"
              aria-label="Favourites"
              title="Favourites"
              className="relative p-2 text-gray-700 hover:text-rose-600 transition flex items-center justify-center"
            >
              <FiHeart className="w-5 h-5" />
              {favourites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {favourites.length}
                </span>
              )}
            </Link>

            {/* Cart Icon Button */}
            <Link
              to="/cart"
              aria-label="Cart"
              title="Cart"
              className="relative p-2 text-gray-700 hover:text-indigo-600 transition flex items-center justify-center"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/account"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              {user ? `Hi, ${user.name.split(' ')[0]}` : 'My Account'}
            </Link>
          </nav>

          {/* Mobile Icons & Menu Toggle */}
          <div className="flex md:hidden items-center gap-1.5">
            <Link
              to="/favourites"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Favourites"
              className="relative p-1.5 text-gray-700 hover:text-rose-600 transition"
            >
              <FiHeart className="w-5 h-5" />
              {favourites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favourites.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Cart"
              className="relative p-1.5 text-gray-700 hover:text-indigo-600 transition"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              aria-label="Toggle Menu"
            >
              <span className="text-lg inline-block transition-transform duration-200">
                {mobileMenuOpen ? '✕' : '☰'}
              </span>
            </button>
          </div>
        </div>

        {/* Smooth Slide-Down Mobile Dropdown Drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white ${
            mobileMenuOpen ? 'max-h-96 opacity-100 border-t shadow-lg' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-3 py-3 space-y-2.5">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <div className="flex flex-col space-y-1 text-xs font-medium">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded hover:bg-gray-100 transition">
                Shop
              </Link>
              <Link to="/sourcing" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded hover:bg-gray-100 transition">
                Custom Sourcing
              </Link>
              <Link to="/favourites" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded hover:bg-gray-100 transition flex items-center justify-between">
                <span>Favourites</span>
                <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">{favourites.length}</span>
              </Link>
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded hover:bg-gray-100 transition flex items-center justify-between">
                <span>Cart</span>
                <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">{cartCount}</span>
              </Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded hover:bg-gray-100 transition">
                About Errand Bay
              </Link>
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 rounded bg-indigo-50 text-indigo-700 font-semibold transition"
              >
                {user ? `My Account (${user.name})` : 'My Account (Optional)'}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Smooth Backdrop Overlay for Mobile Menu */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px] md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  );
};

export default Navbar;