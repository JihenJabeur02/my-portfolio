// components/Navbar/NavButton.jsx
export default function NavButton({ label, section, scrollToSection, isDarkMode }) {
  return (
    <button
      onClick={() => scrollToSection(section)}
      className={`nav-button ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      {label}
    </button>
  );
}
