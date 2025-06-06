"use client"; 

import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Smoother spring configurations
  const springConfig = { 
    mass: 0.1, 
    stiffness: 400, 
    damping: 40,
    restDelta: 0.001
  };
  
  // Hero parallax effects
  const heroY = useTransform(scrollY, [0, 800], [0, -200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.8]);
  
  // Background fade effect
  const backgroundOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  
  // Apply spring to all transforms
  const smoothHeroY = useSpring(heroY, springConfig);
  const smoothHeroOpacity = useSpring(heroOpacity, springConfig);
  const smoothHeroScale = useSpring(heroScale, springConfig);
  const smoothBackgroundOpacity = useSpring(backgroundOpacity, springConfig);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Enhanced GSAP animations with smoother easing
    gsap.set("*", { willChange: "auto" });
    
    // Stagger animations for better performance
    gsap.fromTo(".hero-element", 
      { 
        opacity: 0, 
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.3
      }
    );

    // Contact section reveal with better easing
    gsap.fromTo(contactRef.current,
      { 
        y: 100, 
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navbar />

      {/* Apple-style gradient background with scroll fade */}
      <div className="fixed inset-0 -z-20">
        <motion.div
          style={{ opacity: smoothBackgroundOpacity }}
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        />
        <motion.div
          style={{ opacity: smoothBackgroundOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
        />
        {/* Subtle animated gradient overlay */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Animated shapes with better performance */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <AnimatedShapes scrollYProgress={smoothProgress} />
      </div>

      <motion.section
        ref={heroRef}
        id="hero"
        className="min-h-screen flex flex-col justify-center items-center px-4 relative pt-20"
        style={{
          y: smoothHeroY,
          opacity: smoothHeroOpacity,
          scale: smoothHeroScale,
        }}
      >
        <motion.div
          className="max-w-4xl text-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Profile Picture */}
          <motion.div
            className="hero-element mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2
            }}
          >
            <div className="relative">
              <motion.div
                className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(255, 255, 255, 0.4)"
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                  alt="Erwing Solórzano"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  priority
                />
              </motion.div>
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
          
          <motion.h2
            className="hero-element text-3xl md:text-4xl font-light mb-4 text-gray-100 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4
            }}
          >
            Hello, I'm
          </motion.h2>
          
          <motion.h1
            className="hero-element text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.6
            }}
          >
            Erwing Solórzano
          </motion.h1>

          <motion.h2
            className="hero-element text-xl md:text-2xl font-light text-gray-300 mb-8 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.8
            }}
          >
            Software Engineer • FullStack Developer
          </motion.h2>

          <motion.p
            className="hero-element text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-12 font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 1.0
            }}
          >
            Con más de 3 años de experiencia en diseño y desarrollo de aplicaciones web, 
            busco brindar soluciones escalables y de alto rendimiento, priorizando buenas prácticas 
            y experiencias de usuario excepcionales.
          </motion.p>

          <motion.div
            className="hero-element flex gap-6 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 1.2
            }}
          >
            <SocialButtons />
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 12, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 z-10"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("projects")}
            className="cursor-pointer p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <ChevronDown className="h-6 w-6 text-white" />
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        id="projects"
        className="py-24 px-4 bg-black/40 backdrop-blur-sm relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Featured Projects
          </motion.h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
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
        className="bg-black/40 backdrop-blur-sm py-24 px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Tech Stack
          </motion.h2>
          <TechStack />
        </div>
      </motion.section>

      <motion.section
        ref={contactRef}
        id="contact"
        className="bg-black/40 backdrop-blur-sm py-24 px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Get In Touch
          </motion.h2>
          <ContactForm />
        </div>
      </motion.section>

      <Footer />
      <BackToTopButton />
    </main>
  );
}