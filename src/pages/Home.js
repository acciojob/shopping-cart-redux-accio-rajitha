import React, { useState } from 'react';
import ProductList from '../components/ProductList';

const Home = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  return (
    <div>
      <h2>Home</h2>
      <ProductList cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />
    </div>
  );
};

export default Home;
