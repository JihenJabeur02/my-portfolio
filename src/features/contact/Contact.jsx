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
  variant="auto"
  className={`${isDarkMode ? "text-white" : "text-[#06071f]"}`}
>
  {/* your form */}
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
