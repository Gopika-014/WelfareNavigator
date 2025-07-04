import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Function to check if the current link is active
  const isActive = (path) =>
    location.pathname === path
      ? "relative text-white font-medium px-4 py-2 before:absolute before:bottom-0 before:left-1/2 before:w-16 before:h-[2px] before:bg-white before:translate-x-[-50%] before:transition-all"
      : "relative text-white font-medium px-4 py-2 transition-all duration-300 hover:before:absolute hover:before:bottom-0 hover:before:left-1/2 hover:before:w-16 hover:h-[1px] hover:before:bg-gray-200 hover:before:translate-x-[-50%] hover:before:transition-all";

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold">CitizenAid</h1>

        {/* Hamburger Menu (Mobile) */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-3xl md:hidden">
          <IoMenu />
        </button>

        {/* Navbar Links (Desktop) */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className={isActive("/")}>Home</Link>
          {!user && <Link to="/register" className={isActive("/register")}>Register</Link>}
          {!user ? (
            <Link to="/login" className={isActive("/login")}>Sign In</Link>
          ) : (
            <Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
          )}
          <Link to="/about" className={isActive("/about")}>About Us</Link>
          <Link to="/faq" className={isActive("/faq")}>FAQ</Link> {/* Always visible */}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 shadow-md absolute w-full left-0 py-4 text-center space-y-2">
          <Link to="/" className="block" onClick={() => setIsOpen(false)}>Home</Link>
          {!user && <Link to="/register" className="block" onClick={() => setIsOpen(false)}>Register</Link>}
          {!user ? (
            <Link to="/login" className="block" onClick={() => setIsOpen(false)}>Sign In</Link>
          ) : (
            <Link to="/dashboard" className="block" onClick={() => setIsOpen(false)}>Dashboard</Link>
          )}
          <Link to="/about" className="block" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/faq" className="block" onClick={() => setIsOpen(false)}>FAQ</Link> {/* Always visible */}
        </div>
      )}
    </header>
  );
};

export default Header;
