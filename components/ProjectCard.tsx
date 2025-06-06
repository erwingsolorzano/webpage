"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl: string;
  tags: string[];
  liveUrl?: string;
}

export default function ProjectCard({ title, description, githubUrl, tags, liveUrl }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group h-full"
    >
      <Card className="h-full flex flex-col bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 overflow-hidden">
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
        
        <CardHeader className="relative z-10">
          <motion.h3 
            className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>
        </CardHeader>
        
        <CardContent className="flex-grow relative z-10">
          <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Badge 
                  variant="outline" 
                  className="border-white/20 text-gray-300 hover:border-white/40 hover:text-white transition-all duration-300 bg-white/5 backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="relative z-10 gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button 
              variant="outline" 
              asChild 
              className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </motion.div>
          
          {liveUrl && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 transition-all duration-300"
              >
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}