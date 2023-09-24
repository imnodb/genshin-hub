import localforage from "localforage";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

async function start() {
  
  const val = await localforage.getItem('allArts')
  window.allArts = val || []
  window.StarrailArts = await localforage.getItem('StarrailArts') || []
  const { default: App } = await import('./App')

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
start()
