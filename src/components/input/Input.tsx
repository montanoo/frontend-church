"use client";
import React, { useState, RefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

export default function Input({
  label,
  placeholder,
  type,
  className,
  name,
  ref,
}: Readonly<{
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  name?: string;
  ref: RefObject<HTMLInputElement | null>;
}>) {
  const [shown, setShown] = useState(false);
  return (
    <label className="form-control w-full ">
      <div className="label py-4">
        <span className="label-text text-lg">{label}</span>
      </div>
      <div className={`${type === "password" ? "relative" : ""}`}>
        <input
          type={!shown ? type : "text"}
          placeholder={placeholder}
          className={`input text-sm py-6 ${
            className ?? "input-bordered w-full"
          }`}
          name={name ?? ""}
          ref={ref}
        />
        {type === "password" && (
          <FontAwesomeIcon
            onClick={() => setShown((prev) => !prev)}
            className="absolute top-3 right-3 w-6 h-6 cursor-pointer"
            size="xs"
            icon={faEye}
          />
        )}
      </div>
    </label>
  );
}
