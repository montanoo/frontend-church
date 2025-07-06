import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "muted" | "primary" | "danger";
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  className = "",
  variant = "muted",
  icon,
}) => {
  const baseStyles = "px-4 py-2 text-white rounded-lg transition-all inline-flex items-center justify-center gap-2 hover:shadow-md";

  const variantStyles: Record<typeof variant, string> = {
    muted: "bg-[#7B8D8E] hover:bg-[#A3B0B2]",
    primary: "bg-[#1F2937] hover:bg-[#374151]",
    danger: "bg-[#F28C8C] hover:bg-[#F1A3A3]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;

