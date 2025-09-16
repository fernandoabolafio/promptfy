import type { Route } from "./+types/diverge";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { pageVariants, headerVariants, iconVariants, cardVariants } from "~/lib/animations";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Diverge - Promptfy" },
    { name: "description", content: "Explore alternative implementations with AI-proposed feature designs" },
  ];
}

export default function Diverge() {
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
              src="/diverge.svg" 
              alt="Diverge"
              className="w-12 h-12"
            />
          </motion.div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold">Diverge</h1>
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
              <CardTitle>Exploring Alternative Implementations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg leading-relaxed">
                The Diverge methodology focuses on exploring alternative implementations by letting the AI propose feature designs 
                without preconceptions. This approach helps discover fresh directions and innovative solutions before converging 
                on a final implementation. It's particularly useful when you want to break out of conventional thinking patterns 
                and explore the full solution space.
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
              <CardTitle>Build Your Diverge Prompt</CardTitle>
              <CardDescription>
                Configure your prompt to explore multiple implementation approaches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-8 border-2 border-dashed border-muted rounded-lg text-center">
                  <p className="text-muted-foreground">Form will be implemented here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This will include fields for project context, constraints, and exploration parameters
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
