"use client";

import { Github, Mail, ChevronDown, Download, Award, Briefcase } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import ProjectCard from "@/components/ProjectCard";
import TechStack from "@/components/TechStack";
import Navbar from "@/components/Navbar";
import AnimatedShapes from "@/components/AnimatedShapes";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import CertificationSection from "@/components/CertificationSection";
import ResumeSection from "@/components/ResumeSection";

const projects = [
  {
    title: "API REST E-commerce",
    description:
      "API RESTful para e-commerce con Node.js y Express. Incluye autenticación JWT, validación de datos y documentación con Swagger.",
    githubUrl: "https://github.com/username/ecommerce-api",
    tags: ["Node.js", "Express", "MongoDB"],
  },
  {
    title: "Sistema de Microservicios",
    description:
      "Arquitectura de microservicios con Docker y Kubernetes. Implementación de patrones de diseño y comunicación asíncrona.",
    githubUrl: "https://github.com/username/microservices",
    tags: ["Docker", "Kubernetes", "RabbitMQ"],
  },
  {
    title: "Backend Gaming Platform",
    description:
      "Backend para plataforma de juegos online con websockets para tiempo real y sistema de matchmaking.",
    githubUrl: "https://github.com/username/gaming-platform",
    tags: ["Node.js", "Socket.io", "Redis"],
  },
];

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      <div ref={parallaxRef} className="absolute inset-0 -z-10">
        <motion.div
          style={{
            y: useTransform(smoothProgress, [0, 1], ["0%", "-50%"]),
            backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "120%",
            width: "100%"
          }}
          className="absolute inset-0"
        />
        <AnimatedShapes scrollYProgress={smoothProgress} />
        <div className="absolute inset-0 bg-background/90 backdrop-blur-[2px]" />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center relative z-10"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Backend Developer
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Especializado en construir APIs robustas y escalables con Node.js, diseñar arquitecturas eficientes y
            implementar las mejores prácticas en desarrollo backend.
          </motion.p>
          <motion.div 
            className="flex gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button variant="outline" size="lg" className="border-2">
              <Github className="mr-2 h-5 w-5" /> GitHub
            </Button>
            <Button variant="outline" size="lg" className="border-2">
              <Mail className="mr-2 h-5 w-5" /> Contacto
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 z-10"
        >
          <ChevronDown className="h-8 w-8 cursor-pointer" onClick={() => scrollToSection("projects")} />
        </motion.div>
      </section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-32 px-4 bg-background/80 backdrop-blur-sm relative z-10"
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
            Proyectos Destacados
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Certifications Section */}
      <CertificationSection />

      {/* Resume Section */}
      <ResumeSection />

      {/* Tech Stack Section */}
      <motion.section
        id="tech-stack"
        className="bg-background/90 backdrop-blur-sm py-32 px-4 relative z-10"
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
            Stack Tecnológico
          </motion.h2>
          <TechStack />
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="bg-background/80 backdrop-blur-sm py-32 px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Contacto
          </motion.h2>
          <ContactForm />
        </div>
      </motion.section>
    </main>
  );
}