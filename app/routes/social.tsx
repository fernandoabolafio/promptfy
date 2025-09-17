import type { Route } from "./+types/social";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Promptfy - Social Media Visual" },
    { name: "description", content: "Social media visual for Promptfy methodologies" },
  ];
}

const promptTypes = [
  {
    id: "diverge",
    name: "Diverge",
    description: "Break tunnel vision. Explore solutions beyond assumptions.",
    icon: "/diverge.svg"
  },
  {
    id: "tracer-bullet", 
    name: "Tracer bullet",
    description: "Code the seed, AI grows the tree. Show vision, get expansion.",
    icon: "/tracerbullet.svg"
  },
  {
    id: "agent-planning",
    name: "Agent planning", 
    description: "Plan first, code later. Iterate specs, catch blind spots.",
    icon: "/plan.svg"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

const iconVariants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

export default function Social() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % promptTypes.length);
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      {/* Square container optimized for social media */}
      <motion.div 
        className="w-[500px] h-[500px] bg-background/50 backdrop-blur-sm border border-border rounded-2xl shadow-2xl p-8 flex flex-col justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Three methodologies in a clean grid */}
        <motion.div 
          className="grid grid-cols-1 gap-12"
          variants={containerVariants}
        >
          {promptTypes.map((promptType, index) => {
            const isActive = index === activeIndex;
            
            return (
              <motion.div
                key={promptType.id}
                className="flex items-center gap-8"
                variants={itemVariants}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              >
                {/* Icon */}
                <motion.div 
                  className="flex-shrink-0"
                  variants={iconVariants}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    rotate: isActive ? 360 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    rotate: {
                      duration: 1.2,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <img 
                    src={promptType.icon} 
                    alt={promptType.name}
                    className="w-12 h-12 filter invert brightness-75"
                  />
                </motion.div>
                
                {/* Content */}
                <motion.div 
                  className="flex-1 min-w-0"
                  animate={{
                    x: isActive ? 10 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                >
                  <motion.h3 
                    className="font-mono font-medium text-foreground text-xl mb-2"
                    animate={{
                      color: isActive ? "rgb(255, 255, 255)" : "rgb(156, 163, 175)",
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                  >
                    {promptType.name}
                  </motion.h3>
                  <p className="text-muted-foreground/90 text-base leading-relaxed">
                    {promptType.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
