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

  window.__VERTEX_ROOT__.render(
    <App DataDragAndDrop={DataDragAndDrop} />
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

    window.require(
      ["DS/DataDragAndDrop/DataDragAndDrop"],
      function (DataDragAndDrop) {
        console.log("DataDragAndDrop loaded");

        const dropElement = window.widget.body;

        if (!dropElement) {
          console.error("widget.body not ready");
          return;
        }

        console.log("Binding DnD to:", dropElement);

        DataDragAndDrop.droppable(dropElement, {
          drop: function (data) {
            console.log("DROP FIRED", data);

            window.__REACT_DROP_HANDLER__?.(data);
          },
          enter: function () {
            dropElement.classList.add("drag-over");
          },
          leave: function () {
            dropElement.classList.remove("drag-over");
          }
        });

        // mount React AFTER DnD is ready
        mountReact(DataDragAndDrop);
      }
    );
  });
};
(function waitForWidget() {
  if (window.widget && window.require) {
    window.initWidget();
  } else {
    setTimeout(waitForWidget, 100);
  }
})();