import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

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
                className={`text-white hover:text-orange-500 transition-colors font-medium ${
                  isActive(to) ? "text-orange-500" : ""
                }`}
              >
                {label}
              </Link>
            ))}

            
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 text-center bg-black/10 hover:text-orange-500 backdrop-blur-sm py-4">
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
                  className="text-white hover:text-orange-500 transition-colors font-medium"
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
