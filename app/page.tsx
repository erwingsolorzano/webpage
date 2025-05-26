"use client"; 

import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

import ContactForm from "@/components/ContactForm";
import ProjectCard from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import Image from "next/image";
import SocialButtons from "@/components/SocialButtons";
import dynamic from "next/dynamic";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/webpage" : "";

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
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.75]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const springConfig = { mass: 0.5, stiffness: 100, damping: 30 };
  
  const smoothScale = useSpring(heroScale, springConfig);
  const smoothOpacity = useSpring(heroOpacity, springConfig);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { restDelta: 0 });

  return (
    <main className="min-h-screen relative">
      <Navbar />

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0, 0.5], [1, 0]),
            willChange: "transform",
          }}
          transition={{ type: "spring", stiffness: 100 }}
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

      <motion.section
        ref={heroRef}
        id="hero"
        className="min-h-screen flex flex-col justify-center items-center px-4 relative pt-20"
        style={{
          scale: smoothScale,
          opacity: smoothOpacity,
        }}
      >
        <motion.div
          className="max-w-4xl text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-semibold mb-4 text-gray-100 tracking-wide text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            Hi there!
          </motion.h2>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-2 font-[Consolas] bg-gradient-to-r from-purple-500 to-blue-300 bg-clip-text text-transparent py-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            I'm Erwing Solórzano
          </motion.h1>

          <motion.h2
            className="whitespace-nowrap font-semibold text-sm sm:text-base md:text-lg text-gray-300 leading-normal mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            Software Engineer • FullStack Developer
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            Más de 3 años de experiencia en diseño y desarrollo de aplicaciones web, busco brindar soluciones escalables y de alto rendimiento, priorizando buenas prácticas.
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
          >
            <SocialButtons />
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
      </motion.section>

      <motion.section
        id="projects"
        className="py-36 px-4 bg-background/45 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.2 }}
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
            transition={{ duration: 0.4 }}
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
                transition={{ duration: 0.4, delay: index * 0.2 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <ResumeSection />

      <motion.section
        id="tech-stack"
        className="bg-background/49 py-40 px-4 relative z-10"
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
      <BackToTopButton />
    </main>
  );
}