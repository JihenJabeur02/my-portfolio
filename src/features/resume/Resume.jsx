import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import SectionWrapper from "../../components/common/SectionWrapper";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function Resume() {
  const { isDarkMode } = useTheme();
  const color = useMotionValue(COLORS[0]);

  // Animated gradient background (same as Hero)
  const updateBackground = useTransform(color, (c) =>
    isDarkMode
      ? `radial-gradient(125% 125% at 50% 0%, #020617 50%, ${c})`
      : `radial-gradient(125% 125% at 50% 0%, #ffffff 50%, ${c})`
  );

  useEffect(() => {
    const controls = animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
    return () => controls.stop();
  }, [color]);

  return (
    <SectionWrapper
      id="resume"
      className="relative grid place-content-center min-h-screen overflow-hidden"
      variant="static"
    >
      {/* 🔵 Dynamic gradient background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ background: updateBackground }}
      />

      {/* 🧩 Resume content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full px-6">
        {/* 🔹 Fixed title */}
        <h1
          className={`absolute top-8 left-1/2 -translate-x-1/2 text-4xl font-bold ${
            isDarkMode ? "text-white" : "text-[#06071f]"
          }`}
        >
          Resume
        </h1>

        {/* 🔸 Content blocks */}
        <div className="mt-24 flex flex-col items-center justify-center gap-8 w-full max-w-5xl">
          {/* Education */}
          <motion.div
            className={`w-full rounded-2xl p-8 shadow-xl ${
              isDarkMode ? "bg-[#0b1120] text-white" : "bg-gray-100 text-[#06071f]"
            }`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-3 text-[#13FFAA]">
              Education
            </h2>
            <p className="text-lg">
              🎓 Bachelor’s in Computer Science — University of XYZ (2023)
            </p>
          </motion.div>

          {/* Experience */}
          <motion.div
            className={`w-full rounded-2xl p-8 shadow-xl ${
              isDarkMode ? "bg-[#0b1120] text-white" : "bg-gray-100 text-[#06071f]"
            }`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-3 text-[#1E67C6]">
              Experience
            </h2>
            <p className="text-lg">
              💼 Full-Stack Developer — Company ABC (2022–2024)
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            className={`w-full rounded-2xl p-8 shadow-xl ${
              isDarkMode ? "bg-[#0b1120] text-white" : "bg-gray-100 text-[#06071f]"
            }`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-3 text-[#CE84CF]">
              Skills
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-lg">
              <li>React.js</li>
              <li>Node.js</li>
              <li>Express</li>
              <li>MongoDB</li>
              <li>DevOps</li>
              <li>Git & GitHub</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
