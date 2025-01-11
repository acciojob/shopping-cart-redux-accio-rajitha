import React from 'react';
import Cart from '../components/Cart';

const CartPage = ({ cart, setCart }) => {
  return (
    <div>
      <h2>Your Cart</h2>
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
};

export default CartPage;
