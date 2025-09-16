import type { Route } from "./+types/agent-planning";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { pageVariants, headerVariants, iconVariants, cardVariants } from "~/lib/animations";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Agent Planning - Promptfy" },
    { name: "description", content: "Collaborative planning with agents through high-level specs and mini-ADRs" },
  ];
}

export default function AgentPlanning() {
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
              src="/plan.svg" 
              alt="Agent planning"
              className="w-12 h-12 invert brightness-75 hover:brightness-100 transition-all duration-200"
            />
          </motion.div>
          <div className="flex-1">
            <h1 className="text-4xl font-light font-mono tracking-tight">Agent planning</h1>
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
              <CardTitle className="text-xl font-medium font-mono tracking-tight">Collaborative Planning with Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed text-muted-foreground/90">
                Agent planning enables collaborative planning with AI agents through high-level specifications and mini-ADRs 
                (Architecture Decision Records). This methodology focuses on capturing lightweight architectural decisions 
                before coding begins, ensuring alignment between human intent and AI implementation. It's ideal for complex 
                projects where upfront planning prevents costly refactoring and ensures the AI understands both the technical 
                requirements and the reasoning behind architectural choices.
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
              <CardTitle className="text-xl font-medium font-mono tracking-tight">Build Your Agent Planning Prompt</CardTitle>
              <CardDescription className="text-sm text-muted-foreground/90">
                Create structured planning sessions with AI agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-12 border border-dashed border-muted/50 rounded-lg text-center">
                  <p className="text-muted-foreground font-mono text-sm">Form will be implemented here</p>
                  <p className="text-xs text-muted-foreground/70 mt-2 max-w-md mx-auto">
                    This will include fields for project scope, architectural constraints, and decision criteria
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
