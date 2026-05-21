import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "light" | "dark" | "auto";
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  size = "md",
  showText = true,
  variant = "auto",
}) => {
  const sizeStyles = {
    sm: { icon: "w-8 h-8", text: "text-xl" },
    md: { icon: "w-12 h-12", text: "text-2xl" },
    lg: { icon: "w-16 h-16", text: "text-3xl" },
  };

  const textColorClass =
    variant === "auto"
      ? "text-gray-900 dark:text-white"
      : variant === "light"
        ? "text-gray-900"
        : "text-white";

  return (
    <div className="flex items-center gap-3">
      {/* Movie/Cinema Icon */}
      <div
        className={`
        ${sizeStyles[size].icon}
        rounded-lg
        bg-gradient-to-br from-red-600 to-red-700 dark:from-red-600 dark:to-red-700
        flex items-center justify-center
        shadow-lg
        transition-transform duration-300 hover:scale-105
      `}
      >
        <svg
          fill="white"
          viewBox="0 0 24 24"
          className="w-2/3 h-2/3"
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-4H6V8h12v2z" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <h1 className={`font-black tracking-wider ${sizeStyles[size].text} ${textColorClass} transition-colors`}>
            SHOW
            <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              TIME
            </span>
          </h1>
          <p className={`text-xs font-semibold ${textColorClass} opacity-70 tracking-widest`}>
            CINEMA
          </p>
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
