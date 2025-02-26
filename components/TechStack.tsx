"use client";

import { motion } from "framer-motion";
import Image from "next/image";
const isProd = process.env.NODE_ENV === "production"
const basePath = isProd ? "/webpage" : ""

const technologies = [
  { name: "Node.js", icon: `${basePath}/nodedotjs.svg` },
  { name: "TypeScript", icon: `${basePath}/typescript.svg` },
  { name: "Express", icon: `${basePath}/express.svg` },
  { name: "Redis", icon: `${basePath}/redis.svg` },
  { name: "MySQL", icon: `${basePath}/mysql.svg` },
  { name: "MongoDB", icon: `${basePath}/mongodb.svg` },
  { name: "ReactJS", icon: `${basePath}/react.svg` },
  { name: "Docker", icon: `${basePath}/docker.svg` },
];

export default function TechStack() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 p-4 rounded-lg shadow border-2 flex items-center justify-center mb-2">
            <Image
              src={tech.icon}
              alt={tech.name}
              width={12}
              height={12}
              className="w-12 h-12 object-contain filter invert"
            />
          </div>
          <span className="text-sm font-medium">{tech.name}</span>
        </motion.div>
      ))}
    </div>
  );
}