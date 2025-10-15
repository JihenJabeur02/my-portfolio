import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext"; // ✅ global theme
import logowhite from "../../assets/images/logowhite.svg"; // ✅ dark mode logo only

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  // ✅ Force dark mode once at mount
  useEffect(() => {
    if (!isDarkMode) toggleTheme(); // Force switch to dark if light
  }, []); // only on mount

  // Handle scroll shadow
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

  // ✅ All fixed values for dark mode
  const navbarBg = scrolled ? "rgba(2, 6, 23, 0.9)" : "#020617";
  const textColor = "white";

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "shadow-lg" : ""
        }`}
        style={{
          backgroundColor: navbarBg,
          color: textColor,
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
          {/* Logo */}
          <img
            src={logowhite}
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
                  className="capitalize text-sm sm:text-base font-medium hover:text-pink-500 transition-transform hover:-translate-y-1"
                  style={{ color: textColor }}
                >
                  {item}
                </button>
              )
            )}

            {/* 🌙 Theme Toggle (disabled) */}
            <button
              disabled
              className="ml-2 opacity-40 cursor-not-allowed"
              title="Light mode temporarily disabled"
            >
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
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center space-x-4">
            {/* Disabled Theme Toggle */}
            <button
              disabled
              className="opacity-40 cursor-not-allowed"
              title="Light mode disabled"
            >
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
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
              style={{ color: textColor }}
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
          backgroundColor: "#06071f",
          color: textColor,
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

      {/* BACKDROP */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </>
  );
}
