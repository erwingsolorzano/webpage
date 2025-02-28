"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/webpage" : "";

interface FlipProfileProps {
  // Puedes recibir clases personalizadas para ajustar el tamaño (por defecto 8rem x 8rem)
  className?: string;
}

export default function FlipProfile({
  className = "w-32 h-32 md:w-40 md:h-40",
}: FlipProfileProps) {
  const [flipped, setFlipped] = useState(false);

  // Variants para animar la rotación en Y
  const containerVariants = {
    unflipped: { rotateY: 0 },
    flipped: { rotateY: 180 },
  };

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onClick={() => setFlipped(!flipped)}
      animate={flipped ? "flipped" : "unflipped"}
      variants={containerVariants}
      transition={{ duration: 0.6, ease: "easeOut" }}
      // Establece la perspectiva para efecto 3D
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {/* Lado frontal */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{ backfaceVisibility: "hidden" }}
      >
        <Image
          src={`${basePath}/profilefront.jpg`}
          alt="Foto frontal"
          width={12}
          height={12}
          className="w-full h-full object-cover"
        />
      </motion.div>
      {/* Lado trasero */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        <Image
          src={`${basePath}/profileback.jpg`}
          alt="Foto frontal"
          width={12}
          height={12}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
