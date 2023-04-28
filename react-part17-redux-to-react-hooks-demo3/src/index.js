import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
// import { combineReducers, createStore } from "redux";
import productReducer from "./store/reducers/products";
import configureStore from "./hooks-store/products-store";

// const rootReducer = combineReducers({
//   shop: productReducer,
// });

// const store = createStore(rootReducer);

configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
