import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { logoutUser } from "../services/authService";

const Navbar = ({ isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    try {
      logoutUser();
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdminToggle = () => {
    if (location.pathname === "/admin-dashboard") {
      navigate("/user-dashboard"); // Redirect to user dashboard
    } else {
      navigate("/admin-dashboard"); // Redirect to admin dashboard
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center h-16">
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          Emotion Detector
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/profile"
            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
          >
            Logout
          </button>
          {isAdmin && (
            <button
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
              onClick={handleAdminToggle}
            >
              {location.pathname === "/admin-dashboard"
                ? "View as Member"
                : "Go to Admin Dashboard"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
