// src/components/common/SectionWrapper.jsx
import React from "react";

export default function SectionWrapper({
  id,
  children,
  className = "",
  style = {},
}) {
  const NAVBAR_HEIGHT = 72; // same fixed navbar height

  return (
    <section
      id={id}
      className={`relative h-screen overflow-hidden flex flex-col justify-center items-center ${className}`}
      style={{
        paddingTop: `${NAVBAR_HEIGHT + 20}px`, // title spacing below navbar
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
