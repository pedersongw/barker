import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "normalize.css";
import "./fonts/Catamaran/Catamaran-VariableFont_wght.ttf";
import "./fonts/Cantarell/Cantarell-Regular.ttf";
import "./index.css";
import App from "./App";
import Donate from "./components/Donate/Donate";
import Admin from "./components/Admin/admin.jsx";
import Contact from "./components/Contact/Contact";
import DisplayComment from "./components/Comment/DisplayComment";
import SinglePostHolder from "./components/SinglePost/singlePostHolder";
import reportWebVitals from "./reportWebVitals";
import ForumHolder from "./components/Forum/ForumHolder";
import VerifyHolder from "./components/Verify/VerifyHolder";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="forum/:page/:sort" element={<ForumHolder />} />
        <Route path="donate" element={<Donate />} />
        <Route path="contact" element={<Contact />} />
        <Route path="comment/:id/:parentPost" element={<DisplayComment />} />
        <Route path="post/:id" element={<SinglePostHolder />} />
        <Route path="admin" element={<Admin />} />
        <Route path="verify/:confirmationCode" element={<VerifyHolder />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
