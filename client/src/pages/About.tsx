import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            About OutlineGen
          </h1>
          <div className="h-1 w-40 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            We're revolutionizing how content creators plan and structure their blogs with AI-powered outline generation.
          </p>
        </section>

        {/* Our Story */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Story</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            <p className="text-gray-700 dark:text-gray-300">
              OutlineGen was born from a simple observation: creating well-structured blog outlines consistently is both time-consuming and challenging. Our team of content creators and developers joined forces to solve this problem.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We built a platform that analyzes the structure of your best outlines and replicates that success for any new topic. What used to take hours now takes seconds, all while maintaining your unique writing style and structural preferences.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Since our launch, we've helped thousands of content creators, marketing teams, and bloggers streamline their content production process.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg">
            <div className="aspect-video rounded-lg overflow-hidden bg-white dark:bg-gray-700 p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto w-20 h-20 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <i className="fas fa-lightbulb text-3xl text-primary"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Our Mission</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  To empower content creators with intelligent tools that enhance creativity and productivity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-10 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How OutlineGen Works</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <i className="fas fa-upload text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">1. Upload Sample</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Upload your best-performing blog outlines as samples. Our system analyzes the structure, style, and formatting.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <i className="fas fa-magic text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">2. Generate Outline</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Enter your new blog topic and our AI engine will create a tailored outline following your preferred structure.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <i className="fas fa-file-export text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">3. Export & Use</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Export your new outline to Google Docs or download it for immediate use in your content creation workflow.
              </p>
            </div>
          </div>
        </section>
        
        {/* Team */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
            <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mt-4">
              We're a passionate team of content creators, developers, and AI specialists dedicated to building tools that make content creation more efficient and effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & CEO",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                bg: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
              },
              {
                name: "Jamie Chen",
                role: "CTO",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                bg: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20"
              },
              {
                name: "Sam Reynolds",
                role: "Head of Content",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                bg: "from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20"
              },
              {
                name: "Taylor Reed",
                role: "AI Specialist",
                image: "https://randomuser.me/api/portraits/men/75.jpg",
                bg: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
              }
            ].map((member, index) => (
              <div key={index} className={`bg-gradient-to-br ${member.bg} p-6 rounded-xl shadow-sm`}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-300 mb-4 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* CTA */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Transform Your Content Creation?</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of content creators who are saving time and improving their blog structure with OutlineGen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:shadow-md text-white px-8">
                Try For Free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="px-8">
                View Pricing
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}