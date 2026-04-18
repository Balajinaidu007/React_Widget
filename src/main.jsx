import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

let rootElement = document.getElementById("root");

// If root doesn't exist (widget case), create it
if (!rootElement) {
  rootElement = document.createElement("div");
  rootElement.id = "root";
  document.body.appendChild(rootElement);
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);