import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import { useState } from 'react';

const Storefront = ({ searchQuery, setSearchQuery }) => {
  const { products, loadingProducts } = useShop();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <HeroBanner />

      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-5">
          <h3 className="text-base sm:text-xl font-bold">Trending Products</h3>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm bg-white"
          />
        </div>

        {loadingProducts ? (
          <div className="text-center py-20 text-gray-500 text-sm">Loading catalog...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border p-6">
            <p className="text-gray-600 font-medium text-sm">No products found matching &quot;{searchQuery}&quot;.</p>
            <Link to="/sourcing" className="inline-block mt-2 text-indigo-600 font-semibold text-xs sm:text-sm hover:underline">
              Submit a custom sourcing request instead &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[300px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
            ))}
          </div>
        )}
      </main>

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};

export default Storefront;