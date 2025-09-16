import type { Route } from "./+types/tracer-bullet";
import { Link } from "react-router";
import { ArrowLeft, Copy, Check, Target } from "lucide-react";
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
  systemDescription: z.string().min(1, "System description is required").min(10, "Please provide more details about your system"),
  workingCode: z.string().min(1, "Working code description is required").min(20, "Please describe your existing implementation in more detail"),
  expansionAreas: z.string().optional(),
  constraints: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tracer Bullet - Promptfy" },
    { name: "description", content: "Build minimal, functional end-to-end system slices" },
  ];
}

export default function TracerBullet() {
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      systemDescription: "A real-time collaborative text editor using operational transforms for conflict resolution",
      workingCode: "Built a basic version with 2 browser tabs syncing text changes. Uses Socket.io for real-time communication and a simple transform function for handling concurrent edits. About 200 lines - handles basic text insertion/deletion and cursor positions. Express server manages the document state and broadcasts changes.",
      expansionAreas: "- add rich text formatting (bold, italic, lists)\n- implement proper user authentication\n- add document persistence to MongoDB\n- handle offline/online sync gracefully\n- add collaborative cursors and user presence",
      constraints: "- must keep the operational transform approach (not CRDT)\n- Socket.io for real-time (company standard)\n- MongoDB for persistence\n- TypeScript throughout\n- needs to integrate with our existing auth system",
    },
  });

  const onSubmit = (values: FormValues) => {
    const prompt = generateTracerBulletPrompt(values);
    setGeneratedPrompt(prompt);
  };

  const generateTracerBulletPrompt = (values: FormValues) => {
    let prompt = `I'm building: ${values.systemDescription}\n\n`;
    
    prompt += `I've already created this working foundation:\n${values.workingCode}\n\n`;
    
    if (values.expansionAreas) {
      prompt += `I want to systematically expand it with:\n${values.expansionAreas}\n\n`;
    }
    
    if (values.constraints) {
      prompt += `These constraints must be followed:\n${values.constraints}\n\n`;
    }
    
    prompt += `You are helping me grow this system, not redesign it. My working code demonstrates the architectural approach I want to use. Please help me:\n\n`;
    prompt += `1. Analyze my existing implementation to understand the patterns I'm using\n`;
    prompt += `2. Suggest how to add the requested features while maintaining my architectural choices\n`;
    prompt += `3. Provide step-by-step expansion plan that builds on what I've proven works\n`;
    prompt += `4. Point out any potential issues with my approach that I should address early\n`;
    prompt += `5. Help me maintain consistency with the patterns I've established\n\n`;
    prompt += `Remember: I'm the architect here. Your job is to help me execute my vision systematically, not to suggest alternative approaches unless I'm making a clear mistake.`;
    
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
              src="/tracerbullet.svg" 
              alt="Tracer bullet"
              className="w-12 h-12 invert brightness-75 hover:brightness-100 transition-all duration-200"
            />
          </motion.div>
          <div className="flex-1">
            <h1 className="text-4xl font-light font-mono tracking-tight">Tracer bullet</h1>
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
              <CardTitle className="text-xl font-medium font-mono tracking-tight">Code First, Then Expand</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed text-muted-foreground/90">
                <strong>You code the seed, AI helps it grow.</strong> Tracer bullets are for when you're the expert with a specific architectural vision. You build the minimal working proof-of-concept first, then let AI help you expand it systematically while preserving your design decisions.
                
                <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-muted/30">
                  <div className="text-xs text-muted-foreground/80 mb-2 font-mono">Example: Basic real-time sync (your working foundation)</div>
                  <pre className="text-xs font-mono text-muted-foreground/90 overflow-x-auto">
{`// Basic operational transform for text sync
function applyTransform(doc, op) {
  if (op.type === 'insert') {
    return doc.slice(0, op.pos) + op.text + doc.slice(op.pos);
  }
  // ... handle delete, etc
}

io.on('connection', (socket) => {
  socket.on('edit', (op) => {
    // Transform against concurrent ops
    const transformed = transform(op, pendingOps);
    applyToDocument(transformed);
    socket.broadcast.emit('edit', transformed);
  });
});`}
                  </pre>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div>• <strong>When to use:</strong> Custom architectures, niche frameworks, or when you have strong implementation opinions</div>
                  <div>• <strong>Why it works:</strong> You control the architectural decisions; AI handles systematic expansion and refinement</div>
                  <div>• <strong>Skip it when:</strong> Using common patterns the AI knows well, or when you want AI to explore alternatives</div>
                </div>
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        {/* Form and Prompt Side by Side */}
        <motion.div
          variants={cardVariants}
          custom={1}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Form Panel */}
          <Card className="border-0 shadow-sm bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-medium font-mono tracking-tight">Build Your Tracer Bullet Prompt</CardTitle>
              <CardDescription className="text-sm text-muted-foreground/90">
                Expand your working code systematically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* System Description Field */}
                  <FormField
                    control={form.control}
                    name="systemDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-sm">What you're building</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="A job queue system using Redis Streams with custom retry logic and dead letter queues"
                            className="font-mono text-sm min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-muted-foreground/80">
                          Describe your system - be specific about the architectural choices you want to demonstrate.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Working Code Field */}
                  <FormField
                    control={form.control}
                    name="workingCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-sm">Your working foundation</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Built a basic version - jobs get added to Redis stream, workers consume using XREADGROUP, failed jobs go to retry stream. About 200 lines, handles happy path plus basic failures. Uses Bull-style job definitions but with custom processing logic."
                            className="font-mono text-sm min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-muted-foreground/80">
                          <strong>Required:</strong> Describe your existing working code. What have you already built and proven works?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Expansion Areas Field */}
                  <FormField
                    control={form.control}
                    name="expansionAreas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-sm">What you want to expand</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="- add exponential backoff for retries
- implement proper dead letter queue after max retries
- add job progress tracking
- build simple web UI to monitor queues
- add job scheduling for future execution"
                            className="font-mono text-sm min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-muted-foreground/80">
                          What features should AI help you add systematically to your working foundation?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Constraints Field */}
                  <FormField
                    control={form.control}
                    name="constraints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-sm">Your specific constraints</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="- must stick with Redis Streams (not Bull or other libraries)
- keep the custom retry logic I built
- TypeScript everywhere
- needs to work with existing Redis cluster setup"
                            className="font-mono text-sm min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-muted-foreground/80">
                          What architectural decisions are non-negotiable? What patterns must AI follow?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Generate Button - Centered when no prompt */}
                  {!generatedPrompt && (
                    <div className="pt-4 flex justify-center">
                      <Button 
                        type="submit" 
                        className="font-mono text-sm"
                        size="lg"
                      >
                        Grow Your System
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Prompt Display Panel */}
          <Card className="border-0 shadow-sm bg-background/50 backdrop-blur-sm">
            {generatedPrompt ? (
              <>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-medium font-mono tracking-tight">Your Tracer Bullet Prompt</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyToClipboard}
                        className="font-mono text-xs"
                      >
                        {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </Button>
                      <Button
                        onClick={form.handleSubmit(onSubmit)}
                        variant="outline"
                        size="sm"
                        className="font-mono text-xs"
                      >
                        Re-generate
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground/90">
                    Copy this prompt and use it with AI to systematically expand your working code
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm border border-muted/50 max-h-[600px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                      {generatedPrompt}
                    </pre>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                    <Target className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-mono text-lg font-medium text-muted-foreground mb-2">
                    Your expansion prompt will appear here
                  </h3>
                  <p className="text-sm text-muted-foreground/70 max-w-sm mb-6">
                    Show AI your working code and get systematic guidance to grow it while preserving your architecture.
                  </p>
                  <Button 
                    onClick={form.handleSubmit(onSubmit)}
                    className="font-mono text-sm"
                    size="lg"
                  >
                    Grow Your System
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
