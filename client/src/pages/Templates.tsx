import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();
  
  const handleUseTemplate = (templateName: string) => {
    toast({
      title: "Sign in required",
      description: "Please sign in to use this template",
      variant: "destructive",
    });
  };
  
  // Template categories
  const categories = [
    { id: "all", name: "All Templates" },
    { id: "howto", name: "How-To Guides" },
    { id: "listicle", name: "Listicles" },
    { id: "comparison", name: "Comparison" },
    { id: "review", name: "Reviews" },
    { id: "case-study", name: "Case Studies" }
  ];
  
  // Template data
  const templates = [
    {
      id: 1,
      name: "Complete How-To Guide",
      description: "A comprehensive step-by-step guide template with introduction, materials, steps, troubleshooting and conclusion.",
      category: "howto",
      preview: "/samples/how-to-guide.docx",
      popular: true,
      pro: false
    },
    {
      id: 2,
      name: "Product Review",
      description: "Detailed product review template with specs, pros/cons, comparison with alternatives, and final verdict.",
      category: "review",
      preview: "/samples/product-review.docx",
      popular: true,
      pro: false
    },
    {
      id: 3,
      name: "Top 10 Listicle",
      description: "Engaging listicle template for creating top 10 lists with introduction, detailed items, and conclusion.",
      category: "listicle",
      preview: "/samples/top-10-listicle.docx",
      popular: false,
      pro: false
    },
    {
      id: 4,
      name: "Product Comparison",
      description: "Side-by-side product comparison template with feature breakdowns, performance analysis, and recommendation.",
      category: "comparison",
      preview: "/samples/product-comparison.docx",
      popular: false,
      pro: false
    },
    {
      id: 5,
      name: "Ultimate How-To Guide",
      description: "Advanced how-to template with detailed sections, expert tips, resource list, and common mistakes.",
      category: "howto",
      preview: "/samples/ultimate-how-to.docx",
      popular: false,
      pro: true
    },
    {
      id: 6,
      name: "Case Study Analysis",
      description: "Professional case study template with background, challenges, solutions, results, and key takeaways.",
      category: "case-study",
      preview: "/samples/case-study.docx",
      popular: false,
      pro: true
    },
    {
      id: 7,
      name: "Expert Product Review",
      description: "In-depth product review template with technical analysis, user feedback integration, and contextualized verdict.",
      category: "review",
      preview: "/samples/expert-review.docx",
      popular: false,
      pro: true
    },
    {
      id: 8,
      name: "Pros & Cons Comparison",
      description: "Clear pros and cons comparison template for evaluating multiple options with decision framework.",
      category: "comparison",
      preview: "/samples/pros-cons-comparison.docx",
      popular: true,
      pro: true
    }
  ];
  
  // Filter templates based on selected category
  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);
  
  const popularTemplates = templates.filter(template => template.popular);
  
  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Template Library
        </h1>
        <div className="h-1 w-40 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
          Choose from our collection of professionally designed outline templates
        </p>
      </div>
      
      <Tabs defaultValue="browse" className="mb-16">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
          <TabsTrigger value="browse">Browse Templates</TabsTrigger>
          <TabsTrigger value="popular">Popular Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse">
          {/* Category Filter */}
          <div className="mb-8">
            <RadioGroup 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
              className="flex flex-wrap gap-2"
            >
              {categories.map(category => (
                <div className="flex items-center space-x-2" key={category.id}>
                  <RadioGroupItem value={category.id} id={`category-${category.id}`} className="peer sr-only" />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary cursor-pointer transition-colors peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary dark:peer-checked:bg-primary/20"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 relative">
                  <div className="absolute top-4 right-4 space-x-2">
                    {template.popular && (
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        Popular
                      </Badge>
                    )}
                    {template.pro && (
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                        PRO
                      </Badge>
                    )}
                  </div>
                  <div className="h-40 flex items-center justify-center">
                    <div className="w-20 h-20 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full">
                      <i className={`fas fa-${getCategoryIcon(template.category)} text-2xl text-primary`}></i>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">{template.name}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {template.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => window.open(template.preview, '_blank')}>
                    Preview
                  </Button>
                  <Button 
                    className={template.pro ? "bg-gradient-to-r from-primary to-secondary" : ""} 
                    onClick={() => handleUseTemplate(template.name)}
                  >
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="popular">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {popularTemplates.map(template => (
              <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 flex items-center justify-center md:w-1/3">
                    <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full">
                      <i className={`fas fa-${getCategoryIcon(template.category)} text-xl text-primary`}></i>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col md:w-2/3">
                    <div className="mb-2 flex items-center justify-between">
                      <CardTitle className="text-xl">{template.name}</CardTitle>
                      {template.pro && (
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                          PRO
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-gray-600 dark:text-gray-400 mb-4">
                      {template.description}
                    </CardDescription>
                    <div className="mt-auto flex justify-end gap-3">
                      <Button variant="outline" onClick={() => window.open(template.preview, '_blank')}>
                        Preview
                      </Button>
                      <Button 
                        className={template.pro ? "bg-gradient-to-r from-primary to-secondary" : ""} 
                        onClick={() => handleUseTemplate(template.name)}
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Upload Custom Template */}
      <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-8 md:p-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Create Your Own Template</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Have a specific outline structure that works well for your content? Upload your own templates to use with our AI generator.
          </p>
          <Button onClick={() => handleUseTemplate("Custom")} size="lg" className="bg-gradient-to-r from-primary to-secondary hover:shadow-md text-white">
            <i className="fas fa-upload mr-2"></i> Upload Custom Template
          </Button>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Custom templates are available on Pro and Enterprise plans.
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper function to get icon based on category
function getCategoryIcon(category: string): string {
  switch (category) {
    case "howto":
      return "book";
    case "listicle":
      return "list-ol";
    case "comparison":
      return "balance-scale";
    case "review":
      return "star";
    case "case-study":
      return "microscope";
    default:
      return "file-alt";
  }
}