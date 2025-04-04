import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginScreen from './components/Login.jsx';
import Dashboard from './components/main/State.jsx';
import HeaderNavbar from './components/main/Navbar.jsx';
import Sidebar from './components/main/sidebar.jsx';
import "../src/style.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      {!isLoginPage && <HeaderNavbar />}
      <div className="d-flex">
        {!isLoginPage && <Sidebar />}
        <div className="container-fluid">{children}</div>
      </div>
    </div>
  );
};

function App() {
  return (
      <Layout>
        <Routes>
          {/* Redirect "/" to "/login" */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Login Page */}
          <Route path="/login" element={<LoginScreen />} />

          {/* Other pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes as needed */}
        </Routes>
      </Layout>
  );
}

export default App;
