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
    variant="full"
    className={`${isDarkMode ? "text-white" : "text-[#06071f]"}`}
  >
    <div className="text-center max-w-3xl">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-6"
        style={{
          backgroundImage: `linear-gradient(90deg, ${COLORS.join(", ")})`,
          WebkitBackgroundClip: "text",
          color: "transparent",
          backgroundSize: "400% 100%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      >
        About Me
      </motion.h2>

      <p
        className={`text-lg sm:text-xl mb-8 ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        I’m a Computer Industrial Engineering student passionate about
        full-stack development and DevOps.
      </p>

      <div className="flex justify-center gap-6 flex-wrap">
        <AnimatedButton
          title="Technologies"
          description="Explore my tools and stacks"
          color={color}
          isDarkMode={isDarkMode}
          onClick={() => scrollToSection("technologies")}
        />
        <AnimatedButton
          title="Projects"
          description="Discover my real-world work"
          color={color}
          isDarkMode={isDarkMode}
          onClick={() => scrollToSection("projects")}
        />
        <AnimatedButton
          title="Study"
          description="See my educational path"
          color={color}
          isDarkMode={isDarkMode}
          onClick={() => scrollToSection("study")}
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
