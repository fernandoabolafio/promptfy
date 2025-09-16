import type { Route } from "./+types/agent-planning";
import { Link } from "react-router";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { pageVariants, headerVariants, iconVariants, cardVariants } from "~/lib/animations";

const formSchema = z.object({
  goal: z.string().min(1, "Goal is required").min(10, "Please provide more details about your goal"),
  certainParts: z.string().optional(),
  uncertainParts: z.string().optional(),
  uxPreferences: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Agent Planning - Promptfy" },
    { name: "description", content: "Collaborative planning with agents through high-level specs and mini-ADRs" },
  ];
}

export default function AgentPlanning() {
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goal: "",
      certainParts: "",
      uncertainParts: "",
      uxPreferences: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    // Generate the agent planning prompt
    const prompt = generateAgentPlanningPrompt(values);
    setGeneratedPrompt(prompt);
  };

  const generateAgentPlanningPrompt = (values: FormValues) => {
    let prompt = `# Agent Planning Session\n\n`;
    
    prompt += `## Project Goal\n${values.goal}\n\n`;
    
    if (values.certainParts) {
      prompt += `## What I'm Sure About\n${values.certainParts}\n\n`;
    }
    
    if (values.uncertainParts) {
      prompt += `## Areas Where I Need Input\n${values.uncertainParts}\n\n`;
    }
    
    if (values.uxPreferences) {
      prompt += `## UX/UI Preferences\n${values.uxPreferences}\n\n`;
    }
    
    prompt += `## Instructions for Agent\n`;
    prompt += `Please help me plan this project by:\n`;
    prompt += `1. Creating a high-level architecture overview\n`;
    prompt += `2. Identifying key technical decisions that need to be made\n`;
    prompt += `3. Suggesting a development roadmap with phases\n`;
    prompt += `4. Highlighting potential challenges and mitigation strategies\n`;
    prompt += `5. Creating mini-ADRs (Architecture Decision Records) for major technical choices\n\n`;
    prompt += `Focus on collaborative planning where we can iterate on the approach together.`;
    
    return prompt;
  };

  const copyToClipboard = async () => {
    if (generatedPrompt) {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

        {/* Form */}
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Goal Field */}
                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-sm">Goal</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Build a collaborative task management app with real-time updates and team workspaces"
                            className="font-mono text-sm"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-muted-foreground/80">
                          What do you want to build? Be specific about the core functionality.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Certain Parts Field */}
                  <FormField
                    control={form.control}
                    name="certainParts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-sm">What parts of it you're sure about</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="• User authentication with email/password and OAuth
• Task creation, assignment, and status tracking
• Real-time notifications for task updates
• Team invitation system with role-based permissions
• Mobile-responsive design with dark/light theme support"
                            className="font-mono text-sm min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-muted-foreground/80">
                          List functional requirements, UX flows, or technical constraints you've already decided on.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Uncertain Parts Field */}
                  <FormField
                    control={form.control}
                    name="uncertainParts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-sm">Which parts you're not sure about yet</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="• How to implement real-time collaboration (WebSockets vs Server-Sent Events?)
• Database schema design for optimal task querying and filtering
• Caching strategy for frequently accessed team data
• File attachment system - should we use cloud storage or handle uploads directly?
• Notification system architecture - push notifications vs email digests"
                            className="font-mono text-sm min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-muted-foreground/80">
                          Areas where you need guidance, architectural decisions to make, or technical challenges to solve.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* UX/UI Preferences Field */}
                  <FormField
                    control={form.control}
                    name="uxPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-sm">UX/UI preferences to enforce</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="• Clean, minimalist interface inspired by Linear and Notion
• Keyboard shortcuts for power users (cmd+k for quick actions)
• Drag-and-drop task organization with smooth animations
• Consistent design system with subtle shadows and rounded corners
• Fast, snappy interactions - no loading states over 200ms for core actions"
                            className="font-mono text-sm min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-muted-foreground/80">
                          Design philosophy, interaction patterns, visual style, or user experience principles you want to maintain.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="font-mono text-sm"
                      size="lg"
                    >
                      Generate Planning Prompt
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Generated Prompt Display */}
        {generatedPrompt && (
          <motion.div
            variants={cardVariants}
            custom={2}
            initial="initial"
            animate="animate"
          >
            <Card className="mt-8 border-0 shadow-sm bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-medium font-mono tracking-tight">Your Agent Planning Prompt</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="font-mono text-xs"
                  >
                    {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <CardDescription className="text-sm text-muted-foreground/90">
                  Copy this prompt and use it with your AI agent for collaborative planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm border border-muted/50">
                  <pre className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                    {generatedPrompt}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
