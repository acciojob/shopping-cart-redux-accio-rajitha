import React from 'react';
import Wishlist from '../components/Wishlist';

const WishlistPage = ({ wishlist, setWishlist }) => {
  return (
    <div>
      <h2>Your Wishlist</h2>
      <Wishlist wishlist={wishlist} setWishlist={setWishlist} />
    </div>
  );
};

export default WishlistPage;
