import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, Shield } from "lucide-react";

export const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  // Type assertion to access optional properties (Firebase auth structure)
  const userWithOptionals = user as { uid: string; email: string; name?: string; photo?: string; role?: string };

  const getInitials = (email: string, name?: string) => {
    if (name) {
      const parts = name.split(" ");
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return name[0].toUpperCase();
    }
    return email[0].toUpperCase();
  };

  const displayName = userWithOptionals.name || userWithOptionals.email.split("@")[0];
  const initials = getInitials(userWithOptionals.email, userWithOptionals.name);
  const isAdmin = userWithOptionals.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Google-style Profile Button - Circular Avatar */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:ring-2 hover:ring-orange-500 hover:ring-offset-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        title={displayName}
      >
        {user.photo ? (
          <img
            src={user.photo}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-lg"
            onError={(e) => {
              // Fallback to initials if image fails to load
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className={`w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-lg ${user.photo ? 'hidden' : 'flex'}`}
          style={{ display: user.photo ? 'none' : 'flex' }}
        >
          {initials}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-900">{displayName}</p>
            <p className="text-xs text-gray-600">{userWithOptionals.email}</p>
            {isAdmin && (
              <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                <Shield className="w-3 h-3 mr-1" />
                Administrator
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => {
                navigate("/dashboard");
                setIsDropdownOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => {
                  navigate("/admin");
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Panel</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 border-t border-gray-200 mt-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
