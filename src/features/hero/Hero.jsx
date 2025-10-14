import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import jihenjabeur from "../../assets/images/JihenJabeur.png";
import { useTheme } from "../../context/ThemeContext"; // ✅ global theme
import SectionWrapper from "../../components/common/SectionWrapper"; // ✅ wrapper component

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function Hero() {
  const { isDarkMode } = useTheme(); // ✅ access global theme
  const color = useMotionValue(COLORS[0]);

  // Animated background color transitions
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

  // Smooth scroll function
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SectionWrapper
      id="home"
      className="relative grid place-content-center overflow-hidden min-h-screen"
      variant="static"
    >
      {/* Dynamic gradient background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ background: updateBackground }}
      />

      {/* Stars only visible in dark mode */}
      {isDarkMode && (
        <div className="absolute inset-0 z-0">
          <Canvas style={{ pointerEvents: "none" }}>
            <Stars radius={100} count={3000} factor={4} fade speed={0.5} />
          </Canvas>
        </div>
      )}

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-10 sm:py-12">
        {/* Profile image */}
        <div className="relative w-full flex justify-center mb-8">
          <CircularImage color={color} />
        </div>

        {/* Texts */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Hi, I'm Jihen Jabeur
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Full-Stack Developer | DevOps-Minded
          </p>
        </div>

        {/* Contact button */}
        <AnimatedButton color={color} scrollToSection={scrollToSection} />

        {/* Social icons */}
        <div className="mt-12 flex justify-center gap-12 sm:gap-20">
          {[
            { Icon: FaGithub, href: "https://github.com/JihenJabeur02" },
            { Icon: FaLinkedin, href: "https://www.linkedin.com/in/jihen-jabeur-1170702a2/" },
            { Icon: FiMail, href: "mailto:jihenjabeur7@gmail.com" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl sm:text-3xl transition-transform duration-300 hover:scale-125 ${
                isDarkMode ? "text-white" : "text-[#06071f]"
              }`}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

// 🔵 Circular profile image
function CircularImage({ color }) {
  const borderColor = useTransform(color, (c) => c);
  return (
    <motion.div
      className="z-10"
      style={{
        width: 260,
        height: 320,
        borderRadius: "50%",
        border: "3px solid",
        borderColor,
        overflow: "hidden",
      }}
    >
      <img
        src={jihenjabeur}
        alt="Profile"
        className="w-full h-full object-cover rounded-full"
      />
    </motion.div>
  );
}

// 🟣 Animated button
function AnimatedButton({ color, scrollToSection }) {
  const borderColor = useTransform(color, (c) => c);
  const boxShadow = useTransform(color, (c) => `0px 4px 24px ${c}`);
  const buttonBg = "rgba(2, 6, 23, 0.5)";

  return (
    <motion.button
      onClick={() => scrollToSection("contact")}
      className="flex h-10 w-40 items-center justify-center rounded-full mx-auto text-white transform-gpu transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        background: buttonBg,
        borderColor,
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow,
      }}
    >
      Contact Me
    </motion.button>
  );
}
