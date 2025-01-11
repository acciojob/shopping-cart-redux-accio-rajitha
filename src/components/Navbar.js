import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand text-center" href="/">
          Shopping Cart
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
/*
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Shopping App</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
      </div>
    </nav>
  );
};

export default Navbar;
*/