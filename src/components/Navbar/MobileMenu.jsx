// components/Navbar/MobileMenu.jsx
export default function MobileMenu({ isMenuOpen, setIsMenuOpen, isDarkMode, scrollToSection }) {
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg ${
          isDarkMode ? "bg-[#93074d] text-white" : "bg-white text-black"
        }`}
      >
        <div className="p-6 relative">
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`absolute top-4 right-4 ${isDarkMode ? "text-white" : "text-black"}`}
          >
            ✕
          </button>

          <div className="mt-10 space-y-6">
            {["home", "resume", "technologies", "projects", "study", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => {
                  scrollToSection(section);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left text-lg font-medium transition-colors ${
                  isDarkMode ? "hover:text-gray-200" : "hover:text-gray-700"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        ></div>
      )}
    </>
  );
}
