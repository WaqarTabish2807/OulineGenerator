import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { OutlineContent } from "@shared/schema";
import { motion } from "framer-motion";

interface OutlinePreviewProps {
  outline: OutlineContent | null;
  isLoading: boolean;
}

export function OutlinePreview({ outline, isLoading }: OutlinePreviewProps) {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  
  const copyToClipboard = async () => {
    if (!contentRef.current || !outline) return;
    
    try {
      // Format the outline for copying
      let formattedOutline = `# ${outline.title}\n\n`;
      
      outline.sections.forEach(section => {
        formattedOutline += `## ${section.title}\n`;
        section.items.forEach(item => {
          formattedOutline += `- ${item}\n`;
        });
        formattedOutline += '\n';
      });
      
      await navigator.clipboard.writeText(formattedOutline);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The outline has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the outline to clipboard.",
        variant: "destructive",
      });
    }
  };
  
  const exportToGoogleDocs = () => {
    if (!contentRef.current || !outline) return;
    
    try {
      // Format the outline for Google Docs
      let formattedOutline = `# ${outline.title}\n\n`;
      
      outline.sections.forEach(section => {
        formattedOutline += `## ${section.title}\n`;
        section.items.forEach(item => {
          formattedOutline += `- ${item}\n`;
        });
        formattedOutline += '\n';
      });
      
      // Create a data URI for the text content
      const encodedOutline = encodeURIComponent(formattedOutline);
      const dataUri = `data:text/plain;charset=utf-8,${encodedOutline}`;
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = dataUri;
      link.download = `${outline.title} - Outline.txt`;
      
      // Trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Outline downloaded",
        description: "Your outline has been downloaded as a text file. You can import this into Google Docs.",
      });
    } catch (err) {
      toast({
        title: "Export failed",
        description: "Could not export the outline. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="lg:col-span-2">
      <Card className="h-full shadow-md border border-gray-200/50 dark:border-gray-700/50 overflow-hidden flex flex-col bg-white/25 dark:bg-gray-800/25 backdrop-blur-sm">
        <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-700 flex-row justify-between items-center">
          <div className="flex items-center">
            <span className="bg-accent-100 dark:bg-accent-900/50 text-accent-600 dark:text-accent-300 p-1.5 rounded-md mr-3">
              <i className="fas fa-list-ul text-sm"></i>
            </span>
            <h3 className="text-lg font-semibold">Generated Outline</h3>
          </div>
          
          {outline && (
            <div className="flex space-x-2">
              <Button 
                onClick={copyToClipboard} 
                variant="outline" 
                size="sm"
                className="flex items-center"
              >
                <i className={`${copied ? 'fas fa-check' : 'far fa-copy'} mr-1.5`}></i>
                {copied ? 'Copied' : 'Copy'}
              </Button>
              
              <Button 
                onClick={exportToGoogleDocs} 
                variant="outline" 
                size="sm"
                className="flex items-center"
              >
                <i className="fas fa-file-export mr-1.5"></i>
                Download Outline
              </Button>
            </div>
          )}
        </CardHeader>
        
        {/* Initial state when no outline is generated */}
        {!outline && !isLoading && (
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-5 mb-4">
              <i className="fas fa-file-alt text-3xl text-gray-400 dark:text-gray-500"></i>
            </div>
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No outline generated yet</h4>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Enter your blog topic and upload a sample outline to generate a new structured outline for your content.
            </p>
          </div>
        )}
        
        {/* Loading state */}
        {isLoading && (
          <div className="flex-grow flex flex-col items-center justify-center p-8">
            <div className="space-y-6 w-full max-w-lg">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-300 font-medium">Generating your outline...</p>
              
              {/* Shimmer loading effect */}
              <div className="space-y-3 w-full">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden relative">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite_linear] -translate-x-full"></div>
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden w-4/5 relative">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite_linear] -translate-x-full"></div>
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden w-5/6 relative">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite_linear] -translate-x-full"></div>
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden w-3/4 relative">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite_linear] -translate-x-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Generated Outline Content */}
        {outline && !isLoading && (
          <CardContent className="p-6 flex-grow overflow-auto" ref={contentRef}>
            <motion.div 
              className="space-y-5 font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Title */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {outline.title}
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mt-2"></div>
              </div>
              
              {/* Sections */}
              {outline.sections.map((section, index) => (
                <motion.div 
                  key={index} 
                  className="ml-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">{section.title}</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    {section.items.map((item, itemIndex) => (
                      <motion.li 
                        key={itemIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.05 + itemIndex * 0.02 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        )}
        
      </Card>
    </div>
  );
}
