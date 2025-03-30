import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const { toast } = useToast();
  
  const handlePlanSelection = (planName: string) => {
    toast({
      title: "Sign in required",
      description: `Please sign in to subscribe to the ${planName} plan.`,
      variant: "default",
    });
  };
  
  // Calculate savings
  const yearlyDiscount = 20; // 20% discount
  
  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Simple, Transparent Pricing
        </h1>
        <div className="h-1 w-40 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
          Choose the perfect plan for your content creation needs
        </p>
        
        {/* Billing toggle */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <Label htmlFor="billing-toggle" className={`text-sm ${billingCycle === "monthly" ? "font-medium text-primary" : "text-gray-500 dark:text-gray-400"}`}>
            Monthly
          </Label>
          <div className="relative">
            <Switch 
              id="billing-toggle" 
              checked={billingCycle === "yearly"}
              onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
              className="data-[state=checked]:bg-gradient-to-r from-primary to-secondary"
            />
            {billingCycle === "yearly" && (
              <Badge className="absolute -top-8 -right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                Save {yearlyDiscount}%
              </Badge>
            )}
          </div>
          <Label htmlFor="billing-toggle" className={`text-sm ${billingCycle === "yearly" ? "font-medium text-primary" : "text-gray-500 dark:text-gray-400"}`}>
            Yearly
          </Label>
        </div>
      </div>
      
      {/* Pricing tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {/* Free Tier */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition duration-300 hover:shadow-xl hover:scale-[1.02]">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Free</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Perfect for beginners</p>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">$0</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">forever</span>
            </div>
            <Button onClick={() => handlePlanSelection("Free")} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
              Get Started
            </Button>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="text-gray-700 dark:text-gray-300">2 free outlines per month</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="text-gray-700 dark:text-gray-300">Basic template analysis</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="text-gray-700 dark:text-gray-300">Download to text format</span>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fas fa-times text-gray-400 mr-3"></i>
                <span className="line-through">Google Docs export</span>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fas fa-times text-gray-400 mr-3"></i>
                <span className="line-through">Template management</span>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fas fa-times text-gray-400 mr-3"></i>
                <span className="line-through">Priority support</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Pro Tier */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-primary/30 transform scale-[1.02] z-10 relative">
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-white text-center py-2 text-sm font-medium">
            MOST POPULAR
          </div>
          <div className="p-8 pt-14">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pro</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Perfect for content creators</p>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ${billingCycle === "monthly" ? "19" : Math.round(19 * 12 * (1 - yearlyDiscount / 100) / 12)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                /month{billingCycle === "yearly" && " billed annually"}
              </span>
            </div>
            <Button onClick={() => handlePlanSelection("Pro")} className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-md text-white">
              Choose Pro
            </Button>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="text-gray-700 dark:text-gray-300">Unlimited outlines</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="text-gray-700 dark:text-gray-300">Advanced template analysis</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="text-gray-700 dark:text-gray-300">Download in multiple formats</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="text-gray-700 dark:text-gray-300">Google Docs export</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="text-gray-700 dark:text-gray-300">Save up to 10 templates</span>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fas fa-times text-gray-400 mr-3"></i>
                <span className="line-through">Priority support</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Enterprise Tier */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition duration-300 hover:shadow-xl hover:scale-[1.02]">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Enterprise</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Perfect for teams</p>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ${billingCycle === "monthly" ? "49" : Math.round(49 * 12 * (1 - yearlyDiscount / 100) / 12)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                /month{billingCycle === "yearly" && " billed annually"}
              </span>
            </div>
            <Button onClick={() => handlePlanSelection("Enterprise")} className="w-full bg-gray-800 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-900 text-white">
              Choose Enterprise
            </Button>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="text-gray-700 dark:text-gray-300">Everything in Pro</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="text-gray-700 dark:text-gray-300">Team collaboration</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="text-gray-700 dark:text-gray-300">Unlimited templates</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="text-gray-700 dark:text-gray-300">Template sharing</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="text-gray-700 dark:text-gray-300">API access</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="text-gray-700 dark:text-gray-300">Priority support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              q: "How does the credit system work?",
              a: "Free users get 2 outlines per month. Paid plans offer unlimited outlines with enhanced features based on the selected tier."
            },
            {
              q: "Can I upgrade or downgrade my plan?",
              a: "Yes, you can upgrade or downgrade your plan at any time. When downgrading, changes will take effect after your current billing cycle."
            },
            {
              q: "Do you offer refunds?",
              a: "We offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied, contact our support team within 14 days of your purchase."
            },
            {
              q: "Is there a limit to how many templates I can save?",
              a: "Free users can only use templates without saving them. Pro users can save up to 10 templates, while Enterprise users have unlimited template storage."
            },
            {
              q: "How does Google Docs export work?",
              a: "The Google Docs export feature allows you to send your generated outline directly to a new Google Doc, preserving all formatting and structure."
            },
            {
              q: "Do you offer custom enterprise solutions?",
              a: "Yes, for larger teams or specific needs, we offer custom enterprise solutions. Contact our sales team to discuss your requirements."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA */}
      <section className="mt-20 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Still have questions?</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Our support team is here to help you find the perfect plan for your needs.
        </p>
        <Link href="/contact">
          <Button size="lg" variant="outline" className="px-8">
            Contact Sales
          </Button>
        </Link>
      </section>
    </div>
  );
}