import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Question submitted",
      description: "Our team will get back to you shortly.",
      variant: "default",
    });
    setSearchQuery("");
  };
  
  // FAQ data
  const faqs = {
    general: [
      {
        question: "What is OutlineGen?",
        answer: "OutlineGen is an AI-powered blog outline generator that creates structured, well-formatted outlines based on your topic and preferred style. It analyzes your sample outlines to learn your structural preferences and applies them to new topics."
      },
      {
        question: "How does the outline generation work?",
        answer: "Our system analyzes the structure, formatting, and content patterns of your uploaded sample outlines. Then, when you enter a new topic, it generates a new outline that follows those same structural patterns but adapts the content to be relevant to your new topic."
      },
      {
        question: "Is my content secure?",
        answer: "Yes. We take data security seriously. Your uploaded samples and generated outlines are stored securely and are only accessible to you. We do not share or use your content for training our models without explicit permission."
      },
      {
        question: "Does OutlineGen work for all types of content?",
        answer: "OutlineGen works best for blog posts, articles, essays, and reports. It can adapt to different writing styles and content types, including how-to guides, listicles, comparison articles, and informational content."
      }
    ],
    account: [
      {
        question: "How do I create an account?",
        answer: "Click the 'Sign Up' button in the top right corner of the page. Enter your email address and create a password. Verify your email address through the link we send you, and you're all set!"
      },
      {
        question: "What are the benefits of creating an account?",
        answer: "Creating an account allows you to save your sample outlines, track your generated outlines, and access additional features depending on your subscription plan. Free accounts get 2 outline generations per month."
      },
      {
        question: "How do I reset my password?",
        answer: "Click the 'Sign In' button, then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you a password reset link."
      },
      {
        question: "Can I delete my account?",
        answer: "Yes. You can delete your account from your Account Settings page. Please note that deleting your account will remove all your data from our system permanently."
      }
    ],
    features: [
      {
        question: "How do I upload a sample outline?",
        answer: "After signing in, navigate to the main page and click on the 'Upload Sample' button. You can upload DOCX, PDF, or TXT files containing your outline. Our system will analyze the structure and formatting."
      },
      {
        question: "Can I edit a generated outline?",
        answer: "Yes, generated outlines can be edited before exporting. However, the edits are not saved back to the system or used for future generations."
      },
      {
        question: "What file formats can I export to?",
        answer: "Free users can download outlines as text files. Pro and Enterprise users can export directly to Google Docs and download in various formats including DOCX, PDF, and TXT."
      },
      {
        question: "How does the Google Docs export work?",
        answer: "The Google Docs export feature (available on Pro and Enterprise plans) creates a new Google Doc with your outline and gives you immediate access to edit and share it through your Google account."
      }
    ],
    technical: [
      {
        question: "What browsers are supported?",
        answer: "OutlineGen works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend keeping your browser updated to the latest version."
      },
      {
        question: "Are there any file size limitations?",
        answer: "Yes, sample outline files are limited to 5MB. This is sufficient for most outlines and helps ensure fast processing."
      },
      {
        question: "Does OutlineGen work on mobile devices?",
        answer: "Yes, OutlineGen is fully responsive and works on mobile devices and tablets. However, for the best experience with detailed outlines, we recommend using a desktop or laptop."
      },
      {
        question: "What happens if I encounter an error?",
        answer: "If you encounter an error, please refresh the page and try again. If the problem persists, contact our support team through the 'Contact Us' page with details about the error."
      }
    ]
  };
  
  // Filter FAQs based on search query
  const filterFAQs = (category: keyof typeof faqs) => {
    if (!searchQuery) return faqs[category];
    
    return faqs[category].filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Help Center
        </h1>
        <div className="h-1 w-40 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
          Find answers to common questions and learn how to get the most from OutlineGen
        </p>
      </div>
      
      {/* Search */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 text-base"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <i className="fas fa-search"></i>
          </div>
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setSearchQuery("")}
            >
              <i className="fas fa-times"></i>
            </Button>
          )}
        </div>
      </div>
      
      {/* FAQ Tabs */}
      <Tabs defaultValue="general" className="mb-16">
        <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {filterFAQs("general").map((faq, index) => (
                <AccordionItem key={index} value={`general-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-lg text-gray-900 dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filterFAQs("general").length === 0 && (
              <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="account">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {filterFAQs("account").map((faq, index) => (
                <AccordionItem key={index} value={`account-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-lg text-gray-900 dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filterFAQs("account").length === 0 && (
              <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="features">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {filterFAQs("features").map((faq, index) => (
                <AccordionItem key={index} value={`features-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-lg text-gray-900 dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filterFAQs("features").length === 0 && (
              <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="technical">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {filterFAQs("technical").map((faq, index) => (
                <AccordionItem key={index} value={`technical-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-lg text-gray-900 dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filterFAQs("technical").length === 0 && (
              <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Help categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-book text-primary text-xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Documentation</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-5">
            Read our detailed guides and tutorials on how to use OutlineGen effectively.
          </p>
          <Link href="/docs">
            <Button variant="outline" className="w-full">
              View Documentation
            </Button>
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-video text-primary text-xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Video Tutorials</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-5">
            Watch step-by-step video guides on how to make the most of OutlineGen's features.
          </p>
          <Link href="/tutorials">
            <Button variant="outline" className="w-full">
              Watch Tutorials
            </Button>
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-headset text-primary text-xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Contact Support</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-5">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Link href="/contact">
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Ask a question */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Still have questions?</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Our team is ready to answer any questions you have about OutlineGen. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <form onSubmit={handleSubmitQuestion} className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <Input id="name" placeholder="John Doe" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subject
            </label>
            <Input id="subject" placeholder="Help with..." required />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Question
            </label>
            <textarea 
              id="message" 
              rows={5} 
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 text-gray-900 dark:text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="Please describe your question in detail..."
              required
            ></textarea>
          </div>
          
          <div className="text-center">
            <Button type="submit" className="bg-gradient-to-r from-primary to-secondary hover:shadow-md text-white px-8 py-2">
              Submit Question
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}