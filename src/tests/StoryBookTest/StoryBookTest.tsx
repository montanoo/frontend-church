import React from "react";

type StoryBookButtonTestProps = {
  label: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "accent" | "success" | "error";
  disabled?: boolean;
};

export default function StoryBookButtonTest({
  label,
  onClick,
  size = "medium",
  variant = "primary",
  disabled = false,
}: StoryBookButtonTestProps) {
  const sizeClass = {
    small: "btn-sm",
    medium: "btn-md",
    large: "btn-lg",
  }[size];

  return (
    <button
      className={`btn btn-${variant} ${sizeClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
