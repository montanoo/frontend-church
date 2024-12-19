import React from "react";

enum ButtonType {
  Submit = "submit",
  Reset = "reset",
  Button = "button",
}

export default function Button({
  type,
  text,
}: Readonly<{ type?: ButtonType; text: string }>) {
  return (
    <button
      className="btn btn-full bg-[#A687C4] hover:bg-[#C8A8CE] text-white"
      type={type ?? "submit"}
    >
      {text}
    </button>
  );
}
