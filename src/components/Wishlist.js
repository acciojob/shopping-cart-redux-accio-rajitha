import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from './actions';

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Wishlist</h3>
      {wishlist.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <button onClick={() => dispatch(removeFromWishlist(item.id))}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
