import React, { useEffect, useState } from "react";
import { styles } from "./styles";

export default function VertexExportWidget({ DataDragAndDrop }) {
  const [dataItem, setDataItem] = useState(null);
  const [apiResult, setApiResult] = useState("");
  const [error, setError] = useState("");

  // Drag & Drop (ENOVIA replacement)
useEffect(() => {
  if (!DataDragAndDrop || !window.widget) return;

  const dropElement = window.widget.body;

  if (dropElement.__vertexBound__) return;
  dropElement.__vertexBound__ = true;

  console.log("Binding drag & drop on widget.body");

  DataDragAndDrop.droppable(dropElement, {
    drop: function (data) {
      console.log("DROP FIRED", data);

      try {
        const obj = JSON.parse(data);
        const item = obj?.data?.items?.[0];

        setDataItem(item || null);
        setApiResult("");
        setError("");
      } catch (e) {
        console.error(e);
        setError("Invalid dropped data");
      }
    },
    enter: function () {
      dropElement.classList.add("drag-over");
    },
    leave: function () {
      dropElement.classList.remove("drag-over");
    }
  });
}, [DataDragAndDrop]);

  const sendToVertex = async () => {
    if (!dataItem) return;

    if (dataItem.objectType !== "VPMReference") {
      setError("Please drop a VPMReference Product.");
      return;
    }

    if (!window.confirm(`Send ${dataItem.displayName} to Vertex?`)) return;

    try {
      const url =
        "https://www.plmtrainer.com:444/Vertex-0.0.1-SNAPSHOT/vertexvis/v1/exportdata?id=" +
        dataItem.objectId;

      const res = await fetch(url);
      const data = await res.json();

      const formatted = (data["Summary Lines"] || "").replace(/\n/g, "<br>");

      setApiResult(formatted);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      {!dataItem ? (
        <div style={styles.dropZone}>
          <h2>Vertex Data Export</h2>
          <p>Drop Here to Send Data to Vertex</p>
        </div>
      ) : (
        <div style={styles.card}>
          <div style={styles.header}>
            <h3>Object Details</h3>
            <button onClick={() => setDataItem(null)}>Reset</button>
          </div>

          {dataItem.objectType !== "VPMReference" ? (
            <div style={styles.errorBox}>
              <h4>Invalid Selection</h4>
              <p>Please drop a VPMReference Product.</p>
              <button onClick={() => setDataItem(null)}>Back</button>
            </div>
          ) : (
            <>
              <div style={styles.body}>
                <div>Type: <b>{dataItem.objectType}</b></div>
                <div>Name: <b>{dataItem.displayName}</b></div>
                <div>ID: <code>{dataItem.objectId}</code></div>
              </div>

              <div style={styles.footer}>
                <button onClick={sendToVertex}>Send To Vertex</button>
              </div>

              {apiResult && (
                <div
                  style={styles.successBox}
                  dangerouslySetInnerHTML={{ __html: apiResult }}
                />
              )}

              {error && <p style={styles.errorText}>{error}</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
}
