// App.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  increaseQuantity,
  decreaseQuantity,
  applyDiscount,
} from "./actions";
import { products } from "./products";
import "../styles/App.css";

const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [couponCode, setCouponCode] = useState("");

  const dispatch = useDispatch();
  const { cart, wishlist, discount } = useSelector((state) => state);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product));
  };

  const handleRemoveFromCart = (product) => dispatch(removeFromCart(product));
  const handleIncreaseQuantity = (product) => dispatch(increaseQuantity(product));
  const handleDecreaseQuantity = (product) => dispatch(decreaseQuantity(product));
  const handleAddToWishlist = (product) => dispatch(addToWishlist(product));
  const handleRemoveFromWishlist = (product) => dispatch(removeFromWishlist(product));

  const handleApplyDiscount = () => {
    if (couponCode === "SAVE10") {
      dispatch(applyDiscount(10));
    } else if (couponCode === "SAVE20") {
      dispatch(applyDiscount(20));
    } else {
      alert("Invalid coupon code!");
    }
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const finalTotal = calculateTotal() * ((100 - discount) / 100);

  return (
    <div className="app">
      <header className="header">
        <h1 className="app-title">Shopping Cart App</h1>
        <nav className="navbar">
          <button onClick={() => setCurrentView("home")} className="navbar-btn">
            Home
          </button>
          <button onClick={() => setCurrentView("cart")} className="navbar-btn">
            Cart
          </button>
          <button onClick={() => setCurrentView("wishlist")} className="navbar-btn">
            Wishlist
          </button>
        </nav>
      </header>

      {currentView === "home" && (
        <div className="product-list">
          <h2>Products</h2>
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="btn-add-cart"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleAddToWishlist(product)}
                className="btn-add-wishlist"
              >
                Add to Wishlist
              </button>
            </div>
          ))}
        </div>
      )}

      {currentView === "cart" && (
        <div className="cart">
          <h2>Shopping Cart</h2>
          {cart.length > 0 ? (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - ${item.price} - Quantity: {item.quantity}
                    <button onClick={() => handleIncreaseQuantity(item)}>
                      +
                    </button>
                    <button onClick={() => handleDecreaseQuantity(item)}>
                      -
                    </button>
                    <button onClick={() => handleRemoveFromCart(item)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div>
                <h3>Total: ${calculateTotal()}</h3>
                <h3>Discount Applied: {discount}%</h3>
                <h3>Final Total: ${finalTotal.toFixed(2)}</h3>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                />
                <button onClick={handleApplyDiscount}>Apply Discount</button>
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}

      {currentView === "wishlist" && (
        <div className="wishlist">
          <h2>Wishlist</h2>
          {wishlist.length > 0 ? (
            <ul>
              {wishlist.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price}
                  <button onClick={() => handleMoveToCart(item)}>
                    Move to Cart
                  </button>
                  <button onClick={() => handleRemoveFromWishlist(item)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
/*
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  increaseQuantity,
  decreaseQuantity,
  applyDiscount,
} from "./actions";
import { products } from "./products";
import "../styles/App.css";

const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [couponCode, setCouponCode] = useState("");

  const dispatch = useDispatch();
  const { cart, wishlist, discount } = useSelector((state) => state);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product));
  };

  const handleRemoveFromCart = (product) => dispatch(removeFromCart(product));
  const handleIncreaseQuantity = (product) => dispatch(increaseQuantity(product));
  const handleDecreaseQuantity = (product) => dispatch(decreaseQuantity(product));
  const handleAddToWishlist = (product) => dispatch(addToWishlist(product));
  const handleRemoveFromWishlist = (product) => dispatch(removeFromWishlist(product));

  const handleApplyDiscount = () => {
    if (couponCode === "SAVE10") {
      dispatch(applyDiscount(10));
    } else if (couponCode === "SAVE20") {
      dispatch(applyDiscount(20));
    } else {
      alert("Invalid coupon code!");
    }
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const finalTotal = calculateTotal() * ((100 - discount) / 100);

  return (
    <div className="app">
      <header>
        <h1>Shopping Cart App</h1>
        <nav>
          <button onClick={() => setCurrentView("home")}>Home</button>
          <button onClick={() => setCurrentView("cart")}>Cart</button>
          <button onClick={() => setCurrentView("wishlist")}>Wishlist</button>
        </nav>
      </header>

      {currentView === "home" && (
        <div className="product-list">
          <h2>Products</h2>
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              <button onClick={() => handleAddToWishlist(product)}>Add to Wishlist</button>
            </div>
          ))}
        </div>
      )}

      {currentView === "cart" && (
        <div className="cart">
          <h2>Shopping Cart</h2>
          {cart.length > 0 ? (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - ${item.price} - Quantity: {item.quantity}
                    <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                    <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                    <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                  </li>
                ))}
              </ul>
              <div>
                <h3>Total: ${calculateTotal()}</h3>
                <h3>Discount Applied: {discount}%</h3>
                <h3>Final Total: ${finalTotal.toFixed(2)}</h3>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                />
                <button onClick={handleApplyDiscount}>Apply Discount</button>
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}

      {currentView === "wishlist" && (
        <div className="wishlist">
          <h2>Wishlist</h2>
          {wishlist.length > 0 ? (
            <ul>
              {wishlist.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price}
                  <button onClick={() => handleMoveToCart(item)}>Move to Cart</button>
                  <button onClick={() => handleRemoveFromWishlist(item)}>Remove</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
/*
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  increaseQuantity,
  decreaseQuantity,
  applyDiscount,
} from "./actions";
import { products } from "./products";
import "../styles/App.css";

const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [couponCode, setCouponCode] = useState("");

  const dispatch = useDispatch();
  const { cart, wishlist, discount } = useSelector((state) => state);

  const handleAddToCart = (product) => dispatch(addToCart(product));
  const handleRemoveFromCart = (product) => dispatch(removeFromCart(product));
  const handleIncreaseQuantity = (product) => dispatch(increaseQuantity(product));
  const handleDecreaseQuantity = (product) => dispatch(decreaseQuantity(product));
  const handleAddToWishlist = (product) => dispatch(addToWishlist(product));
  const handleRemoveFromWishlist = (product) => dispatch(removeFromWishlist(product));
  const handleApplyDiscount = () => {
    if (couponCode === "SAVE10") {
      dispatch(applyDiscount(10));
    } else if (couponCode === "SAVE20") {
      dispatch(applyDiscount(20));
    } else {
      alert("Invalid coupon code!");
    }
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const finalTotal = calculateTotal() * ((100 - discount) / 100);

  return (
    <div className="app">
      <header>
        <h1>Shopping Cart App</h1>
        <nav>
          <button onClick={() => setCurrentView("home")}>Home</button>
          <button onClick={() => setCurrentView("cart")}>Cart</button>
          <button onClick={() => setCurrentView("wishlist")}>Wishlist</button>
        </nav>
      </header>

      {currentView === "home" && (
        <div className="product-list">
          <h2>Products</h2>
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              <button onClick={() => handleAddToWishlist(product)}>Add to Wishlist</button>
            </div>
          ))}
        </div>
      )}

      {currentView === "cart" && (
        <div className="cart">
          <h2>Shopping Cart</h2>
          {cart.length > 0 ? (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - ${item.price} - Quantity: {item.quantity}
                    <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                    <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                    <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                  </li>
                ))}
              </ul>
              <div>
                <h3>Total: ${calculateTotal()}</h3>
                <h3>Discount Applied: {discount}%</h3>
                <h3>Final Total: ${finalTotal.toFixed(2)}</h3>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                />
                <button onClick={handleApplyDiscount}>Apply Discount</button>
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}

      {currentView === "wishlist" && (
        <div className="wishlist">
          <h2>Wishlist</h2>
          {wishlist.length > 0 ? (
            <ul>
              {wishlist.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price}
                  <button onClick={() => handleAddToCart(item)}>Move to Cart</button>
                  <button onClick={() => handleRemoveFromWishlist(item)}>Remove</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
/*
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  increaseQuantity,
  decreaseQuantity,
  applyDiscount,
} from "./actions";
import { products } from "./products";

const App = () => {
  const dispatch = useDispatch();
  const { cart, wishlist, discount } = useSelector((state) => state);
  const [couponCode, setCouponCode] = useState("");

  const handleAddToCart = (product) => dispatch(addToCart(product));
  const handleRemoveFromCart = (product) => dispatch(removeFromCart(product));
  const handleIncreaseQuantity = (product) => dispatch(increaseQuantity(product));
  const handleDecreaseQuantity = (product) => dispatch(decreaseQuantity(product));
  const handleAddToWishlist = (product) => dispatch(addToWishlist(product));
  const handleRemoveFromWishlist = (product) => dispatch(removeFromWishlist(product));

  const handleApplyDiscount = () => {
    if (couponCode === "SAVE10") {
      dispatch(applyDiscount(10));
    } else if (couponCode === "SAVE20") {
      dispatch(applyDiscount(20));
    } else {
      alert("Invalid coupon code!");
    }
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const finalTotal = calculateTotal() * ((100 - discount) / 100);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button onClick={() => handleAddToWishlist(product)}>Add to Wishlist</button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} - Quantity: {item.quantity}
            <button onClick={() => handleIncreaseQuantity(item)}>+</button>
            <button onClick={() => handleDecreaseQuantity(item)}>-</button>
            <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Total: ${calculateTotal()}</h3>
      <h3>Discount Applied: {discount}%</h3>
      <h3>Final Total: ${finalTotal.toFixed(2)}</h3>

      <input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Enter coupon code"
      />
      <button onClick={handleApplyDiscount}>Apply Discount</button>

      <h2>Wishlist</h2>
      <ul>
        {wishlist.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemoveFromWishlist(item)}>Remove from Wishlist</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
/*


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, addToWishlist, removeFromWishlist, increaseQuantity, decreaseQuantity } from "./actions";
import { products } from "./products";  // Assuming products.js has the products list

const App = () => {
  const dispatch = useDispatch();
  const { cart, wishlist } = useSelector((state) => state);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(increaseQuantity(product));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity(product));
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const handleRemoveFromWishlist = (product) => {
    dispatch(removeFromWishlist(product));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      
      
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button onClick={() => handleAddToWishlist(product)}>Add to Wishlist</button>
          </div>
        ))}
      </div>

     
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} - Quantity: {item.quantity}
            <button onClick={() => handleIncreaseQuantity(item)}>+</button>
            <button onClick={() => handleDecreaseQuantity(item)}>-</button>
            <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>

      
      <h2>Wishlist</h2>
      <ul>
        {wishlist.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemoveFromWishlist(item)}>Remove from Wishlist</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
/*
// App.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, addToWishlist } from './actions';
import { products } from './products';  // Import products data
import '../styles/App.css'

const App = () => {
  const dispatch = useDispatch();

  // Handle adding to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Handle adding to wishlist
  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button onClick={() => handleAddToWishlist(product)}>Add to Wishlist</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
/*
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  addToWishlist,
  removeFromWishlist,
  applyDiscount,
} from "./actions";
import '../styles/App.css';

const App = () => {
  const { cart, wishlist, discount } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleApplyDiscount = (coupon) => {
    dispatch(applyDiscount(coupon));
  };

  return (
    <div className="shopping-cart">
      <h1>Shopping Cart</h1>
      <div className="cart">
        <h2>Cart</h2>
        {cart.map((product) => (
          <div key={product.id} className="cart-item">
            <span>{product.name}</span>
            <button onClick={() => handleRemoveFromCart(product.id)}>
              Remove
            </button>
            <button onClick={() => handleIncreaseQuantity(product.id)}>
              +
            </button>
            <span>Qty: {product.quantity}</span>
            <button onClick={() => handleDecreaseQuantity(product.id)}>
              -
            </button>
          </div>
        ))}
      </div>

      <div className="wishlist">
        <h2>Wishlist</h2>
        {wishlist.map((product) => (
          <div key={product.id} className="wishlist-item">
            <span>{product.name}</span>
            <button onClick={() => handleRemoveFromWishlist(product.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="discount">
        <h3>Apply Discount</h3>
        <button onClick={() => handleApplyDiscount(10)}>Apply 10% Off</button>
      </div>

      <div className="total">
        <h2>Total: {cart.reduce((acc, product) => acc + product.price * product.quantity, 0) * (1 - discount / 100)}</h2>
      </div>
    </div>
  );
};

export default App;
/*


import React from "react";
import './../styles/App.css';

const App = () => {
  return (
    <div>
       
    </div>
  )
}

export default App
*/