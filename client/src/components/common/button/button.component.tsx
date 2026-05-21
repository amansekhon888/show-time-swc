import type { ButtonHTMLAttributes } from "react";
import { baseStyle, disabledStyles, sizeStyles, variantStyles } from "./button.constant";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loadingText?: string;
  text: string
}

const ButtonComponent: React.FC<ButtonProps> = (props) => {
  const { variant, size='md', isLoading=false, icon, className, disabled=false, loadingText, text, ...rest } = props;
  
  return (
    <button
      disabled
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      {...rest}
    >
      {isLoading ? loadingText || 'Loading...' : text}
    </button>
  )
}

ButtonComponent.displayName = "Button";
export default ButtonComponent