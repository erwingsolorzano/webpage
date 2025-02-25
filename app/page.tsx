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
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import Image from "next/image";
import SocialButtons from "@/components/SocialButtons";


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
  const [typingComplete, setTypingComplete] = useState(false);
  const phrase = "Erwing Solorzano";
  const [shiftH1, setShiftH1] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
        setTypingComplete(true);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

    // Una vez terminado el typing, con un retardo, animamos el h1 hacia arriba
    useEffect(() => {
      if (typingComplete) {
        const timer = setTimeout(() => {
          setShiftH1(true);
        }, 500); // Retardo de 800ms, ajustable a tu gusto
        return () => clearTimeout(timer);
      }
    }, [typingComplete]);

  // Para scroll suave a secciones
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Parallax
  // 1) Medir el scroll de toda la página en lugar de un target específico:
  const { scrollYProgress } = useScroll();

  // 2) Aplicar un "spring" para suavizar el movimiento
  const springConfig = { stiffness: 20, damping: 10, restDelta: 0.004 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  return (
    <main className="min-h-screen relative">
      <Navbar />

      {/* Contenedor del parallax con posición fija y z-[-10] */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          style={{
            y: useTransform(smoothProgress, [0, 1], ["0%", "-70%"]),
            opacity: useTransform(smoothProgress, [0, 0.5], [1, 0])
          }}
          className="absolute inset-0 h-[200%] w-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1603481546238-487240415921?q=80&w=2070&auto=format&fit=crop"
            alt="Fondo parallax"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <AnimatedShapes scrollYProgress={smoothProgress} />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>


      {/* Hero Section */}
      <section id="hero" 
      className="min-h-screen flex flex-col justify-center items-center px-4 relative pt-32">
      {/* Título con efecto de "máquina de escribir" */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: -20 }}
        transition={{ duration: 2 }}
        className="max-w-4xl text-center relative z-10"
      >
        {/* h1 */}
        <motion.h1
          variants={{
            visible: { opacity: 1, y: -10 },
            shifted: { opacity: 1, y: 0 },
          }}
          initial="visible"
          animate={shiftH1 ? "shifted" : "visible"}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-5xl md:text-7xl font-bold mb-4 font-[Consolas] relative"
        >
          {text}
          {!typingComplete && (
            <span className="ml-1 animate-blink">_</span>
          )}
        </motion.h1>

        {/* 2) Solo mostramos los demás elementos si typingComplete === true */}
        {typingComplete && (
          <motion.h2
            className="text-2xl md:text-3xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              delay: 0.2
            }}
          >
            Full Stack Developer
          </motion.h2>
        )}

        {typingComplete && (
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              delay: 0.4
            }}
          >
            Apasionado por construir aplicaciones robustas y escalables, con
            experiencia en Node.js, diseño de arquitecturas eficientes e
            implementación de las mejores prácticas de desarrollo tanto en
            frontend como en backend.
          </motion.p>
        )}

        {typingComplete && (
          <motion.div
            className="flex gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              delay: 0.6
            }}
          >
              <SocialButtons />
          </motion.div>
        )}
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
        className="py-32 px-4 bg-background/45 backdrop-blur-sm relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
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
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
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

      {/* Certifications Section
      <CertificationSection /> */}

      {/* Resume Section */}
      <ResumeSection />

      {/* Tech Stack Section */}
      <motion.section
        id="tech-stack"
        className="bg-background/49 backdrop-blur-sm py-32 px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
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
        className="bg-background/49.5 backdrop-blur-sm py-32 px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Contacto
          </motion.h2>
          <ContactForm />
        </div>
      </motion.section>

      {/* Cursor parpadeante */}
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
      <Footer />

      {/* Botón de "Volver al inicio" */}
      <BackToTopButton />
    </main>
  );
}
