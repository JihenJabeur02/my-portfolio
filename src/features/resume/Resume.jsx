import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import SectionWrapper from "../../components/common/SectionWrapper";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function Resume() {
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
    <SectionWrapper id="resume">
      <motion.div className="absolute inset-0 -z-10" style={{ background }} />
      <h2 className="text-4xl font-bold mb-10">Resume</h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
        <Card title="Technologies" items={["React", "Node", "Docker"]} accent="#13FFAA" />
        <Card title="Projects" items={["Full-stack apps", "APIs", "Dashboards"]} accent="#1E67C6" />
        <Card title="Study" items={["OOP", "ML Basics", "DevOps"]} accent="#CE84CF" />
      </div>
    </SectionWrapper>
  );
}

function Card({ title, items, accent }) {
  return (
    <div
      className="rounded-xl p-6 text-center"
      style={{
        border: `2px solid ${accent}`,
        boxShadow: `0 10px 20px ${accent}33`,
      }}
    >
      <h3 style={{ color: accent }} className="text-xl font-semibold mb-3">
        {title}
      </h3>
      <ul className="space-y-1 text-sm opacity-90">
        {items.map((i, k) => (
          <li key={k}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}
