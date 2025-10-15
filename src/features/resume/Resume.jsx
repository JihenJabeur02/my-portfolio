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
      className={`min-h-screen flex flex-col justify-center ${
        isDarkMode ? "text-white" : "text-[#06071f]"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Animated Gradient Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-5 mt-20 text-center"
          style={{
            backgroundImage: `linear-gradient(90deg, ${COLORS.join(", ")})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
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

        <motion.div
          className="h-1 w-24 mx-auto mt-2 mb-10"
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
          className={`text-lg md:text-xl text-center mb-15 max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-250" : "text-gray-650"
          }`}
        >
          I am an Industrial Engineering student at ENET'COM with a strong passion 
          for software engineering and process optimization. I started by developing web,
           desktop, and mobile applications to enhance industrial and administrative performance.
            Later, I specialized in creating automation scripts and testing tools, diving deeper
             into validation and quality assurance. Currently, I am expanding my skills toward 
             embedded systems and exploring the integration of AI technologies to develop smarter,
              adaptive industrial solutions. Throughout my projects, I have honed strong teamwork
               and time management abilities, and I regularly work with DevOps tools to ensure efficient
                development, deployment, and collaboration.
        </p>

        {/* Three Rectangles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedButton
            title="Technologies"
            description="Tools I master and the tech I explore — from front-end frameworks to DevOps pipelines."
            color={color}
            onClick={() => scrollToSection("technologies")}
            isDarkMode={isDarkMode}
          />

          <AnimatedButton
            title="Projects"
            description="Real-world challenges turned into digital solutions across industries — take a look!"
            color={color}
            onClick={() => scrollToSection("projects")}
            isDarkMode={isDarkMode}
          />

          <AnimatedButton
            title="Study"
            description="Here’s how my education powers my code."
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
