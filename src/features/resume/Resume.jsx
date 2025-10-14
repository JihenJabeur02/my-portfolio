// src/features/resume/Resume.jsx
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import SectionWrapper from "../../components/common/SectionWrapper";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function Resume() {
  const { isDarkMode } = useTheme(); // 🌗 global theme state
  const [animationError, setAnimationError] = useState(false);
  const color = useMotionValue(COLORS[0]);

  // Safe gradient animation
  useEffect(() => {
    let animation;
    try {
      animation = animate(color, COLORS, {
        ease: "easeInOut",
        duration: 10,
        repeat: Infinity,
        repeatType: "mirror",
      });
    } catch (error) {
      console.error("Animation error:", error);
      setAnimationError(true);
    }

    return () => animation?.stop();
  }, [color]);

  // Scroll to section handler
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  if (animationError) {
    return (
      <SectionWrapper id="resume">
        <h2 className="text-4xl font-bold text-center">About Me</h2>
        <p className="text-center mt-4">
          Animation unavailable — content loading...
        </p>
      </SectionWrapper>
    );
  }

  return (
<SectionWrapper
  id="resume"
  className={`relative flex flex-col items-center justify-center h-[calc(100vh-80px)] overflow-hidden ${
    isDarkMode ? "text-white" : "text-[#06071f]"
  }`}
  variant="static"
>
  <div className="max-w-4xl mx-auto px-4">
    {/* Animated Gradient Title */}
    <motion.h2
      className="text-4xl md:text-5xl font-bold mb-4 text-center"
      style={{
        backgroundImage: `linear-gradient(90deg, ${COLORS.join(", ")})`,
        WebkitBackgroundClip: "text",
        color: "transparent",
        backgroundSize: "400% 100%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%"],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    >
      About Me
    </motion.h2>

    {/* Divider */}
    <motion.div
      className="h-1 w-20 mx-auto mb-6"
      style={{
        background: `linear-gradient(90deg, ${COLORS.join(", ")})`,
        backgroundSize: "400% 100%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%"],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    />

    {/* Description */}
    <p
      className={`text-base sm:text-lg md:text-xl text-center mb-8 max-w-2xl mx-auto ${
        isDarkMode ? "text-gray-300" : "text-gray-700"
      }`}
    >
      I’m a Computer Industrial Engineering student at ENET'COM with a strong
      passion for software engineering. I specialize in full-stack
      development, desktop applications, and mobile apps — always exploring
      new technologies like DevOps and machine learning to build smarter,
      scalable solutions.
    </p>

    {/* Buttons Row */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
      <AnimatedButton
        title="Technologies"
        description="Explore the tools I master"
        color={color}
        onClick={() => scrollToSection("technologies")}
        isDarkMode={isDarkMode}
      />
      <AnimatedButton
        title="Projects"
        description="Check out my latest builds"
        color={color}
        onClick={() => scrollToSection("projects")}
        isDarkMode={isDarkMode}
      />
      <AnimatedButton
        title="Study"
        description="My academic journey"
        color={color}
        onClick={() => scrollToSection("study")}
        isDarkMode={isDarkMode}
      />
    </div>
  </div>
</SectionWrapper>

  );
}

// 🟣 Animated Button (with dark/light adaptation)
function AnimatedButton({ title, description, color, onClick, isDarkMode }) {
  const borderColor = useTransform(color, (c) => c || "#13FFAA");
  const boxShadow = useTransform(color, (c) => `0px 4px 24px ${c || "#13FFAA"}`);

  return (
    <motion.button
      onClick={onClick}
      className={`flex flex-col items-center justify-center h-32 w-48 mx-auto p-4 rounded-xl font-semibold text-center transform-gpu transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 focus:outline-none ${
        isDarkMode
          ? "text-white bg-[#020617]/60"
          : "text-[#06071f] bg-gray-100"
      }`}
      style={{
        borderColor,
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow,
      }}
    >
      <span className="text-lg mb-1">{title}</span>
      <span
        className={`text-xs ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {description}
      </span>
    </motion.button>
  );
}
