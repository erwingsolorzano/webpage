"use client";

import { motion } from "framer-motion";
import { Briefcase, Download, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const experiences = [
  {
    title: "Senior Backend Developer",
    company: "Tech Solutions Inc.",
    period: "2022 - Presente",
    description: "Liderazgo técnico en el desarrollo de microservicios y APIs escalables.",
  },
  {
    title: "Backend Developer",
    company: "Digital Innovations",
    period: "2020 - 2022",
    description: "Desarrollo de sistemas distribuidos y optimización de bases de datos.",
  },
  {
    title: "Full Stack Developer",
    company: "StartUp Vision",
    period: "2018 - 2020",
    description: "Implementación de soluciones end-to-end para aplicaciones web.",
  },
];

export default function ResumeSection() {
  return (
    <motion.section
      id="resume"
      className="py-32 px-4 bg-background/48 backdrop-blur-sm relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Experiencia Profesional</h2>
          <Button variant="outline" size="lg" className="border-2">
            <Download className="mr-2 h-5 w-5" /> Descargar CV
          </Button>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative pl-8 border-l-2 border-primary/30"
            >
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-primary/30 border-4 border-background" />
              <div className="bg-background/50 backdrop-blur-sm p-8 rounded-2xl border-2 hover:border-primary/50 transition-colors">
                <h3 className="text-2xl font-semibold mb-2">{exp.title}</h3>
                <p className="text-primary mb-2">{exp.company}</p>
                <p className="text-sm text-muted-foreground mb-4">{exp.period}</p>
                <p className="text-muted-foreground">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}