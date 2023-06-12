import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import LangIntlProvider from "./utils/lang_context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LangIntlProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LangIntlProvider>
  </React.StrictMode>
);
