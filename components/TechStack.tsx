"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/webpage" : "";

const technologies = [
  { name: "Node.js", icon: `${basePath}/nodedotjs.svg`, color: "from-green-400 to-green-600" },
  { name: "TypeScript", icon: `${basePath}/typescript.svg`, color: "from-blue-400 to-blue-600" },
  { name: "Express", icon: `${basePath}/express.svg`, color: "from-gray-400 to-gray-600" },
  { name: "Redis", icon: `${basePath}/redis.svg`, color: "from-red-400 to-red-600" },
  { name: "MySQL", icon: `${basePath}/mysql.svg`, color: "from-orange-400 to-orange-600" },
  { name: "MongoDB", icon: `${basePath}/mongodb.svg`, color: "from-green-400 to-green-600" },
  { name: "ReactJS", icon: `${basePath}/react.svg`, color: "from-cyan-400 to-cyan-600" },
  { name: "Docker", icon: `${basePath}/docker.svg`, color: "from-blue-400 to-blue-600" },
];

export default function TechStack() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{ 
            scale: 1.05,
            y: -10
          }}
          className="group flex flex-col items-center"
        >
          <motion.div
            className="relative w-20 h-20 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-4 overflow-hidden"
            whileHover={{
              borderColor: "rgba(255, 255, 255, 0.3)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient background on hover */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
            />
            
            {/* Glow effect */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${tech.color} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
              style={{ transform: "scale(1.5)" }}
            />
            
            <Image
              src={tech.icon}
              alt={tech.name}
              width={48}
              height={48}
              className="w-12 h-12 object-contain filter brightness-0 invert relative z-10 group-hover:scale-110 transition-transform duration-300"
            />
          </motion.div>
          
          <motion.span
            className="text-sm font-medium text-white group-hover:text-white transition-colors duration-300"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
          >
            {tech.name}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}