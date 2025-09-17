import type { Route } from "./+types/home";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Promptfy - Stop Wrestling with AI, Start Directing It" },
    { name: "description", content: "Three battle-tested methodologies to get AI doing exactly what you want, when you want it" },
  ];
}

const promptTypes = [
  {
    id: "diverge",
    name: "Diverge",
    description: "Break out of tunnel vision. Let AI explore the solution space without your assumptions, then pick the best path from approaches you'd never consider.",
    icon: "/diverge.svg",
    path: "/diverge"
  },
  {
    id: "tracer-bullet",
    name: "Tracer bullet", 
    description: "You code the seed, AI grows the tree. Show your architectural vision with working code, then get systematic help expanding it.",
    icon: "/tracerbullet.svg",
    path: "/tracer-bullet"
  },
  {
    id: "agent-planning",
    name: "Agent planning",
    description: "Plan first, code later. Iterate on markdown specs instead of regenerating code files. Catch blind spots before they become expensive bugs.",
    icon: "/plan.svg",
    path: "/agent-planning"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const
    }
  },
  hover: {
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const
    }
  }
};

export default function Home() {
  const [showSocialMenu, setShowSocialMenu] = useState(false);

  return (
    <motion.div 
      className="min-h-screen bg-background relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-8 md:py-16">
        <motion.div className="text-center mb-8 md:mb-16" variants={containerVariants}>
          <motion.h1 
            className="text-3xl md:text-5xl font-light mb-2 md:mb-3 tracking-tight font-mono"
            variants={itemVariants}
          >
            Promptfy
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground/80 mb-4 md:mb-8 font-light"
            variants={itemVariants}
          >
            Stop wrestling with AI, start directing it
          </motion.p>
          <motion.p 
            className="text-sm md:text-base text-muted-foreground max-w-xl md:max-w-2xl mx-auto leading-relaxed px-2"
            variants={itemVariants}
          >
            Three battle-tested methodologies that turn vague AI conversations into precise, actionable results. 
            Pick your approach based on what you're trying to achieve.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
        >
          {promptTypes.map((promptType, index) => (
            <Link key={promptType.id} to={promptType.path} className="group">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                custom={index}
              >
                <Card className="h-full cursor-pointer border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-background/50 backdrop-blur-sm">
                  <CardHeader className="text-center pb-3 md:pb-4">
                    <div className="flex justify-center mb-4 md:mb-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                        <img 
                          src={promptType.icon} 
                          alt={promptType.name}
                          className="w-8 h-8 md:w-12 md:h-12 brightness-75 group-hover:brightness-100 transition-all duration-200 filter invert"
                        />
                      </div>
                    </div>
                    <CardTitle className="text-lg md:text-xl font-medium mb-2 md:mb-3 tracking-tight font-mono">{promptType.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 px-4 md:px-6">
                    <CardDescription className="text-center leading-relaxed text-xs md:text-sm text-muted-foreground/90">
                      {promptType.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
      
      {/* Built with love footer */}
      <motion.div 
        className="fixed bottom-4 right-4 z-10"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1 }}
      >
        <div className="relative">
          <motion.button
            onClick={() => setShowSocialMenu(!showSocialMenu)}
            className="text-xs text-muted-foreground/60 hover:text-muted-foreground/80 transition-colors duration-200 font-light tracking-wide flex items-center gap-1 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            built with 
            <motion.span 
              className="text-red-400/70 group-hover:text-red-400/90 transition-colors duration-200"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ♥
            </motion.span>
          </motion.button>
          
          <AnimatePresence>
            {showSocialMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute bottom-full right-0 mb-2 bg-background/90 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg p-2 min-w-[120px]"
              >
                <div className="flex flex-col gap-1">
                  <a
                    href="https://www.linkedin.com/in/fernandoabolafio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors duration-200 px-2 py-1 rounded hover:bg-muted/50 font-light"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://x.com/oxfernando"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors duration-200 px-2 py-1 rounded hover:bg-muted/50 font-light"
                  >
                    Twitter
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
