import React from 'react';
import { GradientButton } from '@/components/ui/gradient-button';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="mb-16">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-indigo-500 bg-opacity-30 blur-xl"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-500 bg-opacity-30 blur-xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Content Strategy?</h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join thousands of content creators who are saving time and improving their blog outlines with OutlineAI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg"
              className="bg-white text-indigo-700 hover:bg-indigo-50 transition-colors gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Get Started for Free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-indigo-500 bg-opacity-30 hover:bg-opacity-40 text-white border border-indigo-400 transition-colors gap-2"
            >
              <CalendarIcon className="h-5 w-5" /> Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
