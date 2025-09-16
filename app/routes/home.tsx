import type { Route } from "./+types/home";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Promptfy - Stop Wrestling with AI, Start Directing It" },
    { name: "description", content: "Three battle-tested methodologies to get AI doing exactly what you want, when you want it" },
  ];
}

const promptTypes = [
  {
    id: "agent-planning",
    name: "Agent planning",
    description: "Plan first, code later. Iterate on markdown specs instead of regenerating code files. Catch blind spots before they become expensive bugs.",
    icon: "/plan.svg",
    path: "/agent-planning"
  },
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
            className="text-xl text-muted-foreground/80 mb-8 font-light"
            variants={itemVariants}
          >
            Stop wrestling with AI, start directing it
          </motion.p>
          <motion.p 
            className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Three battle-tested methodologies that turn vague AI conversations into precise, actionable results. 
            Pick your approach based on what you're trying to achieve.
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
