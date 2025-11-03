import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Instrumentals", path: "/instrumentals" },
    { name: "Songs", path: "/songs" },
    { name: "Book Session", path: "/book-session" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-gray-900/60 backdrop-blur-sm shadow-md"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center gap-2 text-soft-pink drop-shadow-soft-pink">
          <div className="bg-soft-pink/20 rounded-full w-9 h-9 flex items-center justify-center font-bold text-black">
            GV
          </div>
          <span>Global Vybz</span>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="sm:hidden text-gray-200 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <div
          className={`sm:flex items-center space-x-4 sm:space-x-6 transition-all duration-300 ${
            menuOpen
              ? "absolute top-full left-0 w-full bg-gray-900/90 backdrop-blur-md sm:static sm:w-auto sm:bg-transparent flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 py-4 sm:py-0"
              : "hidden sm:flex"
          }`}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "text-neon-blue drop-shadow-neon border-b-2 border-neon-blue"
                    : "text-gray-200 hover:text-neon-blue hover:drop-shadow-neon"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
