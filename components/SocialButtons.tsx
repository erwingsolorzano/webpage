"use client";

import { Github, Mail, Linkedin } from "lucide-react";

interface SocialButtonProps {
  href: string;
  tooltip: string;
  children: React.ReactNode;
}

function SocialButton({ href, tooltip, children }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-block"
    >
      <button className="flex items-center justify-center rounded-full border hover:bg-white/40 p-3 transition-colors">
        {children}
      </button>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-black text-white rounded px-2 py-1 pointer-events-none">
        {tooltip}
      </div>
    </a>
  );
}

export default function SocialButtons() {
  return (
    <div className="flex gap-4 justify-center">
      <SocialButton href="https://github.com/erwingsolorzano" tooltip="GitHub">
        <Github className="h-8 w-8" />
      </SocialButton>
      <SocialButton href="mailto:erwing1394@gmail.com" tooltip="Contacto">
        <Mail className="h-8 w-8" />
      </SocialButton>
      <SocialButton href="https://linkedin.com/in/erwing-solorzano" tooltip="LinkedIn">
        <Linkedin className="h-8 w-8" />
      </SocialButton>
    </div>
  );
}
