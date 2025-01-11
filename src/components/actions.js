// actions/index.js

// Action to add product to cart
export const addToCart = (product) => {
    return {
      type: 'ADD_TO_CART',
      payload: { ...product, quantity: 1 },
    };
  };
  
  // Action to remove product from cart
  export const removeFromCart = (product) => {
    return {
      type: 'REMOVE_FROM_CART',
      payload: product,
    };
  };
  
  // Action to increase quantity of product in cart
  export const increaseQuantity = (product) => {
    return {
      type: 'INCREASE_QUANTITY',
      payload: product,
    };
  };
  
  // Action to decrease quantity of product in cart
  export const decreaseQuantity = (product) => {
    return {
      type: 'DECREASE_QUANTITY',
      payload: product,
    };
  };
  
  // Action to add product to wishlist
  export const addToWishlist = (product) => {
    return {
      type: 'ADD_TO_WISHLIST',
      payload: product,
    };
  };
  
  // Action to remove product from wishlist
  export const removeFromWishlist = (product) => {
    return {
      type: 'REMOVE_FROM_WISHLIST',
      payload: product,
    };
  };
  export const applyDiscount = (discount) => {
    return {
      type: "APPLY_DISCOUNT",
      payload: discount,
    };
  };
  