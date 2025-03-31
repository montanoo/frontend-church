import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;  // The value is expected to be a string.
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  // onChange should accept a change event
  className?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text", // default type is "text"
  placeholder = "",
  value,
  onChange,
  className = "",
  name = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border p-2 rounded-md ${className}`}
      name={name}
    />
  );
};

export default Input;
