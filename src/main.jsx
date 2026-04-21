import React from "react";
import ReactDOM from "react-dom/client";
import { ViewerContextProvider } from "./contexts/viewer-context";
import { Home } from "./components/Home";
import '@vertexvis/viewer';

console.log("main.jsx loaded");

function getContainer() {
  let container = document.getElementById("root");

  if (!container) {
    container = document.createElement("div");
    container.id = "root";
    window.widget.body.appendChild(container);
  }
  return container;
}

function mountReact() {
  const container = getContainer();

  if (
    !window.__VERTEX_ROOT__ ||
    window.__VERTEX_CONTAINER__ !== container
  ) {
    window.__VERTEX_ROOT__ = ReactDOM.createRoot(container);
    window.__VERTEX_CONTAINER__ = container;
  }

  // ✅ Use env var correctly — read at build time by Vite
  const vertexEnv = import.meta.env.VITE_VERTEX_ENV;

  window.__VERTEX_ROOT__.render(
    <ViewerContextProvider>
      <Home vertexEnv={vertexEnv} />
    </ViewerContextProvider>
  );
}

window.onunhandledrejection = function (event) {
  console.error("Unhandled Promise:", event.reason);
};

window.initWidget = function () {
  if (window.__WIDGET_INIT__) return;
  window.__WIDGET_INIT__ = true;

  console.log("initWidget called");

  window.widget.addEvent("onLoad", function () {
    console.log("onLoad triggered");
    mountReact();
  });
};

(function waitForWidget() {
  if (window.widget && window.require) {
    window.initWidget();
  } else {
    setTimeout(waitForWidget, 100);
  }
})();