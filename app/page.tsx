"use client";

import { Github, Mail, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import ContactForm from "@/components/ContactForm";
import ProjectCard from "@/components/ProjectCard";
import TechStack from "@/components/TechStack";
import Navbar from "@/components/Navbar";
import AnimatedShapes from "@/components/AnimatedShapes";
import GradientButton from "@/components/GradientButton";
import CertificationSection from "@/components/CertificationSection";
import ResumeSection from "@/components/ResumeSection";

const projects = [
  {
    title: "Restaurant order manager",
    description:
      "Proyecto Full Stack que simula la gestión de pedidos y menús en un restaurante. Utiliza Node.js, Express, Sequelize y MySQL en el backend, y React con Material UI en el frontend.",
    githubUrl: "https://github.com/erwingsolorzano/restaurant-order-manager",
    tags: ["Node.js", "Express", "MYSQL", "React", "Material UI"],
  },
];

export default function Home() {
  const [text, setText] = useState("");
  const phrase = "Erwing Solorzano";

  // Efecto de "máquina de escribir"
  useEffect(() => {
    let index = 0;
    setText("");
    const interval = setInterval(() => {
      if (index <= phrase.length) {
        setText(phrase.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Para scroll suave a secciones
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Parallax
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 50, damping: 50, restDelta: 0.004 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  return (
    // 1) Quitamos overflow-hidden para que la página pueda hacer scroll
    <main className="min-h-screen relative">
      {/* Navbar con enlaces de scroll */}
      <Navbar />

      {/* 2) Contenedor del parallax en position fixed y z-[-10] para que no bloquee clics */}
      <div
        ref={parallaxRef}
        className="fixed inset-0 -z-10 pointer-events-none"
      >
        <motion.div
          style={{
            y: useTransform(smoothProgress, [0, 1], ["0%", "-50%"]),
            backgroundImage:
            "url('https://images.unsplash.com/photo-1603481546238-487240415921?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            // Al ser fixed, con 'height: 200%' puedes prolongar la imagen
            // para tener más margen en el efecto parallax
            height: "200%",
            width: "100%",
          }}
          className="absolute inset-0"
        />
        <AnimatedShapes scrollYProgress={smoothProgress} />
        {/* Capa de oscurecimiento */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center items-center px-4 relative pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center relative z-10"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 font-mono relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {text}
            <span className="ml-1 animate-blink">|</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Especializado en construir APIs robustas y escalables con Node.js,
            diseñar arquitecturas eficientes e implementar las mejores prácticas
            de desarrollo backend.
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <GradientButton href="https://github.com/erwingsolorzano" icon={Github}>
              GitHub
            </GradientButton>
            <GradientButton href="mailto:tuemail@example.com" icon={Mail}>
              Contacto
            </GradientButton>
          </motion.div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 z-10"
        >
          <ChevronDown
            className="h-8 w-8 cursor-pointer"
            onClick={() => scrollToSection("projects")}
          />
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

      {/* Estilo global para el cursor parpadeante */}
      <style jsx global>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </main>
  );
}
