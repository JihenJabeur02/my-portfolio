// src/components/common/SectionWrapper.jsx
import React from "react";
import clsx from "clsx";

export default function SectionWrapper({
  id,
  children,
  className = "",
  variant = "full", // 'full' or 'auto'
}) {
  // Standard height and top padding for all sections
  const baseClasses = clsx(
    "w-full relative overflow-hidden px-4 sm:px-6 lg:px-8",
    variant === "full"
      ? "min-h-[calc(100vh-80px)] pt-24 pb-8 flex flex-col items-center"
      : "py-16"
  );

  return (
    <section id={id} className={`${baseClasses} ${className}`}>
      {children}
    </section>
  );
}
