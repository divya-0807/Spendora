import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import Transaction from './components/Transaction';
import Introduction from './components/Introduction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (

    
    <div>
      <ToastContainer/>
      <Header />
      <Router>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signIn" element={<SignUp />} />
        <Route path="/transactions" element={<Transaction />} />
      </Routes>
      </Router>
    </div>
  );
};

export default App;
