"use client";

import { motion } from "framer-motion";
import { Briefcase, Download, GraduationCap, Award, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const MotionButton = motion(Button);

const experiences = [
  {
    title: "Ingeniero de Software",
    company: "Equasystems S.A.S",
    period: "2022 - Actualidad",
    location: "Guayaquil, Ecuador",
    // description: "Developed custom solutions with Node.js and MySQL, implemented reports in DevExpress/Windows Forms, and managed versions in GitHub. Additionally, optimized databases, integrated APIs, and performed code reviews and unit testing to ensure application quality and security.",
    description: "Desarrollé soluciones personalizadas con Node.js y MySQL, implementé informes en DevExpress/Windows Forms y gestioné versiones en GitHub. Además, optimicé bases de datos, integré APIs y realicé revisiones de código y pruebas unitarias para garantizar la calidad y seguridad de las aplicaciones.",  
    tags: ["Node.js", "MySQL", "EJS", "React", "Express", "Redis", "AWS"],
    achievements: [
      // "Reduced database query time by 40% through optimization",
      "Mejoré el performance de un modulo de reclamos, optimizando el codigo siguiendo las buenas prácticas de programación",
      "Tomé decisiones clave en el desarrollo de diferentes componentes de la aplicación, mejorando la eficiencia y escalabilidad del sistema",
      "Participé en los deployments de la aplicación, asegurando una transición fluida y sin interrupciones",
    ]
  },
  {
    title: "IT Leader",
    company: "Grant Thornton Ecuador",
    period: "2020 - 2022",
    location: "Guayaquil, Ecuador",
    tags: ["Node.js", "Angular", "jQuery", "MongoDB", "Azure AD"],
    // description: "Managed cloud platforms (Azure AD) and developed web applications. Implemented and maintained a Node.js/jQuery application, powered by Angular, for managing electronic receipts from SRI.",
    description: "Gestioné plataformas en la nube (Azure AD) y desarrollé aplicaciones web. Implementé y mantuve una aplicación Node.js/jQuery, impulsada por Angular, para gestionar recibos electrónicos del SRI.",
    achievements: [
      // "Managed Azure AD for 200+ users",
      "Gestioné Azure AD para más de 20+ usuarios",
      // "Developed electronic receipt management system",
      "Brindé soporte y desarrollé mejoras para un sistema de gestión de recibos electrónicos del Servicio de Rentas Internas del Ecuador (SRI)",
      // "Improved system reliability by 35%"
      "Implementé un aula virtual y desarrollé un programa de capacitaciones internas a los empleados",
    ]
  },
];

const education = [
  {
    degree: "Ingeniería en Sistemas",
    institution: "Universidad Politécnica Salesiana",
    period: "2012 - 2021",
    location: "Guayaquil, Ecuador"
  }
];

const certifications = [
  {
    name: "Node.js intermedio",
    issuer: "HackerRank",
    year: "2025",
    url: "https://www.hackerrank.com/certificates/iframe/75355a42bda5"
  },
  {
    name: "Desarrollo de Aplicaciones Web",
    issuer: "SOL&TECH",
    year: "2022",
    url: "https://drive.google.com/file/d/12w-M0zTLI9AclyymdhUOOp9AT6f9ZMp5/view?usp=sharing"
  }
];

const cvURL = "https://drive.google.com/file/d/18p7Ud7s9ewr6Gy55obNY7bnFfAvrFLO_/view?usp=sharing";

export default function ResumeSection() {
  return (
    <motion.section
      id="resume"
      className="py-24 px-4 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 pb-2 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            {/* Professional Journey */}
            Trayectoria Profesional
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-light">
            {/* Transforming ideas into scalable solutions with cutting-edge technology */}
            Transformando ideas en soluciones escalables con tecnología de vanguardia
          </p>
          
          <MotionButton
            variant="outline"
            asChild
            className="group relative overflow-hidden border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 text-white shadow-2xl px-8 py-3 text-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ boxShadow: "0 0 0 rgba(255, 255, 255, 0)" }}
            animate={{
              boxShadow: [
                "0 0 0 rgba(255, 255, 255, 0)",
                "0 0 30px 10px rgba(255, 255, 255, 0.1)",
                "0 0 0 rgba(255, 255, 255, 0)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <a href={cvURL} target="_blank" rel="noopener noreferrer">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative flex items-center gap-3">
                <Download className="h-5 w-5" />
                {/* Download Resume */}
                Descargar CV
              </span>
            </a>
          </MotionButton>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Experience Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              {/* <h3 className="text-2xl font-bold text-white">Experience</h3> */}
              <h3 className="text-2xl font-bold text-white">Experiencia</h3>
            </div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative"
                >
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                  
                  <motion.div
                    className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">{exp.title}</h4>
                        <p className="text-purple-300 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-gray-300 text-sm mb-1">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>
                    
                    {exp.achievements && (
                      <div className="mb-6">
                        <h5 className="text-white font-semibold mb-3">Key Achievements:</h5>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white rounded-full border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education & Certifications */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                {/* <h3 className="text-xl font-bold text-white">Education</h3> */}
                <h3 className="text-xl font-bold text-white">Educación</h3>
              </div>
              
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <h4 className="text-lg font-semibold text-white mb-2">{edu.degree}</h4>
                  <p className="text-green-300 font-medium mb-1">{edu.institution}</p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Calendar className="h-3 w-3" />
                    {edu.period}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="h-3 w-3" />
                    {edu.location}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm">
                  <Award className="h-6 w-6 text-white" />
                </div>
                {/* <h3 className="text-xl font-bold text-white">Certifications</h3> */}
                <h3 className="text-xl font-bold text-white">Certificaciones</h3>
              </div>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <h4 className="text-white font-semibold mb-1">{cert.name}</h4>
                    <p className="text-orange-300 text-sm font-medium mb-1">{cert.issuer}</p>
                    <p className="text-gray-400 text-sm">{cert.year}</p>
                    <a className="text-blue-200 text-sm font-small mb-1" href={cert.url} target="_blank">visualizar</a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}