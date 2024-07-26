import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'font-awesome/css/font-awesome.min.css';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


const initialOptions = {
  "client-id": "Aap5d7NFhZsMjO4iKCfFXtfk33hrfU1Qnyv5E2Yi1wLwQb0SLt3n_mmZgCaqFnQJywtMFOX2dHst6gZf",
  currency: "USD",
  intent: "capture",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions}>
    <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
