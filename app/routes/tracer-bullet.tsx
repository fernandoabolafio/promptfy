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
      <div className="container mx-auto p-8">
        {/* Header with icon and navigation */}
        <motion.div 
          className="flex items-center gap-4 mb-8"
          variants={headerVariants}
        >
          <motion.div 
            className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center"
            variants={iconVariants}
            whileHover="hover"
          >
            <img 
              src="/tracerbullet.svg" 
              alt="Tracer bullet"
              className="w-12 h-12"
            />
          </motion.div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold">Tracer bullet</h1>
          </div>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Description */}
        <motion.div
          variants={cardVariants}
          custom={0}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Minimal End-to-End Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg leading-relaxed">
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
          <Card>
            <CardHeader>
              <CardTitle>Build Your Tracer Bullet Prompt</CardTitle>
              <CardDescription>
                Define the minimal path through your system architecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-8 border-2 border-dashed border-muted rounded-lg text-center">
                  <p className="text-muted-foreground">Form will be implemented here</p>
                  <p className="text-sm text-muted-foreground mt-2">
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
