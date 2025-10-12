// src/features/contact/Contact.jsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useTheme } from "../../context/ThemeContext";
import SectionWrapper from "../../components/common/SectionWrapper";

export default function ContactPage() {
  const { isDarkMode } = useTheme(); // 🌗 Global theme hook
  const formRef = useRef(null);
  const [status, setStatus] = useState({ sending: false, ok: null, msg: "" });

  // EmailJS credentials (from .env)
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const name = form.user_name.value.trim();
    const message = form.message.value.trim();

    if (!name || !message) {
      setStatus({
        sending: false,
        ok: false,
        msg: "Please fill in your name and message.",
      });
      return;
    }

    try {
      setStatus({ sending: true, ok: null, msg: "" });

      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });

      setStatus({
        sending: false,
        ok: true,
        msg: "Message sent successfully! 🎉",
      });
      form.reset();
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus({
        sending: false,
        ok: false,
        msg: "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <SectionWrapper
      id="contact"
      className={`flex justify-center items-center min-h-screen ${
        isDarkMode ? "text-white" : "text-[#06071f]"
      }`}
    >
      {/* Outer Animated Border */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          background: "linear-gradient(270deg, #DD335C, #1E67C6, #13FFAA, #DD335C)",
          backgroundSize: "600% 600%",
          padding: "4px",
          borderRadius: "1.5rem",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {/* Inner Box */}
        <div
          className={`rounded-3xl p-10 ${
            isDarkMode
              ? "bg-[#020617]/70 backdrop-blur-md"
              : "bg-white/70 backdrop-blur-md"
          }`}
        >
          {/* Title */}
          <h2
            className={`text-4xl font-extrabold text-center mb-6 ${
              isDarkMode ? "text-white" : "text-[#06071f]"
            }`}
          >
            Contact Me
          </h2>

          {/* Status Message */}
          {status.msg && (
            <div
              className={`mb-4 p-3 rounded-md border text-center ${
                status.ok
                  ? isDarkMode
                    ? "border-green-400 bg-green-800/20 text-green-300"
                    : "border-green-500 bg-green-100 text-green-800"
                  : isDarkMode
                  ? "border-red-400 bg-red-800/20 text-red-300"
                  : "border-red-500 bg-red-100 text-red-800"
              }`}
            >
              {status.msg}
            </div>
          )}

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <InputField
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              isDarkMode={isDarkMode}
            />
            <InputField
              type="email"
              name="reply_to"
              placeholder="Your Email"
              required
              isDarkMode={isDarkMode}
            />
            <TextArea
              name="message"
              placeholder="What do you want to say?"
              required
              isDarkMode={isDarkMode}
            />

            <motion.button
              type="submit"
              whileHover={{
                scale: status.sending ? 1 : 1.05,
                y: status.sending ? 0 : -3,
              }}
              whileTap={{ scale: status.sending ? 1 : 0.98 }}
              disabled={status.sending}
              className={`py-3 rounded-full font-semibold transition-all ${
                isDarkMode
                  ? "bg-[#020617]/60 text-white border border-white hover:shadow-[0_0_15px_#fff]"
                  : "bg-[#f3f4f6] text-[#06071f] border border-gray-400 hover:shadow-[0_0_10px_#aaa]"
              }`}
              style={{
                cursor: status.sending ? "not-allowed" : "pointer",
                opacity: status.sending ? 0.7 : 1,
              }}
            >
              {status.sending ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

// 🔹 Input Component
function InputField({ type, name, placeholder, required, isDarkMode }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className={`w-full rounded-md p-3 border-2 focus:outline-none focus:ring-2 transition-all ${
        isDarkMode
          ? "bg-transparent text-white border-gray-400 focus:ring-pink-400"
          : "bg-white text-[#06071f] border-gray-300 focus:ring-pink-500"
      }`}
    />
  );
}

// 🔹 TextArea Component
function TextArea({ name, placeholder, required, isDarkMode }) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      rows="5"
      required={required}
      className={`w-full rounded-md p-3 border-2 resize-none focus:outline-none focus:ring-2 transition-all ${
        isDarkMode
          ? "bg-transparent text-white border-gray-400 focus:ring-pink-400"
          : "bg-white text-[#06071f] border-gray-300 focus:ring-pink-500"
      }`}
    />
  );
}
