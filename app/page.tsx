"use client";

import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

import ContactForm from "@/components/ContactForm";
import ProjectCard from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import Image from "next/image";
import SocialButtons from "@/components/SocialButtons";
import dynamic from "next/dynamic";

const isProd = process.env.NODE_ENV === "production"
const basePath = isProd ? "/webpage" : ""

const AnimatedShapes = dynamic(() => import("@/components/AnimatedShapes"), { ssr: false });
const ResumeSection = dynamic(() => import("@/components/ResumeSection"), { ssr: false });
const TechStack = dynamic(() => import("@/components/TechStack"), { ssr: false });


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
  const phrase = "I'm Erwing Solórzano";
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
  const springConfig = { stiffness: 20, damping: 8, restDelta: 0.001 };

  const smoothProgress = useSpring(scrollYProgress, springConfig);

  return (
    <main className="min-h-screen relative">
      <Navbar />

      {/* Contenedor del parallax con posición fija y z-[-10] */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          style={{
            y: useTransform(smoothProgress, [0, 1], ["0%", "-70%"]),
            opacity: useTransform(smoothProgress, [0, 0.5], [1, 0]),
            willChange: "transform",
          }}
          className="absolute inset-0 h-[220%] w-full"
        >
          <Image
            src={`${basePath}/tiny-bg.webp`}
            alt="Fondo parallax"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <AnimatedShapes scrollYProgress={smoothProgress} />
        <div className="absolute inset-0 bg-black/20" />
      </div>


      {/* Hero Section */}
      <section id="hero" 
      className="min-h-screen flex flex-col justify-center items-center px-4 relative pt-30">
      {/* Saludo inicial */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-semibold mb-6 text-gray-100 tracking-wide text-center"
      >
        Hi there!
      </motion.h2>

      {/* Contenedor para el texto principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* Título principal con gradiente */}
        <motion.h1
          variants={{
            visible: { opacity: 1, y: 0 },
            shifted: { opacity: 1, y: -10 },
          }}
          initial="visible"
          animate={shiftH1 ? "shifted" : "visible"}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="
            relative 
            text-5xl md:text-7xl 
            font-bold 
            mb-4
            font-[Consolas] 
            bg-gradient-to-r 
            from-purple-500 
            to-blue-300 
            bg-clip-text 
            text-transparent
            py-2
          "
        >
          {text}
        </motion.h1>

        {/* Subtítulo (solo aparece cuando termina el typing) */}
        {typingComplete && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="
            whitespace-nowrap
            font-semibold
            text-s       /* Tamaño base en pantallas muy pequeñas */
            sm:text-m    /* Escala en pantallas 'sm' (640px) */
            md:text-base  /* Aún más grande en 'md' (768px) */
            lg:text-lg    /* Y en pantallas mayores */
            text-gray-300
            leading-normal
            mb-4
          "
          >
            Software Engineer&nbsp;&nbsp;•&nbsp;&nbsp;FullStack Developer
          </motion.h2>
        )}

        {/* Descripción (solo aparece cuando termina el typing) */}
        {typingComplete && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-4"
          >
            Me enfoco en desarrollar aplicaciones robustas y escalables aplicando las mejores
            prácticas y arquitecturas eficientes.
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
      {typingComplete && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-24 z-10"
        >
          <ChevronDown
            className="h-8 w-8 cursor-pointer"
            onClick={() => scrollToSection("projects")}
          />
        </motion.div>
      )}
      </section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-32 px-4 bg-background/45 relative z-10"
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

      {/* Resume Section */}
      <ResumeSection />

      {/* Tech Stack Section */}
      <motion.section
        id="tech-stack"
        className="bg-background/49 py-32 px-4 relative z-10"
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
        className="bg-background/49.5 py-32 px-4 relative z-10"
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
