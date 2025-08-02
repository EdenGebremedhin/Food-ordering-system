import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">EatUp Burger</div>

      {/* Hamburger Icon */}
      <div
        className="hamburger"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>

        {token ? (
          <>
            <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}>My Orders</Link>
            {localStorage.getItem("role") === "admin" && (
              <Link to="/admin-orders" onClick={() => setIsMobileMenuOpen(false)}>Admin Orders</Link>
            )}
            <button
              className="logout-btn"
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
