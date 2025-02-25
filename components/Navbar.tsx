"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose,
  SheetTitle 
} from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      <button
        onClick={() => {
          scrollToSection("hero");
          onNavigate?.();
        }}
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Inicio
      </button>
      <button
        onClick={() => {
          scrollToSection("projects");
          onNavigate?.();
        }}
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Proyectos
      </button>
      <button
        onClick={() => {
          scrollToSection("resume");
          onNavigate?.();
        }}
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Experiencia
      </button>
      <button
        onClick={() => {
          scrollToSection("tech-stack");
          onNavigate?.();
        }}
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Tecnologías
      </button>
      <button
        onClick={() => {
          scrollToSection("contact");
          onNavigate?.();
        }}
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
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("hero")}
          className="text-lg font-bold hover:text-primary transition-colors"
        >
          ES
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-black/95 border-white/10">
              <SheetTitle className="text-lg font-bold mb-4">Navegación</SheetTitle>
              <SheetClose className="absolute right-4 top-4">
                <X className="h-5 w-5" />
              </SheetClose>
              <div className="flex flex-col space-y-6 mt-12">
                <NavLinks onNavigate={() => document.querySelector('[data-state="open"]')?.querySelector('button')?.click()} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}