import * as React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'font-awesome/css/font-awesome.min.css';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const initialOptions = {
  "client-id": "ATWaSe3qzmdur1ZbBgPxk2frBtGUhgeyAb0ws0LJX0AivZm9NQqZ8iaHFbzRYE41xk6knf3o9rDpt5WJ",
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
