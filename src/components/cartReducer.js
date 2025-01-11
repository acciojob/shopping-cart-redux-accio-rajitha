// reducers/index.js
// reducers/index.js
// Action to add product to cart
export const applyDiscount = (discount) => {
  return {
    type: "APPLY_DISCOUNT",
    payload: discount,
  };
};

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
  };                                                      const initialState = {
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