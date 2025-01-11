// App.js
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
      <header className="app-header">
        <h1 className="app-title">Shopping Cart App</h1>
        <nav className="app-nav">
          <button onClick={() => setCurrentView("home")} className="nav-btn">Home</button>
          <button onClick={() => setCurrentView("cart")} className="nav-btn">Cart</button>
          <button onClick={() => setCurrentView("wishlist")} className="nav-btn">Wishlist</button>
        </nav>
      </header>

      {currentView === "home" && (
        <div className="product-list">
          <h2 className="product-list-title">Products</h2>
          <div className="cards">
            {products.map((product) => (
              <div key={product.id} className="product-card custom-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <button
                  className="btn btn-primary add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-secondary add-to-wishlist-btn"
                  onClick={() => handleAddToWishlist(product)}
                >
                  Add to Wishlist
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === "cart" && (
        <div className="cart">
          <h2 className="cart-title">Shopping Cart</h2>
          {cart.length > 0 ? (
            <>
              <ul className="cart-items">
                {cart.map((item) => (
                  <li key={item.id} className="custom-card card cart-item">
                    <div className="card-body">
                      {item.name} - ${item.price} - Quantity: {item.quantity}
                      <button
                        className="btn btn-primary increase-quantity-btn"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-primary decrease-quantity-btn"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-danger remove-from-cart-btn"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <h3>Total: ${calculateTotal()}</h3>
                <h3>Discount Applied: {discount}%</h3>
                <h3>Final Total: ${finalTotal.toFixed(2)}</h3>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="coupon-input"
                />
                <button onClick={handleApplyDiscount} className="btn btn-primary apply-discount-btn">
                  Apply Discount
                </button>
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}

      {currentView === "wishlist" && (
        <div className="wishlist">
          <h2 className="wishlist-title">Wishlist</h2>
          {wishlist.length > 0 ? (
            <ul className="wishlist-items">
              {wishlist.map((item) => (
                <li key={item.id} className="custom-card card wishlist-item">
                  <div className="card-body">
                    {item.name} - ${item.price}
                    <button
                      className="btn btn-primary move-to-cart-btn"
                      onClick={() => handleMoveToCart(item)}
                    >
                      Move to Cart
                    </button>
                    <button
                      className="btn btn-danger remove-from-wishlist-btn"
                      onClick={() => handleRemoveFromWishlist(item)}
                    >
                      Remove
                    </button>
                  </div>
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
      <header  style={{backgroundColor:'black' , color:'white', padding:'20px', position:'sticky', top:'0px', marginBottom:'10px'}}>
        <h1>Shopping Cart App</h1>
        <nav>
          <button onClick={() => setCurrentView("home")}>Home</button>
          <button onClick={() => setCurrentView("cart")}>Cart</button>
          <button onClick={() => setCurrentView("wishlist")}>Wishlist</button>
        </nav>
      </header>

      {currentView === "home" && (
        
        <div className="product-list">
          <div>
          <h2>Products</h2>
          </div>
          <div className="cards">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleAddToWishlist(product)}
              >
                Add to Wishlist
              </button>
            </div>
          ))}
          </div>
        </div>
      )}
  
      {currentView === "cart" && (
        <div className="cart">
          <h2>Shopping Cart</h2>
          {cart.length > 0 ? (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="custom-card card">
                    <div className="card-body">
                      {item.name} - ${item.price} - Quantity: {item.quantity}
                      <button
                        className="btn btn-primary"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
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
                <li key={item.id} className="custom-card card">
                  <div className="card-body">
                    {item.name} - ${item.price}
                    <button
                      className="btn btn-primary"
                      onClick={() => handleMoveToCart(item)}
                    >
                      Move to Cart
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromWishlist(item)}
                    >
                      Remove
                    </button>
                  </div>
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
*/