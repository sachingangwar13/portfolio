import { StrictMode } from 'react'
import React from "react";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from "next-themes";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" attribute="class">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
