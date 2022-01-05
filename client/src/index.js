import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "normalize.css";
import "./fonts/Catamaran/Catamaran-VariableFont_wght.ttf";
import "./index.css";
import App from "./App";
import Forum from "./components/Forum";
import Donate from "./components/Donate";
import Contact from "./components/Contact";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="forum" element={<Forum />} />
        <Route path="donate" element={<Donate />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
