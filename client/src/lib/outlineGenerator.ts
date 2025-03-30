import { OutlineContent, OutlineSection } from "@shared/schema";

/**
 * This is a helper function that you can use on the client side
 * to generate a sample outline purely for preview purposes
 * before submitting to the server.
 */
export function generatePreviewOutline(topic: string): OutlineContent {
  const title = topic;
  
  // Determine outline type based on topic
  const lowerTopic = topic.toLowerCase();
  let outlineType = "general";
  
  if (lowerTopic.includes("how to") || lowerTopic.includes("guide")) {
    outlineType = "howto";
  } else if (lowerTopic.includes("vs") || lowerTopic.includes("comparison")) {
    outlineType = "comparison";
  } else if (lowerTopic.includes("review") || lowerTopic.includes("analysis")) {
    outlineType = "review";
  } else if (lowerTopic.includes("tips") || lowerTopic.includes("tricks")) {
    outlineType = "listicle";
  }
  
  let sections: OutlineSection[] = [];
  
  // Generate different outlines based on topic type
  if (outlineType === "howto") {
    const topicWithoutHowTo = topic.replace(/how to/i, '').trim();
    sections = [
      {
        title: "I. Introduction",
        items: [
          `Why learning to ${topicWithoutHowTo} is important`,
          `Common challenges when trying to ${topicWithoutHowTo}`,
          `Benefits you'll gain from mastering ${topicWithoutHowTo}`
        ]
      },
      {
        title: "II. Preparation",
        items: [
          "Essential tools and resources you'll need",
          "Prerequisites and requirements",
          "Setting up your environment for success"
        ]
      },
      {
        title: "III. Step-by-Step Process",
        items: [
          "Step 1: Getting started with the basics",
          "Step 2: Building on your foundation",
          "Step 3: Advancing to intermediate techniques",
          "Step 4: Mastering advanced strategies"
        ]
      },
      {
        title: "IV. Common Mistakes to Avoid",
        items: [
          "Mistake #1: What goes wrong and how to prevent it",
          "Mistake #2: Common pitfalls and their solutions",
          "Mistake #3: Overlooked aspects and their importance"
        ]
      },
      {
        title: "V. Expert Tips and Tricks",
        items: [
          "Pro tip #1: Optimizing your process",
          "Pro tip #2: Efficiency shortcuts",
          "Pro tip #3: Taking your skills to the next level"
        ]
      },
      {
        title: "VI. Conclusion",
        items: [
          "Summary of key steps and processes",
          "Next steps after mastering these techniques",
          "Additional resources for continued learning"
        ]
      }
    ];
  } else if (outlineType === "comparison") {
    // Extract items being compared
    const comparisonMatch = topic.match(/(.*?)\s+vs\.?\s+(.*)/i);
    let itemA = "Option A";
    let itemB = "Option B";
    
    if (comparisonMatch && comparisonMatch.length >= 3) {
      itemA = comparisonMatch[1].trim();
      itemB = comparisonMatch[2].trim();
    }
    
    sections = [
      {
        title: "I. Introduction",
        items: [
          `Overview of ${itemA} and ${itemB}`,
          "Why this comparison matters to you",
          "Key considerations for making your decision"
        ]
      },
      {
        title: "II. Features Comparison",
        items: [
          `${itemA}'s key features and capabilities`,
          `${itemB}'s key features and capabilities`,
          "Side-by-side feature comparison matrix"
        ]
      },
      {
        title: "III. Performance Analysis",
        items: [
          "Testing methodology and criteria",
          "Performance results and benchmarks",
          "Real-world performance scenarios"
        ]
      },
      {
        title: "IV. Price and Value Comparison",
        items: [
          "Pricing structures and options",
          "Cost-benefit analysis",
          "Long-term value considerations"
        ]
      },
      {
        title: "V. Pros and Cons",
        items: [
          `${itemA}: Major advantages and limitations`,
          `${itemB}: Major advantages and limitations`,
          "Which option works best for different user needs"
        ]
      },
      {
        title: "VI. Conclusion and Recommendations",
        items: [
          "Summary of key differences",
          "Best choice for specific use cases",
          "Final recommendation and considerations"
        ]
      }
    ];
  } else if (outlineType === "review") {
    // Extract the product being reviewed
    const product = topic.replace(/review|analysis/gi, '').trim();
    
    sections = [
      {
        title: "I. Introduction",
        items: [
          `Overview of ${product}`,
          "Key specifications and features at a glance",
          "First impressions and unboxing experience"
        ]
      },
      {
        title: "II. Design and Build Quality",
        items: [
          "Aesthetics and visual design",
          "Materials, durability and construction",
          "Ergonomics and usability considerations"
        ]
      },
      {
        title: "III. Performance Evaluation",
        items: [
          "Testing methodology",
          "Performance metrics and results",
          "Real-world performance scenarios",
          "Comparison to competitors"
        ]
      },
      {
        title: "IV. Feature Analysis",
        items: [
          "Standout feature #1: Detailed analysis",
          "Standout feature #2: Detailed analysis",
          "Missing features and limitations"
        ]
      },
      {
        title: "V. Value Proposition",
        items: [
          "Price analysis and positioning",
          "Cost comparisons with alternatives",
          "Long-term value considerations"
        ]
      },
      {
        title: "VI. Final Verdict",
        items: [
          "Rating breakdown by category",
          "Who should buy this product",
          "Who should look elsewhere",
          "Final recommendations and thoughts"
        ]
      }
    ];
  } else if (outlineType === "listicle") {
    // Extract the topic for the list
    const listTopic = topic.replace(/tips|tricks|hacks/gi, '').trim();
    
    sections = [
      {
        title: "I. Introduction",
        items: [
          `Why these ${topic} matter`,
          "Common challenges these tips will solve",
          "How to get the most from this guide"
        ]
      },
      {
        title: "II. Essential Tips (1-5)",
        items: [
          "Tip #1: First essential strategy",
          "Tip #2: Second fundamental approach",
          "Tip #3: Third key technique",
          "Tip #4: Fourth important method",
          "Tip #5: Fifth critical practice"
        ]
      },
      {
        title: "III. Intermediate Strategies (6-10)",
        items: [
          "Tip #6: First intermediate approach",
          "Tip #7: Second advanced technique",
          "Tip #8: Third specialized method",
          "Tip #9: Fourth strategic practice",
          "Tip #10: Fifth professional approach"
        ]
      },
      {
        title: "IV. Expert Techniques (11-15)",
        items: [
          "Tip #11: First expert-level strategy",
          "Tip #12: Second professional technique",
          "Tip #13: Third specialized approach",
          "Tip #14: Fourth advanced method",
          "Tip #15: Fifth master-level practice"
        ]
      },
      {
        title: "V. Implementation Guide",
        items: [
          "How to integrate these tips into your routine",
          "Creating an implementation schedule",
          "Measuring your results and progress"
        ]
      },
      {
        title: "VI. Conclusion",
        items: [
          "Key takeaways and most impactful strategies",
          "Resources for further improvement",
          "Next steps on your journey"
        ]
      }
    ];
  } else {
    // General outline
    sections = [
      {
        title: "I. Introduction",
        items: [
          `What is ${topic}? - Definition and context`,
          `Why ${topic} matters in today's environment`,
          "Key aspects we'll explore in this article"
        ]
      },
      {
        title: "II. Background and Context",
        items: [
          `The evolution of ${topic} over time`,
          "Current state of the industry/field",
          "Key stakeholders and their perspectives"
        ]
      },
      {
        title: "III. Core Concepts",
        items: [
          "First major concept: Detailed explanation",
          "Second major concept: Detailed explanation",
          "Third major concept: Detailed explanation",
          "How these concepts interconnect"
        ]
      },
      {
        title: "IV. Practical Applications",
        items: [
          "Real-world application #1: Case study",
          "Real-world application #2: Case study",
          "Implementation strategies and best practices"
        ]
      },
      {
        title: "V. Challenges and Solutions",
        items: [
          "Major challenge #1 and effective solutions",
          "Major challenge #2 and effective solutions",
          "Future challenges and preparation strategies"
        ]
      },
      {
        title: "VI. Conclusion",
        items: [
          "Summary of key points discussed",
          "Implications for the future",
          "Action steps and recommendations"
        ]
      }
    ];
  }
  
  return { title, sections };
}
