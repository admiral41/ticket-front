import React from "react";
import logo from "../assets/logo.png";

const Loader = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="w-48 h-48">
        <img
          src={logo}
          alt="College Logo"
          className="w-full h-full object-contain animate-pulse"
        />
      </div>

      {/* Circular Loader directly below */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mt-0"></div>
    </div>
  );
};

export default Loader;
