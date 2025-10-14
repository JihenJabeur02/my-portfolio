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
      <div className="max-w-4xl mx-auto px-4 py-20">
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
          className="h-1 w-24 mx-auto mt-2 mb-20"
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
          className={`text-lg md:text-xl text-center mb-20 max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          I am a Computer Industrial Engineering student at ENET'COM with a
          strong passion for software engineering. I specialize in web
          development, desktop application development, and mobile app
          development. My experience spans creating digital solutions across
          industrial, administrative, cultural, and agricultural sectors. I’m
          always exploring new technologies like DevOps and machine learning to
          build smarter, scalable solutions.
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
  <SectionWrapper
    id="resume"
    className={`h-screen flex flex-col justify-center items-center ${
      isDarkMode ? "text-white" : "text-[#06071f]"
    }`}
  >
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Animated Gradient Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-4 text-center"
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

      {/* Gradient divider */}
      <motion.div
        className="h-1 w-20 mx-auto mb-8"
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
        className={`text-base sm:text-lg md:text-xl text-center mb-10 max-w-2xl mx-auto ${
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
