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
              src="/plan.svg" 
              alt="Agent planning"
              className="w-12 h-12"
            />
          </motion.div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold">Agent planning</h1>
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
              <CardTitle>Collaborative Planning with Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg leading-relaxed">
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
          <Card>
            <CardHeader>
              <CardTitle>Build Your Agent Planning Prompt</CardTitle>
              <CardDescription>
                Create structured planning sessions with AI agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-8 border-2 border-dashed border-muted rounded-lg text-center">
                  <p className="text-muted-foreground">Form will be implemented here</p>
                  <p className="text-sm text-muted-foreground mt-2">
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
