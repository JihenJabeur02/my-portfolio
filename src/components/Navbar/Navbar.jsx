import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext"; // ✅ global theme
import logo from "../../assets/images/logo.svg";
import logowhite from "../../assets/images/logowhite.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  // ✅ Fix: Dynamic background logic
  const getNavbarBg = () => {
    if (isDarkMode) {
      // Dark mode
      return scrolled ? "rgba(2, 6, 23, 0.9)" : "#020617";
    } else {
      // Light mode (always white)
      return "#ffffff";
    }
  };

  // ✅ Fix: Dynamic text color
  const getTextColor = () => (isDarkMode ? "white" : "#06071f");

  // ✅ Fix: Logo logic (dark/light + scroll)
  const getLogo = () => {
    if (isDarkMode) return logowhite;
    return logo;
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "shadow-lg" : ""
        }`}
        style={{
          backgroundColor: getNavbarBg(),
          color: getTextColor(),
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
          {/* Logo */}
          <img
            src={getLogo()}
            alt="Logo"
            className="h-8 sm:h-9 object-contain cursor-pointer"
            onClick={() => scrollToSection("home")}
          />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {["home", "resume", "technologies", "projects", "study", "contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize text-sm sm:text-base font-medium hover:text-pink-500 transition-transform hover:-translate-y-1`}
                  style={{ color: getTextColor() }}
                >
                  {item}
                </button>
              )
            )}

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="ml-2">
              {isDarkMode ? (
                // 🌙 Moon Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                // ☀️ Sun Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center space-x-4">
            {/* Theme Toggle */}
            <button onClick={toggleTheme}>
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`focus:outline-none`}
              style={{ color: getTextColor() }}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* SIDEBAR MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-64 sm:w-72 z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
        style={{
          backgroundColor: isDarkMode ? "#06071f" : "#ffffff",
          color: getTextColor(),
        }}
      >
        <div className="p-6 relative">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4"
          >
            ✕
          </button>

          <div className="mt-10 space-y-6">
            {["home", "resume", "technologies", "projects", "study", "contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left text-lg font-medium hover:text-pink-400 transition-colors"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* BACKDROP OVERLAY */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </>
  );
}
