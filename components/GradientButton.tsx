import { useState } from "react";

interface GradientButtonProps {
  children: string;
  icon: React.ElementType;
  href: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ children, icon: Icon, href }) => {
  const [position, setPosition] = useState({ x: "50%", y: "50%", opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x: `${x}%`, y: `${y}%`, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setPosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="relative inline-block">
      <button
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 px-6 py-3 flex items-center gap-2 border-2 border-white text-white font-semibold rounded-lg bg-black hover:bg-opacity-80 transition-all duration-300 overflow-hidden"
      >
        <div
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${position.x} ${position.y}, rgba(209, 249, 154, 0.23) 10%, rgba(255, 255, 255, 0) 60%)`,
            opacity: position.opacity,
          }}
        />
        <Icon className="h-5 w-5" /> {children}
      </button>
    </a>
  );
};

export default GradientButton;
