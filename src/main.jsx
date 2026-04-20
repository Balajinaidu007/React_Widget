import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/**
 * Get or create root container safely
 */
function getContainer() {
  let container = document.getElementById("root");

  if (!container) {
    container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);
  }

  return container;
}

/**
 * Safe React mount (prevents duplicate roots)
 */
function mountReact() {
  const container = getContainer();

  // 🔥 recreate root if container changed or emptied
  if (
    !window.__VERTEX_ROOT__ ||
    window.__VERTEX_CONTAINER__ !== container
  ) {
    window.__VERTEX_ROOT__ = ReactDOM.createRoot(container);
    window.__VERTEX_CONTAINER__ = container;
  }

  window.__VERTEX_ROOT__.render(<App />);
}

window.onunhandledrejection = function (event) {
  console.error("Unhandled Promise:", event.reason);
};
/**
 * 3DEXPERIENCE / Netvibes lifecycle support
 */
function safeInit() {
  // widget lifecycle (preferred in 3DEXPERIENCE)
  if (window.widget && typeof window.widget.onLoad === "function") {
    window.widget.onLoad(() => {
      mountReact();
    });
  } else {
    // fallback (normal browser / Vite dev)
    mountReact();
  }
}

safeInit();
