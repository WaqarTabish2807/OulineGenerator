import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { OutlineContent } from "@shared/schema";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Link } from "wouter";

interface InputSectionProps {
  onOutlineGenerated: (outline: OutlineContent) => void;
  onStartGenerating?: (topic: string) => void;
}

export function InputSection({ onOutlineGenerated, onStartGenerating }: InputSectionProps) {
  const [topic, setTopic] = useState("");
  const [fileId, setFileId] = useState<number>(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { user, updateCredits } = useAuth();
  
  const generateMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await apiRequest("POST", "/api/generate-outline", { topic });
        
        if (!res.ok) {
          const errorData = await res.json();
          
          // Handle credit limit errors
          if (errorData.type === 'TRIAL_LIMIT_REACHED') {
            setShowLoginPrompt(true);
            throw new Error('Free trial limit reached. Please sign up to continue.');
          }
          
          if (errorData.type === 'CREDIT_LIMIT_REACHED') {
            throw new Error('No credits remaining. Please upgrade your plan to continue.');
          }
          
          throw new Error(errorData.message || 'Failed to generate outline');
        }
        
        return await res.json();
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      onOutlineGenerated(data.content);
      
      // Update user credits if provided in response
      if (data.creditsRemaining !== null && data.creditsRemaining !== undefined) {
        updateCredits(data.creditsRemaining);
      }
      
      toast({
        title: "Outline generated successfully",
        description: "Your outline is ready to view.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to generate outline",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    },
  });
  
  const handleGenerateOutline = () => {
    if (!topic) {
      toast({
        title: "Topic required",
        description: "Please enter a blog topic",
        variant: "destructive",
      });
      return;
    }
    
    if (!fileId) {
      toast({
        title: "Sample outline required",
        description: "Please upload a sample outline document",
        variant: "destructive",
      });
      return;
    }
    
    // Signal the start of generation process
    if (onStartGenerating) {
      onStartGenerating(topic);
    }
    
    // Start the actual generation
    generateMutation.mutate();
  };
  
  const handleFileUploaded = (id: number, name: string) => {
    setFileId(id);
    
    toast({
      title: "Sample uploaded successfully",
      description: `${name} has been uploaded and is ready to use.`,
    });
  };

  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Topic Input */}
      <Card className="border border-gray-200/50 dark:border-gray-700/50 shadow-md bg-white/25 dark:bg-gray-800/25 backdrop-blur-sm">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-300 p-1.5 rounded-md mr-3">
              <i className="fas fa-heading text-sm"></i>
            </span>
            Blog Topic
          </h3>
          
          <div className="space-y-3">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              What would you like to write about?
            </label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              placeholder="e.g. 10 Tips for Effective Time Management"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Sample Upload */}
      <Card className="border border-gray-200/50 dark:border-gray-700/50 shadow-md bg-white/25 dark:bg-gray-800/25 backdrop-blur-sm">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="bg-secondary-100 dark:bg-secondary-900/50 text-secondary-600 dark:text-secondary-300 p-1.5 rounded-md mr-3">
              <i className="fas fa-file-upload text-sm"></i>
            </span>
            Sample Outline
          </h3>
          
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Upload a sample outline document that we'll use as a template.
            </p>
            
            <FileUpload onChange={handleFileUploaded} />
          </div>
        </CardContent>
      </Card>
      
      {/* Credits info for logged in users */}
      {user && (
        <div className="text-sm text-center text-gray-600 dark:text-gray-400">
          <p>
            {user.plan === 'free' ? (
              <>
                You have <span className="font-medium text-primary">{user.credits}</span> credits remaining
              </>
            ) : (
              <>
                You're on the <span className="font-medium text-primary capitalize">{user.plan}</span> plan with unlimited generations
              </>
            )}
          </p>
        </div>
      )}
      
      {/* Generate Button */}
      <Button
        onClick={handleGenerateOutline}
        disabled={generateMutation.isPending}
        className="w-full py-6 bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all transform hover:-translate-y-0.5"
      >
        {generateMutation.isPending ? (
          <>
            <i className="fas fa-spinner fa-spin mr-2"></i>
            Generating...
          </>
        ) : (
          <>
            <i className="fas fa-magic mr-2"></i>
            Generate Outline
          </>
        )}
      </Button>
      
      {/* Login Dialog */}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Free Trial Limit Reached</DialogTitle>
            <DialogDescription>
              You've used all your free outline generations. Sign up now to continue generating outlines and get access to more features.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-2">
              <h4 className="font-medium">Why sign up?</h4>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Get 2 free outline generations every month</li>
                <li>Save your generated outlines for future reference</li>
                <li>Use your own custom templates</li>
                <li>Export to Google Docs, PDF, and more</li>
              </ul>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Link href="/auth">
              <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" className="w-full">
                View Plans
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
