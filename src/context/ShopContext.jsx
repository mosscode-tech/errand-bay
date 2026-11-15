import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Global Product Cache
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('eb_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('eb_favs');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eb_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Fetch products ONCE when the app mounts
  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch((err) => {
        console.error('Failed to load catalog:', err);
        setLoadingProducts(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('eb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('eb_favs', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    if (user) localStorage.setItem('eb_user', JSON.stringify(user));
    else localStorage.removeItem('eb_user');
  }, [user]);

  // Cart Actions
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // Favourite Actions
  const toggleFavourite = (product) => {
    setFavourites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      return exists ? prev.filter((item) => item.id !== product.id) : [...prev, product];
    });
  };

  const isFavourite = (id) => favourites.some((item) => item.id === id);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.sellingPrice * item.qty, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        loadingProducts,
        cart,
        cartCount,
        cartTotal,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        favourites,
        toggleFavourite,
        isFavourite,
        user,
        setUser,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);