import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FileUpload } from '@/components/ui/file-upload';
import { Checkbox } from '@/components/ui/checkbox';
import { GradientButton } from '@/components/ui/gradient-button';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { copyToClipboard, outlineToText } from '@/lib/utils';
import { Loader2, Copy, FileExport, FileEdit, Share, GoogleDrive, CheckCircle } from 'lucide-react';

export interface OutlineSection {
  title: string;
  items: string[];
}

export interface BlogOutline {
  topic: string;
  sections: OutlineSection[];
}

export default function OutlineWorkflow() {
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [includeIntro, setIncludeIntro] = useState(true);
  const [includeConclusion, setIncludeConclusion] = useState(true);
  const [includeSubsections, setIncludeSubsections] = useState(true);
  const [generatedOutline, setGeneratedOutline] = useState<BlogOutline | null>(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  
  const { toast } = useToast();
  
  // Template upload mutation
  const templateUploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/templates/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || response.statusText);
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Template uploaded successfully",
        description: "Your sample outline has been processed",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to upload template",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });
  
  // Outline generation mutation
  const generateOutlineMutation = useMutation({
    mutationFn: async (data: { 
      topic: string;
      includeIntro: boolean;
      includeConclusion: boolean;
      includeSubsections: boolean;
    }) => {
      const response = await apiRequest('POST', '/api/outlines/generate', data);
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedOutline(data.content);
      toast({
        title: "Outline generated",
        description: "Your blog outline has been created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to generate outline",
        description: error.message || "Please try again with a different topic",
        variant: "destructive",
      });
    },
  });
  
  const handleFileUpload = (file: File) => {
    setFile(file);
    templateUploadMutation.mutate(file);
  };
  
  const handleGenerateOutline = () => {
    if (!topic.trim()) {
      toast({
        title: "Topic is required",
        description: "Please enter a blog topic to generate an outline",
        variant: "destructive",
      });
      return;
    }
    
    generateOutlineMutation.mutate({
      topic,
      includeIntro,
      includeConclusion,
      includeSubsections,
    });
  };
  
  const handleReset = () => {
    setTopic('');
    setFile(null);
    setIncludeIntro(true);
    setIncludeConclusion(true);
    setIncludeSubsections(true);
    setGeneratedOutline(null);
  };
  
  const handleCopyToClipboard = async () => {
    if (!generatedOutline) return;
    
    const success = await copyToClipboard(outlineToText(generatedOutline));
    if (success) {
      setCopiedToClipboard(true);
      toast({
        title: "Copied to clipboard",
        description: "The outline has been copied to your clipboard",
      });
      
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } else {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
      });
    }
  };
  
  const isLoading = generateOutlineMutation.isPending;
  const isUploading = templateUploadMutation.isPending;
  
  return (
    <section className="mb-24">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden backdrop-blur-md backdrop-saturate-180 bg-white/75 border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          {/* Left Panel - Input */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </span>
              Input Details
            </h2>
            
            {/* Blog Topic Input */}
            <div className="mb-6">
              <Label htmlFor="topic" className="mb-1">Blog Topic</Label>
              <div className="relative">
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="E.g., The Future of Remote Work"
                  className="pr-10 py-6"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Sample Upload */}
            <FileUpload
              onFileUpload={handleFileUpload}
              className="mb-6"
              isLoading={isUploading}
            />
            
            {/* Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Outline Options</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeIntro" 
                    checked={includeIntro} 
                    onCheckedChange={(checked) => setIncludeIntro(checked === true)}
                  />
                  <Label 
                    htmlFor="includeIntro" 
                    className="text-sm font-normal cursor-pointer"
                  >
                    Include Introduction
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeConclusion" 
                    checked={includeConclusion} 
                    onCheckedChange={(checked) => setIncludeConclusion(checked === true)}
                  />
                  <Label 
                    htmlFor="includeConclusion" 
                    className="text-sm font-normal cursor-pointer"
                  >
                    Include Conclusion
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeSubsections" 
                    checked={includeSubsections} 
                    onCheckedChange={(checked) => setIncludeSubsections(checked === true)}
                  />
                  <Label 
                    htmlFor="includeSubsections" 
                    className="text-sm font-normal cursor-pointer"
                  >
                    Include Subsections
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <GradientButton 
                className="w-full py-6"
                onClick={handleGenerateOutline}
                disabled={isLoading || !topic.trim()}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                )}
                Generate Outline
              </GradientButton>
              
              <Button 
                variant="outline" 
                className="w-full py-6"
                onClick={handleReset}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Reset
              </Button>
            </div>
          </div>
          
          {/* Middle Panel - Preview */}
          <div className="p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Generated Outline
              </h2>
              
              <div className="flex items-center space-x-2">
                <Button 
                  size="icon" 
                  variant="ghost"
                  title="Copy to clipboard"
                  onClick={handleCopyToClipboard}
                  disabled={!generatedOutline}
                >
                  {copiedToClipboard ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </Button>
                <Button size="icon" variant="ghost" title="Export as PDF" disabled={!generatedOutline}>
                  <FileExport className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" title="Download as DOCX" disabled={!generatedOutline}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M9 13h6" />
                    <path d="M9 17h6" />
                    <path d="M9 9h1" />
                  </svg>
                </Button>
              </div>
            </div>
            
            {/* Google Docs Integration Button */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-blue-700">Connect your Google Account to export directly to Google Docs.</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className="mr-1">
                  <path fill="#4285F4" d="M12 15V5H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h11v-3a3 3 0 0 1 3-3h-7Z"/>
                  <path fill="#34A853" d="M19 8h-4v7h7v-4a3 3 0 0 0-3-3Z"/>
                  <path fill="#EA4335" d="M19 15v3a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-3h17Z"/>
                  <path fill="#FBBC04" d="M5 5h7v10H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z"/>
                </svg>
                Connect
              </Button>
            </div>
            
            {/* Outline Preview */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-4 min-h-[500px] overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-[500px] flex-col">
                  <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Generating your outline...</p>
                </div>
              ) : generatedOutline ? (
                <>
                  <h1 className="text-2xl font-bold mb-4">{generatedOutline.topic}</h1>
                  
                  <div className="space-y-4">
                    {generatedOutline.sections.map((section, index) => (
                      <div key={index}>
                        <h2 className="text-lg font-semibold text-indigo-700">{section.title}</h2>
                        <ul className="list-disc ml-5 text-gray-700 space-y-1">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[500px] text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No outline generated yet</h3>
                  <p className="text-gray-500 max-w-sm">
                    Enter a blog topic and click the Generate button to create your outline.
                  </p>
                </div>
              )}
            </div>
            
            {/* Export Options */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="default"
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                disabled={!generatedOutline}
              >
                <FileEdit className="mr-2 h-4 w-4" /> Edit in Editor
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                disabled={!generatedOutline}
              >
                <GoogleDrive className="mr-2 h-4 w-4" /> Export to Google Docs
              </Button>
              <Button 
                variant="outline"
                className="flex-shrink-0"
                disabled={!generatedOutline}
              >
                <Share className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
