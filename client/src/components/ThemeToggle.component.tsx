import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        relative inline-flex items-center justify-center
        w-12 h-12 rounded-full
        bg-gray-100 dark:bg-slate-800
        hover:bg-gray-200 dark:hover:bg-slate-700
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-4 focus:ring-red-500/30 dark:focus:ring-red-500/50
        shadow-md hover:shadow-lg
        group
      "
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun Icon - Visible in Light Mode */}
      <svg
        className={`
          w-6 h-6 text-yellow-500
          transition-all duration-300
          ${isDark ? "opacity-0 scale-0 absolute" : "opacity-100 scale-100"}
        `}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 3v1m6.364 1.636l-.707-.707M21 12h-1m-1.636 6.364l-.707.707M12 21v-1m-6.364-1.636l-.707.707M3 12h1m1.636-6.364l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
      </svg>

      {/* Moon Icon - Visible in Dark Mode */}
      <svg
        className={`
          w-6 h-6 text-blue-400
          transition-all duration-300
          ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-0 absolute"}
        `}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      {/* Ripple Effect on Hover */}
      <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    </button>
  );
};

export default ThemeToggle;
