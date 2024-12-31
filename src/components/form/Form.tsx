"use client";
import React from "react";
export default function Form({
  children,
  onSubmit,
}: Readonly<{ children?: React.ReactNode; onSubmit: () => void }>) {
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
}
