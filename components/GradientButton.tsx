"use client";

import { useState } from "react";

interface GradientButtonProps {
  children: string;
  icon: React.ElementType;
  href: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ children, icon: Icon, href }) => {
  const [effect, setEffect] = useState({ x: "50%", y: "50%", opacity: 0, scale: 1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setEffect({ x: `${x}%`, y: `${y}%`, opacity: 1, scale: 1.2 });
  };

  const handleMouseLeave = () => {
    setEffect((prev) => ({ ...prev, opacity: 0, scale: 1 }));
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="relative inline-block">
      <button
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 px-6 py-3 flex items-center gap-2 border-2 border-white text-white font-semibold rounded-lg bg-black hover:bg-opacity-100 transition-all duration-300 overflow-hidden"
      >
        <div
          className="absolute inset-0 transition-all duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${effect.x} ${effect.y}, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)`,
            opacity: effect.opacity,
            transform: `scale(${effect.scale})`,
          }}
        />
        <Icon className="h-5 w-5" /> {children}
      </button>
    </a>
  );
};

export default GradientButton;
