import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Storefront from './pages/Storefront';
import CustomSourcing from './pages/CustomSourcing';
import Cart from './pages/Cart';
import Favourites from './pages/Favourites';
import About from './pages/About';
import Account from './pages/Account';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ShopProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
          <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Storefront searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
              <Route path="/sourcing" element={<CustomSourcing />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/about" element={<About />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ShopProvider>
  );
};

export default App;