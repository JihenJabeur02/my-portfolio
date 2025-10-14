// src/features/hero/Hero.jsx
import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import jihenjabeur from "../../assets/images/JihenJabeur.png";
import { useTheme } from "../../context/ThemeContext";
import SectionWrapper from "../../components/common/SectionWrapper";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function Hero() {
  const { isDarkMode } = useTheme();
  const color = useMotionValue(COLORS[0]);

  const background = useTransform(color, (c) =>
    isDarkMode
      ? `radial-gradient(125% 125% at 50% 0%, #020617 50%, ${c})`
      : `radial-gradient(125% 125% at 50% 0%, #ffffff 50%, ${c})`
  );

  useEffect(() => {
    const controls = animate(color, COLORS, {
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [color]);

  return (
    <SectionWrapper id="home" className="text-center">
      <motion.div className="absolute inset-0 -z-10" style={{ background }} />

      {isDarkMode && (
        <div className="absolute inset-0 z-0">
          <Canvas style={{ pointerEvents: "none" }}>
            <Stars radius={100} count={3000} factor={4} fade speed={0.5} />
          </Canvas>
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.div
          className="w-64 h-64 rounded-full overflow-hidden border-4 mb-8"
          style={{ borderColor: color }}
        >
          <img src={jihenjabeur} alt="Profile" className="object-cover w-full h-full" />
        </motion.div>

        <h1 className="text-5xl font-bold mb-4">Hi, I’m Jihen Jabeur</h1>
        <p className="text-lg mb-8">Full-Stack Developer | DevOps-Minded</p>

        <motion.button
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }
          style={{ borderColor: color }}
          className="border px-6 py-2 rounded-full text-white hover:scale-105 transition"
        >
          Contact Me
        </motion.button>

        <div className="mt-12 flex gap-10 text-3xl">
          <a href="https://github.com/JihenJabeur02" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/jihen-jabeur-1170702a2/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
          <a href="mailto:jihenjabeur7@gmail.com">
            <FiMail />
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
