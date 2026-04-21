import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ViewerContextProvider } from "./contexts/viewer-context";
import {Home} from "./components/Home";
import '@vertexvis/viewer';

/**
 * Get or create root container safelyn
 */
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

/**
 * Safe React mount (prevents duplicate roots)
 */
function mountReact(DataDragAndDrop) {
  const container = getContainer();

  if (
    !window.__VERTEX_ROOT__ ||
    window.__VERTEX_CONTAINER__ !== container
  ) {
    window.__VERTEX_ROOT__ = ReactDOM.createRoot(container);
    window.__VERTEX_CONTAINER__ = container;
  }
const vertexEnv = import.meta.env.VITE_VERTEX_ENV;

window.__VERTEX_ROOT__.render(
  <ViewerContextProvider>
    <Home vertexEnv={vertexEnv} />
  </ViewerContextProvider>
);
}
export const getServerSideProps = () => {
	return {
		props: { vertexEnv: Config.vertexEnv },
	};
};

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