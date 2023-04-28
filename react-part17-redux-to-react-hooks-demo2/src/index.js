import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
// import { combineReducers, createStore } from "redux";
import productReducer from "./store/reducers/products";
import ProductsProvider from "./context/products-context";

// const rootReducer = combineReducers({
//   shop: productReducer,
// });

// const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Provider store={store}>
  //   <App />
  // </Provider>

  <ProductsProvider>
    <App />
  </ProductsProvider>
);
