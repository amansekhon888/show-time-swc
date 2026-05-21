import React from "react";
import type { ButtonHTMLAttributes  } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      fullWidth = true,
      children,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 ease-out rounded-xl focus:outline-none focus:ring-4";

    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const variantStyles = {
      primary: `
        bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
        text-white shadow-lg hover:shadow-xl
        focus:ring-red-500/30 dark:focus:ring-red-500/50
        active:scale-[0.98]
        dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800
      `,
      secondary: `
        bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700
        text-white shadow-lg hover:shadow-xl
        focus:ring-purple-500/30 dark:focus:ring-purple-500/50
        active:scale-[0.98]
      `,
      outline: `
        border-2 border-gray-300 dark:border-gray-600
        text-gray-900 dark:text-gray-100
        hover:bg-gray-50 dark:hover:bg-slate-800/50
        focus:ring-gray-500/30
        active:scale-[0.98]
      `,
    };

    const disabledStyles =
      "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          ${baseStyles}
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${disabledStyles}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          <>
            {icon && <span className="text-xl">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);

FormButton.displayName = "FormButton";

export default FormButton;
