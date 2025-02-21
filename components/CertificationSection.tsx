"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    organization: "Amazon Web Services",
    date: "2024",
    icon: "https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
  },
  {
    title: "Professional Scrum Master I",
    organization: "Scrum.org",
    date: "2023",
    icon: "https://images.credly.com/images/a2790314-008a-4c3d-9553-f5e84eb359ba/image.png",
  },
  {
    title: "MongoDB Certified Developer",
    organization: "MongoDB University",
    date: "2023",
    icon: "https://images.credly.com/images/2f7b0627-48a0-4894-8d46-3245bdfe0463/image.png",
  },
];

export default function CertificationSection() {
  return (
    <motion.section
      id="certifications"
      className="py-32 px-4 bg-background/90 backdrop-blur-sm relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Certificaciones
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-background/50 backdrop-blur-sm p-8 rounded-2xl border-2 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-center mb-6">
                <img
                  src={cert.icon}
                  alt={cert.title}
                  className="w-24 h-24 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">{cert.title}</h3>
              <p className="text-muted-foreground text-center mb-2">{cert.organization}</p>
              <p className="text-sm text-center text-muted-foreground">{cert.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}