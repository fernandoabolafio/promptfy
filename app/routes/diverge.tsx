import type { Route } from "./+types/diverge";
import { Link } from "react-router";
import { ArrowLeft, Copy, Check, Lightbulb } from "lucide-react";
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
  problemStatement: z.string().min(1, "Problem statement is required").min(10, "Please provide more details about the problem"),
  constraints: z.string().optional(),
  existingIdeas: z.string().optional(),
  successCriteria: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Diverge - Promptfy" },
    { name: "description", content: "Explore alternative implementations with AI-proposed feature designs" },
  ];
}

export default function Diverge() {
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemStatement: "Need a way for remote team members to quickly show each other what they're working on without scheduling meetings",
      constraints: "- everyone uses different tools (figma, code, docs, etc)\n- should be async friendly\n- people are in different timezones\n- don't want another app if possible",
      existingIdeas: "- slack screenshots (but they get buried)\n- loom videos (takes forever to record)\n- shared screens during standup (but scheduling sucks)",
      successCriteria: "- takes less than 30 seconds to share\n- easy to browse what others shared\n- works with whatever tool you're using\n- people actually use it (not another forgotten tool)",
    },
  });

  const onSubmit = (values: FormValues) => {
    const prompt = generateDivergePrompt(values);
    setGeneratedPrompt(prompt);
  };

  const generateDivergePrompt = (values: FormValues) => {
    let prompt = `I need to explore different approaches to solve this problem:\n${values.problemStatement}\n\n`;
    
    if (values.constraints) {
      prompt += `Current constraints I'm working with:\n${values.constraints}\n\n`;
    }
    
    if (values.existingIdeas) {
      prompt += `Approaches I've already considered:\n${values.existingIdeas}\n\n`;
    }
    
    if (values.successCriteria) {
      prompt += `Success looks like:\n${values.successCriteria}\n\n`;
    }
    
    prompt += `Please propose 5-7 completely different approaches to solve this problem. For each approach:\n`;
    prompt += `1. Explain the core concept in one sentence\n`;
    prompt += `2. List 2-3 key advantages\n`;
    prompt += `3. Identify the main challenges/risks\n`;
    prompt += `4. Suggest when this approach works best\n\n`;
    prompt += `Don't just iterate on my existing ideas - think outside the box. Consider different technologies, user flows, business models, or entirely different ways to frame the problem.`;
    
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
              src="/diverge.svg" 
              alt="Diverge"
              className="w-12 h-12 invert brightness-75 hover:brightness-100 transition-all duration-200"
            />
          </motion.div>
          <div className="flex-1">
            <h1 className="text-4xl font-light font-mono tracking-tight">Diverge</h1>
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
              <CardTitle className="text-xl font-medium font-mono tracking-tight">Exploring Alternative Implementations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed text-muted-foreground/90">
                Stuck in the same old solutions? Diverge breaks you out of tunnel vision by having AI explore the solution space without your preconceptions. Instead of asking "how do I build X?", you ask "what are all the ways to solve this problem?" The AI becomes your creative partner, proposing approaches you might never consider, before you narrow down to the best path.
                
                <div className="mt-6 space-y-3">
                  <div>• <strong>When to use:</strong> New problem domains, creative challenges, or when your first solution feels too obvious</div>
                  <div>• <strong>Why it works:</strong> AI isn't biased by your past implementations; explores the full solution space</div>
                  <div>• <strong>Skip it when:</strong> You already know the best approach or working with well-established patterns</div>
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
              <CardTitle className="text-xl font-medium font-mono tracking-tight">Build Your Diverge Prompt</CardTitle>
              <CardDescription className="text-sm text-muted-foreground/90">
                Explore multiple approaches to your problem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Problem Statement Field */}
                  <FormField
                    control={form.control}
                    name="problemStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-sm">Problem Statement</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Users need to share files between devices but our current email attachment system is clunky and has size limits"
                            className="font-mono text-sm min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-muted-foreground/80">
                          Describe the problem you're trying to solve, not how you think it should be solved.
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
                        <FormLabel className="font-mono text-sm">Current constraints</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="- Must work on mobile and desktop
- Users shouldn't need to create accounts
- Budget is tight so no fancy cloud services
- Security is important but don't over-engineer it"
                            className="font-mono text-sm min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-muted-foreground/80">
                          What limitations do you have? Budget, tech stack, user requirements, etc.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Existing Ideas Field */}
                  <FormField
                    control={form.control}
                    name="existingIdeas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-sm">What you've already considered</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="- File upload to cloud storage (seems expensive)
- Email with compression (still has limits)
- QR codes for sharing (might be too techy for some users)
- USB drives (too old school?)"
                            className="font-mono text-sm min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-muted-foreground/80">
                          List approaches you've thought of - helps AI avoid obvious suggestions and go deeper.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Success Criteria Field */}
                  <FormField
                    control={form.control}
                    name="successCriteria"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-sm">Success criteria</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="- Users can share 100MB+ files easily
- Works for non-tech-savvy people
- Feels fast and reliable
- Doesn't break our existing user flow"
                            className="font-mono text-sm min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-muted-foreground/80">
                          How will you know if a solution is good? What does success look like?
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
                        Explore Solutions
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
                    <CardTitle className="text-xl font-medium font-mono tracking-tight">Your Diverge Prompt</CardTitle>
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
                        Re-explore
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground/90">
                    Copy this prompt and use it with your AI to explore creative solutions
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
                    <Lightbulb className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-mono text-lg font-medium text-muted-foreground mb-2">
                    Your exploration prompt will appear here
                  </h3>
                  <p className="text-sm text-muted-foreground/70 max-w-sm mb-6">
                    Describe your problem and let AI explore creative solutions you haven't considered.
                  </p>
                  <Button 
                    onClick={form.handleSubmit(onSubmit)}
                    className="font-mono text-sm"
                    size="lg"
                  >
                    Explore Solutions
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
