// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './components/Store';  // Import your Redux store
import App from './components/App';  // Import your main App component

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
/*
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";



ReactDOM.render(<App />, document.getElementById("root"));
*/