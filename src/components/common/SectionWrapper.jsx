import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

/**
 * SectionWrapper: a reusable container for each section that
 * automatically applies light/dark backgrounds and text colors.
 *
 * Props:
 *  - children: React nodes (the content inside the section)
 *  - id: optional HTML id for scroll targeting
 *  - className: optional Tailwind utility classes
 *  - variant: "default" (animated) or "static"
 */
export default function SectionWrapper({
  children,
  id,
  className = "",
  variant = "default",
}) {
  const { isDarkMode } = useTheme();

  const backgroundColor = isDarkMode ? "#020617" : "#ffffff";
  const textColor = isDarkMode ? "white" : "#06071f";

  const sectionClasses = `
    relative min-h-screen w-full px-4 sm:px-8 py-16 sm:py-24
    transition-colors duration-500
    ${className}
  `;

  if (variant === "static") {
    return (
      <section
        id={id}
        className={sectionClasses}
        style={{ backgroundColor, color: textColor }}
      >
        {children}
      </section>
    );
  }

  // With fade-in animation
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={sectionClasses}
      style={{ backgroundColor, color: textColor }}
    >
      {children}
    </motion.section>
  );
}
