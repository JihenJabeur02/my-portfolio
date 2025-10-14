// src/components/common/SectionWrapper.jsx
import React from "react";
import clsx from "clsx";

export default function SectionWrapper({
  id,
  children,
  className = "",
  variant = "full", // 'full' or 'auto'
}) {
  const baseClasses = clsx(
    "w-full relative overflow-hidden px-4 sm:px-6 lg:px-8",
    variant === "full"
      ? "h-screen flex flex-col justify-center items-center" // ✅ always fills one screen, centered
      : "py-16"
  );

  return (
    <section id={id} className={`${baseClasses} ${className}`}>
      {children}
    </section>
  );
}
