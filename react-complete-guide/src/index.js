import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // createRoot forms the entry point of the react application.
root.render(<App />); // The application is injected in the div with id root in index.html.
