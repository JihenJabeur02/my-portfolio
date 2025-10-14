<SectionWrapper
  id="resume"
  className={`relative flex flex-col items-center justify-center h-[calc(100vh-80px)] overflow-hidden ${
    isDarkMode ? "text-white" : "text-[#06071f]"
  }`}
  variant="static"
>
  <div className="max-w-4xl mx-auto px-4">
    {/* Animated Gradient Title */}
    <motion.h2
      className="text-4xl md:text-5xl font-bold mb-4 text-center"
      style={{
        backgroundImage: `linear-gradient(90deg, ${COLORS.join(", ")})`,
        WebkitBackgroundClip: "text",
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
      About Me
    </motion.h2>

    {/* Divider */}
    <motion.div
      className="h-1 w-20 mx-auto mb-6"
      style={{
        background: `linear-gradient(90deg, ${COLORS.join(", ")})`,
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
    />

    {/* Description */}
    <p
      className={`text-base sm:text-lg md:text-xl text-center mb-8 max-w-2xl mx-auto ${
        isDarkMode ? "text-gray-300" : "text-gray-700"
      }`}
    >
      I’m a Computer Industrial Engineering student at ENET'COM with a strong
      passion for software engineering. I specialize in full-stack
      development, desktop applications, and mobile apps — always exploring
      new technologies like DevOps and machine learning to build smarter,
      scalable solutions.
    </p>

    {/* Buttons Row */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
      <AnimatedButton
        title="Technologies"
        description="Explore the tools I master"
        color={color}
        onClick={() => scrollToSection("technologies")}
        isDarkMode={isDarkMode}
      />
      <AnimatedButton
        title="Projects"
        description="Check out my latest builds"
        color={color}
        onClick={() => scrollToSection("projects")}
        isDarkMode={isDarkMode}
      />
      <AnimatedButton
        title="Study"
        description="My academic journey"
        color={color}
        onClick={() => scrollToSection("study")}
        isDarkMode={isDarkMode}
      />
    </div>
  </div>
</SectionWrapper>
