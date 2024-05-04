import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import './flags.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrimeReactProvider>
  </React.StrictMode>
);
