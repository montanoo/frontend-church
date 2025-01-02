"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface HeaderLinkProps {
  route: {
    name: string;
    href: string;
  };
}

export default function HeaderLink({ route }: HeaderLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === route.href;

  return (
    <Link
      key={route.name}
      href={route.href}
      className={`flex items-center justify-center h-10 transition-all duration-500 rounded-full px-6 border-2 ${
        isActive
          ? "border-[#6AADB4] text-[#6AADB4] font-bold"
          : "border-transparent text-black hover:border-gray-300 hover:text-gray-600 font-bold"
      }`}
    >
      {route.name}
    </Link>
  );
}
