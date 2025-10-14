import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

// If your navbar is fixed and ~72px tall, set this so the title doesn't hide under it.
const NAV_HEIGHT_PX = 72;

export default function Resume() {
  const { isDarkMode } = useTheme();
  const color = useMotionValue(COLORS[0]);

  // Same animated gradient as Hero
  const bg = useTransform(color, (c) =>
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
    <section id="resume" className="relative h-screen overflow-hidden">
      {/* Animated background */}
      <motion.div className="absolute inset-0 -z-10" style={{ background: bg }} />

      {/* Title fixed within the section (stays at top of this section) */}
      <h1
        className={`absolute left-1/2 -translate-x-1/2 text-4xl font-bold ${
          isDarkMode ? "text-white" : "text-[#06071f]"
        }`}
        style={{ top: NAV_HEIGHT_PX + 16 }} // a bit below navbar
      >
        Resume
      </h1>

      {/* Content area is the viewport minus the title/nav space */}
      <div
        className="absolute inset-x-0 flex items-center justify-center px-6"
        style={{
          top: NAV_HEIGHT_PX + 72, // leave room for the title area
          bottom: 24,               // small breathing space
        }}
      >
        {/* One-screen layout (no window scroll). If content ever overflows, it will clip, not push page. */}
        <div className="w-full max-w-6xl grid gap-8">
          {/* Intro paragraph — keep it concise so everything fits in one screen */}
          <p
            className={`mx-auto max-w-3xl text-center leading-relaxed text-balance ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            I am a Computer Industrial Engineering student at ENET'COM focused on
            software engineering. I specialize in web, desktop, and mobile
            development, with interests in DevOps and ML to build scalable
            solutions.
          </p>

          {/* Cards row — three boxes fit a single row on md+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card
              title="Technologies"
              accent="#13FFAA"
              items={[
                "React • Node • Express",
                "MongoDB • PostgreSQL",
                "Docker • CI/CD",
              ]}
              dark={isDarkMode}
            />
            <Card
              title="Projects"
              accent="#1E67C6"
              items={[
                "Full-stack apps",
                "APIs & dashboards",
                "Mobile (React Native)",
              ]}
              dark={isDarkMode}
            />
            <Card
              title="Study"
              accent="#CE84CF"
              items={[
                "Algorithms & DS",
                "OOP • Systems",
                "AI/ML basics",
              ]}
              dark={isDarkMode}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ title, items, accent, dark }) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-xl border ${
        dark ? "bg-[#0b1120] text-white border-white/10" : "bg-gray-100 text-[#06071f] border-black/10"
      }`}
      style={{ boxShadow: `0 10px 30px ${accent}33` }}
    >
      <h3 className="text-xl font-semibold mb-3" style={{ color: accent }}>
        {title}
      </h3>
      <ul className="space-y-2 text-sm opacity-90">
        {items.map((t, i) => (
          <li key={i}>• {t}</li>
        ))}
      </ul>
    </div>
  );
}
