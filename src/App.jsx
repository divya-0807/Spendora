import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";

import Introduction from "./components/Introduction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signIn" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
