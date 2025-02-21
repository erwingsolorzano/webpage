"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para hacer scroll suave a la sección
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Links de navegación
  const NavLinks = () => (
    <>
      <button
        onClick={() => scrollToSection("hero")}
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Inicio
      </button>
      <button
        onClick={() => scrollToSection("projects")}
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Proyectos
      </button>
      <button
        onClick={() => scrollToSection("tech-stack")}
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Tecnologías
      </button>
      <button
        onClick={() => scrollToSection("contact")}
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Contacto
      </button>
    </>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Marca que lleva al Hero */}
        <button
          onClick={() => scrollToSection("hero")}
          className="text-lg font-bold hover:text-primary transition-colors"
        >
          ES
        </button>

        {/* Navegación en Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </div>

        {/* Navegación en Móvil */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
