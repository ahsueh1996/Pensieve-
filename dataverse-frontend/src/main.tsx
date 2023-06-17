import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'
import React from "react";
import App from "./App";
import { Context, contextStore } from "./context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Context.Provider value={contextStore}>
      <App />

    </Context.Provider>
  </BrowserRouter>
);
