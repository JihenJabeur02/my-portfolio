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
      "Automated desktop solution that synchronizes administrative documents between GPC and STEG, reducing time and manual effort.",
    icon: "📝",
    pdfLink:
      "https://drive.google.com/file/d/1OE03ZK7oo465hSDsaiwK0yY5ra7F8ito/view?usp=drive_link",
  },
  {
    id: 2,
    title: "Industrial Product Monitoring Platform",
    shortDesc:
      "Real-time platform to visualize industrial machine performance, track parameters remotely, and support predictive maintenance.",
    icon: "📚",
    pdfLink:
      "https://drive.google.com/file/d/12muWD0Y9abJ6YENT-qPXLxisbkq-2sdY/view?usp=sharing",
  },
  {
    id: 3,
    title: "Smart Product Exchange Platform",
    shortDesc:
      "Developed a smart web platform with IoT integration to enable real-time product exchange and autonomous transportation.",
    icon: "🤖",
    pdfLink:
      "https://drive.google.com/file/d/1E4GeiEDDJR4mOMBl3x6eoFhH918Dl-_A/view?usp=sharing",
  },
  {
    id: 4,
    title:
      "Automated Tool for Transforming AndiSDK Protocol Decoder Tests into PcapPlusPlus Scripts",
    shortDesc: "",
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
    } catch (error) {
      console.error("Animation error:", error);
      setAnimationError(true);
    }
    return () => animation?.stop();
  }, [color]);

return (
  <SectionWrapper
    id="projects"
    variant="full"
    className={`${isDarkMode ? "text-white" : "text-[#06071f]"}`}
  >
    <div className="text-center max-w-6xl">
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
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl border text-center transition-all duration-300 ${
              isDarkMode
                ? "bg-[#121826] border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <div className="text-5xl mb-3">{project.icon}</div>
            <h3 className="font-bold text-lg mb-2">{project.title}</h3>
            <p
              className={`text-sm mb-3 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {project.shortDesc}
            </p>
            <a
              href={project.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-1.5 rounded-full text-white font-medium ${
                isDarkMode
                  ? "bg-pink-500 hover:bg-pink-600"
                  : "bg-[#06071f] hover:bg-[#1a1d2f]"
              }`}
            >
              View More
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

}
