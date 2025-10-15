// src/features/technologies/Technologies.jsx
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import SectionWrapper from "../../components/common/SectionWrapper";

import cssImg from "../../assets/images/css.png";
import htmlImg from "../../assets/images/html.png";
import javaImg from "../../assets/images/java.png";
import jsImg from "../../assets/images/javascript.png";
import pythonImg from "../../assets/images/python.png";
import reactImg from "../../assets/images/react.png";
import nodeImg from "../../assets/images/node.png";
import docker from "../../assets/images/docker.png";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const technologies = [
  { name: "CSS", rate: 90, image: cssImg },
  { name: "HTML", rate: 90, image: htmlImg },
  { name: "Java", rate: 70, image: javaImg },
  { name: "JavaScript", rate: 70, image: jsImg },
  { name: "Python", rate: 80, image: pythonImg },
  { name: "React", rate: 70, image: reactImg },
  { name: "Node.js", rate: 60, image: nodeImg },
  { name: "Docker", rate: 60, image: docker },
];

export default function Technologies() {
  const { isDarkMode } = useTheme(); // 🌗 Global theme hook
  const [animationError, setAnimationError] = useState(false);
  const color = useMotionValue(COLORS[0]);

  // Animate gradient colors
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

  if (animationError) {
    return (
      <SectionWrapper id="technologies">
        <h2 className="text-4xl font-bold text-center">Technologies</h2>
        <p className="text-center mt-4">
          Animation unavailable - content loading...
        </p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="technologies"
      className={`min-h-screen ${
        isDarkMode ? "text-white" : "text-[#06071f]"
      }`}
    >
      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-4 mt-20"
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
        Technologies
      </motion.h2>

      {/* Technologies Grid */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 max-w-6xl mt-20 mx-auto ${
          isDarkMode ? "text-white" : "text-[#06071f]"
        }`}
      >
        {technologies.map((tech, index) => (
          <TechnologyBox
            key={index}
            tech={tech}
            color={color}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

// 🟣 Technology Card Box
function TechnologyBox({ tech, color, isDarkMode }) {
  const borderColor = useTransform(color, (c) => c || "#13FFAA");
  const boxShadow = useTransform(color, (c) => `0px 4px 24px ${c || "#13FFAA"}`);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex flex-col items-center justify-center p-6 rounded-xl border text-center transition-transform duration-300 ease-in-out ${
        isDarkMode
          ? "bg-[#121826] border-gray-700"
          : "bg-gray-50 border-gray-300"
      }`}
      style={{
        borderColor,
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow,
      }}
    >
      <img
        src={tech.image}
        alt={tech.name}
        className="w-16 h-16 object-contain mb-4"
      />
      <h3 className="font-bold text-lg mb-2">{tech.name}</h3>
      <p
        className={`text-sm font-medium ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {tech.rate}% proficiency
      </p>
    </motion.div>
  );
}
