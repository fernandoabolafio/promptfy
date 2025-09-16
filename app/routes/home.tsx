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
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  hover: {
    rotate: 5,
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
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
      <div className="container mx-auto p-8">
        <motion.div className="text-center mb-12" variants={containerVariants}>
          <motion.h1 
            className="text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Promptfy
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            variants={itemVariants}
          >
            Interactive Prompt Builder
          </motion.p>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Choose from 3 proven prompt methodologies to build better AI interactions
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {promptTypes.map((promptType, index) => (
            <Link key={promptType.id} to={promptType.path} className="group">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                custom={index}
              >
                <Card className="h-full cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <motion.div 
                        className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300"
                        variants={iconVariants}
                        whileHover="hover"
                      >
                        <img 
                          src={promptType.icon} 
                          alt={promptType.name}
                          className="w-16 h-16"
                        />
                      </motion.div>
                    </div>
                    <CardTitle className="text-2xl mb-2">{promptType.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed">
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
