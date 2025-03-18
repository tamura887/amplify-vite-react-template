import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { EntryDataProvider } from "./context/EntryDataContext";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EntryDataProvider>
      <App />
    </EntryDataProvider>
  </React.StrictMode>
);
