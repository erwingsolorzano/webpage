"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black/80 backdrop-blur-sm py-8 px-4 relative z-10 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-400">
        <p>© {currentYear} Erwing Solorzano. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}