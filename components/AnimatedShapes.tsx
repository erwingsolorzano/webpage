"use client";

import { motion, useTransform, useAnimation, animate } from "framer-motion";
import { useEffect } from "react";

interface Shape {
  id: number;
  type: "circle" | "square" | "triangle";
  size: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
}

const shapes: Shape[] = [
  { id: 1, type: "circle", size: 120, x: 10, y: 10, rotation: 0, color: "rgba(255, 255, 255, 0.15)" },
  { id: 2, type: "square", size: 160, x: 70, y: 60, rotation: 45, color: "rgba(255, 255, 255, 0.12)" },
  { id: 3, type: "triangle", size: 140, x: 40, y: 80, rotation: 180, color: "rgba(255, 255, 255, 0.1)" },
  { id: 4, type: "circle", size: 180, x: 85, y: 30, rotation: 0, color: "rgba(255, 255, 255, 0.08)" },
  { id: 5, type: "square", size: 130, x: 20, y: 90, rotation: 30, color: "rgba(255, 255, 255, 0.11)" },
  { id: 6, type: "triangle", size: 150, x: 80, y: 70, rotation: 120, color: "rgba(255, 255, 255, 0.09)" },
];

const ShapeComponent = ({ shape, scrollYProgress }: { shape: Shape; scrollYProgress: any }) => {
  const controls = useAnimation();

  const xMotion = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (shape.x - 50) * 3]
  );
  
  const yMotion = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (shape.y - 50) * 3]
  );

  const rotateMotion = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shape.rotation * 3]
  );

  useEffect(() => {
    const randomMovement = () => {
      controls.start({
        x: [0, Math.random() * 20 - 10, 0],
        y: [0, Math.random() * 20 - 10, 0],
        rotate: [0, Math.random() * 20 - 10, 0],
        transition: {
          duration: 5 + Math.random() * 5,
          ease: "easeInOut",
          repeat: Infinity,
        },
      });
    };

    randomMovement();
  }, [controls]);

  const baseStyle = {
    x: xMotion,
    y: yMotion,
    rotate: rotateMotion,
    position: "absolute" as const,
    left: `${shape.x}%`,
    top: `${shape.y}%`,
    filter: "blur(1px)",
    mixBlendMode: "screen" as const,
  };

  if (shape.type === "circle") {
    return (
      <motion.div
        style={{
          ...baseStyle,
          width: shape.size,
          height: shape.size,
          backgroundColor: shape.color,
          borderRadius: "50%",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ ...controls, opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />
    );
  }

  if (shape.type === "square") {
    return (
      <motion.div
        style={{
          ...baseStyle,
          width: shape.size,
          height: shape.size,
          backgroundColor: shape.color,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ ...controls, opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />
    );
  }

  // Triangle
  const triangleStyle = {
    width: 0,
    height: 0,
    borderLeft: `${shape.size / 2}px solid transparent`,
    borderRight: `${shape.size / 2}px solid transparent`,
    borderBottom: `${shape.size}px solid ${shape.color}`,
  };

  return (
    <motion.div
      style={{
        ...baseStyle,
        ...triangleStyle,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ ...controls, opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

export default function AnimatedShapes({ scrollYProgress }: { scrollYProgress: any }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape) => (
        <ShapeComponent key={shape.id} shape={shape} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}