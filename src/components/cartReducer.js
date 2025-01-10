// reducers/index.js
// reducers/index.js
const initialState = {
    cart: [],
    wishlist: [],
    discount: 0, // Discount percentage
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        return { ...state, cart: [...state.cart, action.payload] };
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
      case "INCREASE_QUANTITY":
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      case "DECREASE_QUANTITY":
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      case "ADD_TO_WISHLIST":
        return { ...state, wishlist: [...state.wishlist, action.payload] };
      case "REMOVE_FROM_WISHLIST":
        return {
          ...state,
          wishlist: state.wishlist.filter((item) => item.id !== action.payload.id),
        };
      case "APPLY_DISCOUNT":
        return { ...state, discount: action.payload };
      default:
        return state;
    }
  };
  
  export default cartReducer;
/*  
const initialState = {
    cart: [],
    wishlist: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return { ...state, cart: [...state.cart, action.payload] };
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
      case 'INCREASE_QUANTITY':
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      case 'DECREASE_QUANTITY':
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      case 'ADD_TO_WISHLIST':
        return { ...state, wishlist: [...state.wishlist, action.payload] };
      case 'REMOVE_FROM_WISHLIST':
        return {
          ...state,
          wishlist: state.wishlist.filter((item) => item.id !== action.payload.id),
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
/*  
const initialState = {
    cart: [],
    wishlist: [],
    discount: 0,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return { ...state, cart: [...state.cart, action.payload] };
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cart: state.cart.filter((product) => product.id !== action.payload),
        };
      case 'INCREASE_QUANTITY':
        return {
          ...state,
          cart: state.cart.map((product) =>
            product.id === action.payload
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      case 'DECREASE_QUANTITY':
        return {
          ...state,
          cart: state.cart.map((product) =>
            product.id === action.payload && product.quantity > 1
              ? { ...product, quantity: product.quantity - 1 }
              : product
          ),
        };
      case 'ADD_TO_WISHLIST':
        return { ...state, wishlist: [...state.wishlist, action.payload] };
      case 'REMOVE_FROM_WISHLIST':
        return {
          ...state,
          wishlist: state.wishlist.filter(
            (product) => product.id !== action.payload
          ),
        };
      case 'APPLY_DISCOUNT':
        return { ...state, discount: action.payload };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  */