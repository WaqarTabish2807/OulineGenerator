import React from 'react';
import { GradientButton } from '@/components/ui/gradient-button';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="text-center mb-16 pt-4">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 leading-tight">
        Generate Professional Blog Outlines<br className="hidden md:inline" /> in Seconds
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        Transform your ideas into structured blog outlines with AI-powered assistance. Upload samples and get tailored results for your content strategy.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <GradientButton size="lg" className="gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg> 
          Get Started
        </GradientButton>
        <Button 
          variant="outline" 
          size="lg" 
          className="gap-2"
        >
          <Play className="h-4 w-4" /> Watch Demo
        </Button>
      </div>
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-xl transform -translate-y-4"></div>
        <div className="relative w-full h-auto overflow-hidden rounded-xl shadow-2xl animate-[floating_3s_ease-in-out_infinite]">
          <div className="rounded-xl border-2 border-gray-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1200&auto=format&fit=crop"
              alt="OutlineAI Dashboard Preview" 
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
