// src/features/projects/Projects.jsx
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import SectionWrapper from "../../components/common/SectionWrapper";

const projects = [
  {
    id: 1,
    title: "Automated PDF Management and Data Synchronization System",
    shortDesc:
      "Automated desktop solution synchronizing administrative documents between GPC and STEG, reducing manual effort.",
    icon: "📝",
    pdfLink:
      "https://drive.google.com/file/d/1OE03ZK7oo465hSDsaiwK0yY5ra7F8ito/view?usp=drive_link",
  },
  {
    id: 2,
    title: "Industrial Product Monitoring Platform",
    shortDesc:
      "Real-time platform visualizing machine performance and enabling predictive maintenance for improved efficiency.",
    icon: "📚",
    pdfLink:
      "https://drive.google.com/file/d/12muWD0Y9abJ6YENT-qPXLxisbkq-2sdY/view?usp=sharing",
  },
  {
    id: 3,
    title: "Smart Product Exchange Platform",
    shortDesc:
      "Smart IoT web platform enabling real-time product exchange and autonomous industrial transport.",
    icon: "🤖",
    pdfLink:
      "https://drive.google.com/file/d/1E4GeiEDDJR4mOMBl3x6eoFhH918Dl-_A/view?usp=sharing",
  },
  {
    id: 4,
    title:
      "Automated Tool for Transforming AndiSDK Protocol Tests into PcapPlusPlus Scripts",
    shortDesc:
      "Automation tool converting AndiSDK test data into executable PcapPlusPlus scripts for streamlined debugging.",
    icon: "🌐",
    pdfLink:
      "https://drive.google.com/file/d/1i0bsEPgzwREBNp4CDOf9zzdSX2k6SpfJ/view?usp=sharing",
  },
];

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function Projects() {
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
    } catch (err) {
      console.error("Animation error:", err);
      setAnimationError(true);
    }
    return () => animation?.stop();
  }, [color]);

  return (
    <SectionWrapper id="projects" className="h-screen flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col justify-center">
        {/* Animated Gradient Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
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
          About My Projects
        </motion.h2>

        {/* Project Grid - smaller boxes */}
        <div
          className={`grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 px-4 sm:px-8 ${
            isDarkMode ? "text-white" : "text-[#06071f]"
          }`}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.05 }}
              className={`rounded-xl shadow-md p-4 flex flex-col items-center text-center border transition-all duration-300
                ${
                  isDarkMode
                    ? "bg-[#121826] border-gray-700"
                    : "bg-white border-gray-200"
                }`}
            >
              <div className="text-4xl mb-2">{project.icon}</div>
              <h3 className="text-sm font-semibold mb-1">{project.title}</h3>
              <p
                className={`text-xs mb-3 leading-snug ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {project.shortDesc}
              </p>
              <a
                href={project.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full text-white bg-pink-500 hover:bg-pink-600 transition-transform hover:scale-105"
              >
                Learn More &gt;
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
