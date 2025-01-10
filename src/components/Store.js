// store.js
import { createStore } from 'redux';
import reducer from './cartReducer';

const Store = createStore(reducer);

export default Store;
