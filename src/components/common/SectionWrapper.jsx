// src/components/common/SectionWrapper.jsx
import React, { useEffect, useState } from "react";

export default function SectionWrapper({
  id,
  children,
  className = "",
  variant = "full", // 'full' or 'auto'
}) {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) setNavHeight(nav.offsetHeight);
  }, []);

  const base =
    variant === "full"
      ? // full-screen minus navbar
        `min-h-[calc(100vh-${navHeight}px)] flex flex-col justify-center items-center`
      : // scrollable sections (like Contact)
        "py-20";

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 ${base} ${className}`}
      style={{ scrollMarginTop: `${navHeight}px` }} // prevents title clipping when scrolling
    >
      {children}
    </section>
  );
}
