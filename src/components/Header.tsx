import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserProfile from "./UserProfile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  // Hide header on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="bg-transparent shadow-none absolute w-full z-50">
      {/* Top Bar */}
      <div className=" text-white font-extrabold py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6"></div>
            <div className="hidden md:block">
              <span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="SYNNECTIFY Logo" className="w-10 h-10" />
            <span className="text-2xl font-extrabold text-[#ffffff]">
              SYNNECTIFY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/portfolio", label: "Portfolio" },
              { to: "/contact", label: "Contact" },
              { to: "/careers", label: "Careers" },
              { to: "/services", label: "Services" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-white hover:text-orange-500 focus:text-orange-500 transition-colors font-bold text-lg shadow-sm ${
                  isActive(to) ? "text-orange-500" : ""
                }`}
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
              >
                {label}
              </Link>
            ))}

            {/* User Profile (only show when logged in) */}
            {user && <UserProfile />}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              // Custom X icon with gradient stroke
              <svg 
                className="w-6 h-6" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="mobileIconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF6B00" />
                    <stop offset="100%" stopColor="#2D6DF6" />
                  </linearGradient>
                </defs>
                <path 
                  d="M6 6L18 18M6 18L18 6" 
                  stroke="url(#mobileIconGradient)" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              // Custom hamburger icon with gradient stroke
              <svg 
                className="w-6 h-6" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="mobileIconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF6B00" />
                    <stop offset="100%" stopColor="#2D6DF6" />
                  </linearGradient>
                </defs>
                <path 
                  d="M4 6H20M4 12H20M4 18H20" 
                  stroke="url(#mobileIconGradient)" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 text-center bg-black/10 backdrop-blur-sm py-4">
            <div className="flex flex-col space-y-4">
              {[
                "/",
                "/about",
                "/services",
                "/portfolio",
                "/contact",
                "/careers",
              ].map((path) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-white hover:text-orange-500 focus:text-orange-500 active:text-orange-500 transition-colors duration-300 ease-in-out font-bold text-lg py-3 px-6 rounded-lg touch-manipulation mobile-nav-item ${
                    isActive(path) ? "text-orange-500" : ""
                  }`}
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {path === "/"
                    ? "Home"
                    : path.replace("/", "").charAt(0).toUpperCase() +
                      path.slice(2)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;