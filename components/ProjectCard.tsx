"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl: string;
  tags: string[];
}

export default function ProjectCard({ title, description, githubUrl, tags }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col border-2">
        <CardHeader>
          <h3 className="text-xl font-semibold">{title}</h3>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-2">{tag}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full border-2 hover:bg-primary hover:text-primary-foreground">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Ver en GitHub
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}