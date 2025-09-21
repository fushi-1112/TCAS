import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  let baseClasses = "px-4 py-2 rounded-lg font-medium transition w-full text-center";

  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses = "bg-blue-700 text-white hover:bg-blue-800";
      break;
    case "secondary":
      variantClasses = "bg-gray-600 text-gray-100 hover:bg-gray-700";
      break;
    case "danger":
      variantClasses = "bg-red-700 text-white hover:bg-red-800";
      break;
  }

  return <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>{children}</button>;
}
