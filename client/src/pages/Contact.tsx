import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: "general",
    message: "",
    agreeToTerms: false,
  });
  
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
  };
  
  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiry: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.agreeToTerms) {
      toast({
        title: "Please agree to the terms",
        description: "You must agree to our terms and conditions to submit the form.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Message sent!",
      description: "We've received your message and will get back to you soon.",
      variant: "default",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      inquiry: "general",
      message: "",
      agreeToTerms: false,
    });
  };
  
  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Contact Us
        </h1>
        <div className="h-1 w-40 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Our team is here to help with any questions you have about OutlineGen. Choose the best way to reach us below.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <i className="fas fa-envelope text-primary"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1">For general inquiries:</p>
                <a href="mailto:info@outlinegen.com" className="text-primary hover:underline">info@outlinegen.com</a>
                <p className="text-gray-600 dark:text-gray-300 mb-1 mt-3">For support:</p>
                <a href="mailto:support@outlinegen.com" className="text-primary hover:underline">support@outlinegen.com</a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <i className="fas fa-headset text-primary"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1">Monday-Friday, 9am-5pm ET</p>
                <a href="tel:+18001234567" className="text-primary hover:underline">+1 (800) 123-4567</a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <i className="fas fa-map-marker-alt text-primary"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Our Office</h3>
                <address className="text-gray-600 dark:text-gray-300 not-italic">
                  123 Content Creator Ave<br />
                  Suite 456<br />
                  San Francisco, CA 94103
                </address>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-primary/20 p-3 rounded-full hover:bg-primary/30 transition-colors">
                <i className="fab fa-twitter text-primary"></i>
              </a>
              <a href="#" className="bg-primary/20 p-3 rounded-full hover:bg-primary/30 transition-colors">
                <i className="fab fa-facebook-f text-primary"></i>
              </a>
              <a href="#" className="bg-primary/20 p-3 rounded-full hover:bg-primary/30 transition-colors">
                <i className="fab fa-linkedin-in text-primary"></i>
              </a>
              <a href="#" className="bg-primary/20 p-3 rounded-full hover:bg-primary/30 transition-colors">
                <i className="fab fa-instagram text-primary"></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                Your Name <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label className="text-gray-700 dark:text-gray-300 block mb-3">
                Type of Inquiry <span className="text-red-500">*</span>
              </Label>
              <RadioGroup 
                value={formData.inquiry} 
                onValueChange={handleRadioChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general" id="inquiry-general" />
                  <Label htmlFor="inquiry-general" className="text-gray-700 dark:text-gray-300">General Question</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sales" id="inquiry-sales" />
                  <Label htmlFor="inquiry-sales" className="text-gray-700 dark:text-gray-300">Sales & Pricing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="support" id="inquiry-support" />
                  <Label htmlFor="inquiry-support" className="text-gray-700 dark:text-gray-300">Technical Support</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="feedback" id="inquiry-feedback" />
                  <Label htmlFor="inquiry-feedback" className="text-gray-700 dark:text-gray-300">Feedback & Suggestions</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">
                Your Message <span className="text-red-500">*</span>
              </Label>
              <textarea 
                id="message" 
                name="message" 
                rows={5} 
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 text-gray-900 dark:text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                required
              ></textarea>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={formData.agreeToTerms}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and consent to being contacted about my inquiry.
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-md text-white py-2"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-10">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              What's your typical response time?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We aim to respond to all inquiries within 24 hours during business days. For urgent technical support, Pro and Enterprise users receive priority response.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Do you offer phone support?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, phone support is available for all paid plans during business hours (9am-5pm ET, Monday through Friday).
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Can I request a feature?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Absolutely! We love hearing from our users. Use the contact form and select "Feedback & Suggestions" to submit your feature request.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              How do I report a bug?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              For bug reports, please contact us using the form above and select "Technical Support". Include as much detail as possible to help us resolve the issue quickly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}