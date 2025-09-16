import type { Route } from "./+types/home";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Promptfy - Interactive Prompt Builder" },
    { name: "description", content: "Build better prompts with our 3 proven methodologies" },
  ];
}

const promptTypes = [
  {
    id: "diverge",
    name: "Diverge",
    description: "Exploring alternative implementations by letting the AI propose feature designs without preconceptions, to discover fresh directions before converging",
    icon: "/diverge.svg",
    path: "/diverge"
  },
  {
    id: "tracer-bullet",
    name: "Tracer bullet",
    description: "A minimal, but fully functional, end-to-end slice of a system's architecture",
    icon: "/tracerbullet.svg",
    path: "/tracer-bullet"
  },
  {
    id: "agent-planning",
    name: "Agent planning",
    description: "Collaborative planning with agents through high-level specs and mini-ADRs. TL;DR: lightweight architectural decisions captured before coding begins.",
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
  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-6 py-16">
        <motion.div className="text-center mb-16" variants={containerVariants}>
          <motion.h1 
            className="text-5xl font-light mb-3 tracking-tight font-mono"
            variants={itemVariants}
          >
            Promptfy
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground/80 mb-12 font-light"
            variants={itemVariants}
          >
            Interactive Prompt Builder
          </motion.p>
          <motion.p 
            className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Choose from 3 proven methodologies to build better AI interactions
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
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
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 flex items-center justify-center">
                        <img 
                          src={promptType.icon} 
                          alt={promptType.name}
                          className="w-12 h-12 brightness-75 group-hover:brightness-100 transition-all duration-200 filter invert"
                        />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-medium mb-3 tracking-tight font-mono">{promptType.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center leading-relaxed text-sm text-muted-foreground/90">
                      {promptType.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
