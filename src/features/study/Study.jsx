// src/features/study/Study.jsx
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import SectionWrapper from "../../components/common/SectionWrapper";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const studies = [
  {
    title: "Industrial Computer Engineering Student",
    school:
      "National School of Electronics and Telecommunications of Sfax, Tunisia",
    period: "2023 - Present",
  },
  {
    title: "Preparatory Cycle in Physics and Chemistry",
    school: "Faculty of Sciences of Sfax, Tunisia",
    period: "2020 - 2023",
  },
  {
    title: "Microsoft Certified: Azure AI Fundamentals",
    school: "Microsoft Certification – Cloud & AI Services",
    period: "December 2024",
  },
  {
    title: "DevOps & Fullstack Bootcamp",
    school:
      "SIP Academy – Spring Boot, Angular, and DevOps (Jenkins, CI/CD, Docker, GitHub, GitLab, Postman, JUnit5, etc.)",
    period: "Summer 2025",
  },
];

export default function Study() {
  const { isDarkMode } = useTheme();
  const [animationError, setAnimationError] = useState(false);
  const color = useMotionValue(COLORS[0]);

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

return (
  <SectionWrapper
    id="study"
    variant="full"
    className={`${isDarkMode ? "text-white" : "text-[#06071f]"}`}
  >
    <div className="text-center max-w-5xl">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-8"
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
        Study Path
      </motion.h2>

      <div className="space-y-4">
        {studies.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className={`border rounded-lg p-4 ${
              isDarkMode ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {item.school}
            </p>
            <span
              className={`block mt-1 text-sm ${
                isDarkMode ? "text-pink-400" : "text-pink-600"
              }`}
            >
              {item.period}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

}
