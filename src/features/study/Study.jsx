// src/features/study/Study.jsx
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext"; // ✅ use your global theme

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
  const { isDarkMode } = useTheme(); // ✅ global dark/light toggle
  const [animationError, setAnimationError] = useState(false);
  const color = useMotionValue(COLORS[0]);

  // Animate the gradient colors
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
      <section id="study" className="min-h-screen text-white p-8 bg-[#0e141f]">
        <h2 className="text-4xl font-bold text-center">About My Study</h2>
        <p className="text-center mt-4 text-gray-500">
          Animation unavailable - content loading...
        </p>
      </section>
    );
  }

  return (
    <section
      id="study"
      className={`min-h-screen w-screen px-6 py-20 transition-colors duration-500 ${
        isDarkMode ? "text-white" : "text-[#06071f]"
      }`}
      style={{
        backgroundColor: isDarkMode ? "#0e141f" : "#ffffff", // ✅ keep background logic here
        overflowX: "hidden", // ✅ prevent horizontal scroll
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col justify-start">
        {/* Animated Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 mt-10 text-center"
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
          About My Study
        </motion.h2>

        {/* Education timeline */}
        <div className="flex flex-col gap-10">
          {studies.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6 ${
                isDarkMode ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.school}
                </p>
              </div>
              <span
                className={`text-lg font-semibold mt-2 md:mt-0 ${
                  isDarkMode ? "text-pink-400" : "text-pink-600"
                }`}
              >
                {item.period}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
