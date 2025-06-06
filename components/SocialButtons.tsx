"use client";

import { Github, Mail, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

interface SocialButtonProps {
  href: string;
  tooltip: string;
  children: React.ReactNode;
  delay?: number;
}

function SocialButton({ href, tooltip, children, delay = 0 }: SocialButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.1,
        y: -5
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
        whileHover={{
          boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)"
        }}
      >
        {children}
      </motion.div>
      
      {/* Tooltip */}
      <motion.div
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        <div className="bg-black/80 backdrop-blur-sm text-white text-xs rounded-lg px-3 py-2 border border-white/10">
          {tooltip}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-black/80 rotate-45 border-l border-t border-white/10" />
        </div>
      </motion.div>
    </motion.a>
  );
}

export default function SocialButtons() {
  return (
    <div className="flex gap-6 justify-center">
      <SocialButton 
        href="https://github.com/erwingsolorzano" 
        tooltip="GitHub"
        delay={0}
      >
        <Github className="h-6 w-6 text-white" />
      </SocialButton>
      
      <SocialButton 
        href="mailto:erwing1394@gmail.com" 
        tooltip="Email"
        delay={0.1}
      >
        <Mail className="h-6 w-6 text-white" />
      </SocialButton>
      
      <SocialButton 
        href="https://linkedin.com/in/erwing-solorzano" 
        tooltip="LinkedIn"
        delay={0.2}
      >
        <Linkedin className="h-6 w-6 text-white" />
      </SocialButton>
    </div>
  );
}