import type { Route } from "./+types/tracer-bullet";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { pageVariants, headerVariants, iconVariants, cardVariants } from "~/lib/animations";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tracer Bullet - Promptfy" },
    { name: "description", content: "Build minimal, functional end-to-end system slices" },
  ];
}

export default function TracerBullet() {
  return (
    <motion.div 
      className="min-h-screen bg-background"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container mx-auto px-6 py-16">
        {/* Header with icon and navigation */}
        <motion.div 
          className="flex items-center gap-6 mb-16"
          variants={headerVariants}
        >
          <motion.div 
            className="w-16 h-16 flex items-center justify-center"
            variants={iconVariants}
            whileHover="hover"
          >
            <img 
              src="/tracerbullet.svg" 
              alt="Tracer bullet"
              className="w-12 h-12 invert brightness-75 hover:brightness-100 transition-all duration-200"
            />
          </motion.div>
          <div className="flex-1">
            <h1 className="text-4xl font-light font-mono tracking-tight">Tracer bullet</h1>
          </div>
          <Link to="/">
            <Button variant="ghost" size="sm" className="font-mono text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </motion.div>

        {/* Description */}
        <motion.div
          variants={cardVariants}
          custom={0}
        >
          <Card className="mb-12 border-0 shadow-sm bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-medium font-mono tracking-tight">Minimal End-to-End Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed text-muted-foreground/90">
                A tracer bullet is a minimal, but fully functional, end-to-end slice of a system's architecture. 
                Like a tracer bullet that shows the path from gun to target, this methodology helps you build 
                the thinnest possible vertical slice through your entire system. It validates the architecture, 
                identifies integration points, and provides a foundation for iterative development. Perfect for 
                proving concepts and establishing the core system flow.
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        {/* Form placeholder */}
        <motion.div
          variants={cardVariants}
          custom={1}
        >
          <Card className="border-0 shadow-sm bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-medium font-mono tracking-tight">Build Your Tracer Bullet Prompt</CardTitle>
              <CardDescription className="text-sm text-muted-foreground/90">
                Define the minimal path through your system architecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-12 border border-dashed border-muted/50 rounded-lg text-center">
                  <p className="text-muted-foreground font-mono text-sm">Form will be implemented here</p>
                  <p className="text-xs text-muted-foreground/70 mt-2 max-w-md mx-auto">
                    This will include fields for system boundaries, core functionality, and integration requirements
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
