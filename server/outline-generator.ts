/**
 * Outline Generator
 * 
 * This file contains functions for generating blog outlines based on provided topics
 * and sample outlines. It analyzes the structure of sample outlines and generates
 * new outlines that match the formatting while adapting to the new topic.
 */

import { OutlineContent, OutlineSection } from "@shared/schema";

/**
 * Generate an outline based on a topic and sample content
 * @param topic The blog topic for the new outline
 * @param sampleContent The content of a sample outline to use as a template
 * @returns A structured outline for the given topic
 */
export async function generateOutline(topic: string, sampleContent: string): Promise<OutlineContent> {
  const title = topic;
  
  // Parse the sample content to detect its structure
  // This approach tries to actually use the sample content's format
  const sectionRegex = /^\s*([IVX]+\.|[A-Z]\.|[0-9]+\.|#)\s+(.+)$/gm;
  const bulletRegex = /^\s*[\-\*•]\s+(.+)$/gm;
  
  let sampleSections: OutlineSection[] = [];
  let currentSection: OutlineSection | null = null;
  
  // Try to identify section patterns in the sample
  const sampleLines = sampleContent.split('\n');
  for (let i = 0; i < sampleLines.length; i++) {
    const line = sampleLines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Check if this is a section heading
    const sectionMatch = line.match(/^\s*([IVX]+\.|[A-Z]\.|[0-9]+\.|#)\s+(.+)$/);
    if (sectionMatch) {
      // If we already had a section, push it to our list
      if (currentSection) {
        sampleSections.push(currentSection);
      }
      
      // Start a new section
      currentSection = {
        title: line,
        items: []
      };
      continue;
    }
    
    // Check if this is a bullet point
    const bulletMatch = line.match(/^\s*[\-\*•]\s+(.+)$/);
    if (bulletMatch && currentSection) {
      currentSection.items.push(bulletMatch[1]);
      continue;
    }
    
    // If we have a current section and the line doesn't match patterns,
    // it might be a continued bullet point from previous line
    if (currentSection && currentSection.items.length > 0) {
      const lastItemIndex = currentSection.items.length - 1;
      currentSection.items[lastItemIndex] += ' ' + line;
    }
  }
  
  // Don't forget to add the last section if there is one
  if (currentSection) {
    sampleSections.push(currentSection);
  }
  
  // If we couldn't identify any sections, use a fallback pattern
  // but adapt it to the topic
  if (sampleSections.length === 0) {
    // Extract keywords from the topic to customize the outline
    const keywords = topic.split(' ')
      .filter(word => word.length > 3)
      .map(word => word.toLowerCase());
    
    // Create sections based on topic
    const topicWords = topic.toLowerCase();
    
    let sectionStyle = "I."; // Default numbering style
    
    if (sampleContent.includes('#')) {
      sectionStyle = "#";
    } else if (sampleContent.match(/^[A-Z]\./m)) {
      sectionStyle = "A.";
    } else if (sampleContent.match(/^[0-9]+\./m)) {
      sectionStyle = "1.";
    }
    
    sampleSections = generateCustomSections(topic, sectionStyle);
  } else {
    // We found sections in the sample, now adapt them to the new topic
    sampleSections = adaptSectionsToTopic(sampleSections, topic);
  }
  
  return { title, sections: sampleSections };
}

/**
 * Adapts sample outline sections to a new topic
 * @param sections The sample outline sections
 * @param topic The new topic
 * @returns Sections adapted to the new topic
 */
function adaptSectionsToTopic(sections: OutlineSection[], topic: string): OutlineSection[] {
  const adaptedSections: OutlineSection[] = [];
  const lowerTopic = topic.toLowerCase();
  
  // Identify key topic words
  const keywords = topic.split(' ')
    .filter(word => word.length > 3)
    .map(word => word.toLowerCase());
  
  // Determine topic type
  let topicType = "general";
  if (lowerTopic.includes("how to") || lowerTopic.includes("guide")) {
    topicType = "howto";
  } else if (lowerTopic.includes("vs") || lowerTopic.includes("comparison")) {
    topicType = "comparison";
  } else if (lowerTopic.includes("review") || lowerTopic.includes("analysis")) {
    topicType = "review";
  } else if (lowerTopic.includes("tips") || lowerTopic.includes("tricks")) {
    topicType = "listicle";
  }
  
  // Keep the same section structure but adapt content
  for (const section of sections) {
    const adaptedSection: OutlineSection = {
      title: section.title,
      items: []
    };
    
    // If the section title contains common headings, we can adapt it
    const lowerTitle = section.title.toLowerCase();
    if (lowerTitle.includes("introduction") || lowerTitle.includes("overview")) {
      // For introduction sections, keep title but adapt items
      adaptedSection.items = adaptIntroductionItems(section.items, topic, topicType);
    } else if (lowerTitle.includes("conclusion") || lowerTitle.includes("summary")) {
      // For conclusion sections, keep title but adapt items
      adaptedSection.items = adaptConclusionItems(section.items, topic, topicType);
    } else {
      // For other sections, keep the structure but adapt the content
      for (const item of section.items) {
        const adaptedItem = adaptItemToTopic(item, topic, topicType);
        adaptedSection.items.push(adaptedItem);
      }
    }
    
    adaptedSections.push(adaptedSection);
  }
  
  return adaptedSections;
}

/**
 * Adapts introduction section items to a new topic
 */
function adaptIntroductionItems(items: string[], topic: string, topicType: string): string[] {
  // Generate new introduction items while preserving the count
  const adaptedItems: string[] = [];
  const count = items.length;
  
  // Extract topic without "how to" if present
  const topicClean = topic.replace(/how to/i, '').trim();
  
  if (topicType === "howto") {
    adaptedItems.push(`Why learning to ${topicClean} is important`);
    adaptedItems.push(`Common challenges when trying to ${topicClean}`);
    adaptedItems.push(`Benefits you'll gain from mastering ${topicClean}`);
  } else if (topicType === "comparison") {
    // Extract items being compared
    const comparisonMatch = topic.match(/(.*?)\s+vs\.?\s+(.*)/i);
    if (comparisonMatch && comparisonMatch.length >= 3) {
      const itemA = comparisonMatch[1].trim();
      const itemB = comparisonMatch[2].trim();
      adaptedItems.push(`Overview of ${itemA} and ${itemB}`);
      adaptedItems.push(`Why comparing ${itemA} and ${itemB} matters`);
      adaptedItems.push(`Key factors to consider in this comparison`);
    } else {
      adaptedItems.push(`Overview of the options being compared`);
      adaptedItems.push(`Importance of making the right choice`);
      adaptedItems.push(`Key factors in this comparison`);
    }
  } else if (topicType === "review") {
    adaptedItems.push(`Overview of ${topic}`);
    adaptedItems.push(`Why this ${topic} review matters`);
    adaptedItems.push(`What to expect from this analysis`);
  } else if (topicType === "listicle") {
    adaptedItems.push(`Why these ${topic} are game-changers`);
    adaptedItems.push(`Common problems these tips will solve`);
    adaptedItems.push(`How to get the most from this guide`);
  } else {
    // General topic
    adaptedItems.push(`What is ${topic} - definitions and context`);
    adaptedItems.push(`Why understanding ${topic} matters today`);
    adaptedItems.push(`Key aspects of ${topic} covered in this article`);
  }
  
  // Fill remaining items if needed
  while (adaptedItems.length < count) {
    adaptedItems.push(`Additional context about ${topic}`);
  }
  
  // If we have too many, truncate
  return adaptedItems.slice(0, count);
}

/**
 * Adapts conclusion section items to a new topic
 */
function adaptConclusionItems(items: string[], topic: string, topicType: string): string[] {
  // Generate new conclusion items while preserving the count
  const adaptedItems: string[] = [];
  const count = items.length;
  
  adaptedItems.push(`Summary of key points about ${topic}`);
  adaptedItems.push(`Practical takeaways and next steps`);
  
  if (topicType === "howto") {
    adaptedItems.push(`Resources for further learning about ${topic}`);
  } else if (topicType === "comparison") {
    adaptedItems.push(`Final recommendation based on your specific needs`);
  } else if (topicType === "review") {
    adaptedItems.push(`Final verdict on ${topic}`);
  } else if (topicType === "listicle") {
    adaptedItems.push(`How to combine these tips for maximum results`);
  } else {
    adaptedItems.push(`Future trends in ${topic} to watch`);
  }
  
  // Fill remaining items if needed
  while (adaptedItems.length < count) {
    adaptedItems.push(`Additional reflections on ${topic}`);
  }
  
  // If we have too many, truncate
  return adaptedItems.slice(0, count);
}

/**
 * Adapts a bullet point item to a new topic
 */
function adaptItemToTopic(item: string, topic: string, topicType: string): string {
  // Keep special formats like numbered lists intact
  const hasNumbering = item.match(/^(\d+\.\s+)/);
  const prefix = hasNumbering ? hasNumbering[1] : "";
  
  // Extract topic without "how to" if present
  const topicClean = topic.replace(/how to/i, '').trim();
  
  // Check if item has specific patterns we can adapt
  const lowerItem = item.toLowerCase();
  
  if (lowerItem.includes("example") || lowerItem.includes("case stud")) {
    return `${prefix}Real-world example of ${topic} in action`;
  }
  
  if (lowerItem.includes("benefit") || lowerItem.includes("advantage")) {
    return `${prefix}Key benefit: improved ${topicClean} outcomes`;
  }
  
  if (lowerItem.includes("step") || lowerItem.includes("process")) {
    return `${prefix}Essential step in mastering ${topic}`;
  }
  
  if (lowerItem.includes("tool") || lowerItem.includes("resource")) {
    return `${prefix}Recommended tools and resources for ${topic}`;
  }
  
  if (lowerItem.includes("challenge") || lowerItem.includes("problem")) {
    return `${prefix}Common challenge when working with ${topic} and its solution`;
  }
  
  // If no specific pattern, return a generic adaptation
  return `${prefix}${item.replace(/^(\d+\.\s+)/, "")} related to ${topic}`;
}

/**
 * Helper function to generate custom sections based on the topic
 * @param topic The blog topic
 * @param style The section numbering style
 * @returns Outline sections
 */
function generateCustomSections(topic: string, style: string): OutlineSection[] {
  // Extract information from the topic
  const lowerTopic = topic.toLowerCase();
  let sections: OutlineSection[] = [];
  
  // Determine outline type based on topic
  let outlineType = "general";
  
  if (lowerTopic.includes("how to") || lowerTopic.includes("guide") || lowerTopic.includes("steps")) {
    outlineType = "howto";
  } else if (lowerTopic.includes("vs") || lowerTopic.includes("versus") || lowerTopic.includes("compare")) {
    outlineType = "comparison";
  } else if (lowerTopic.includes("review") || lowerTopic.includes("analysis")) {
    outlineType = "review";
  } else if (lowerTopic.includes("tips") || lowerTopic.includes("tricks") || lowerTopic.includes("hacks")) {
    outlineType = "listicle";
  }
  
  // Generate appropriate sections based on outline type
  if (outlineType === "howto") {
    const topicWithoutHowTo = topic.replace(/how to/i, '').trim();
    sections = [
      {
        title: getNumberedTitle(style, 1, `Introduction: Why ${topicWithoutHowTo} Matters`),
        items: [
          `The importance of ${topicWithoutHowTo}`,
          "Common challenges people face",
          "What you'll learn in this guide"
        ]
      },
      {
        title: getNumberedTitle(style, 2, "What You'll Need"),
        items: [
          "Essential tools and resources",
          "Prerequisites and requirements",
          "Preparation steps"
        ]
      },
      {
        title: getNumberedTitle(style, 3, "Step-by-Step Process"),
        items: [
          "First major step with detailed instructions",
          "Second important step with tips for success",
          "Third critical step with troubleshooting guidance",
          "Final steps to complete the process"
        ]
      },
      {
        title: getNumberedTitle(style, 4, "Common Mistakes to Avoid"),
        items: [
          "Mistake #1: Description and solution",
          "Mistake #2: Description and solution",
          "Mistake #3: Description and solution"
        ]
      },
      {
        title: getNumberedTitle(style, 5, "Advanced Tips for Better Results"),
        items: [
          "Pro tip #1 for optimization",
          "Pro tip #2 for efficiency",
          "Pro tip #3 for professional results"
        ]
      },
      {
        title: getNumberedTitle(style, 6, "Conclusion and Next Steps"),
        items: [
          "Summary of key points",
          "Additional resources to explore",
          "What to try next after mastering this process"
        ]
      }
    ];
  } else if (outlineType === "comparison") {
    // Extract items being compared
    const comparisonMatch = lowerTopic.match(/(.*?)\s+vs\.?\s+(.*)/i);
    let itemA = "Option A";
    let itemB = "Option B";
    
    if (comparisonMatch && comparisonMatch.length >= 3) {
      itemA = comparisonMatch[1].trim();
      itemB = comparisonMatch[2].trim();
    }
    
    sections = [
      {
        title: getNumberedTitle(style, 1, `Introduction to ${itemA} and ${itemB}`),
        items: [
          `What is ${itemA}? - Overview and history`,
          `What is ${itemB}? - Overview and history`,
          "Why comparing these options matters",
          "Who should read this comparison"
        ]
      },
      {
        title: getNumberedTitle(style, 2, "Key Features Comparison"),
        items: [
          `${itemA} standout features`,
          `${itemB} standout features`,
          "Overlapping capabilities",
          "Feature-by-feature detailed breakdown"
        ]
      },
      {
        title: getNumberedTitle(style, 3, "Performance and Efficiency"),
        items: [
          `${itemA} performance metrics`,
          `${itemB} performance metrics`,
          "Real-world speed and efficiency tests",
          "Resource utilization comparison"
        ]
      },
      {
        title: getNumberedTitle(style, 4, "Cost Analysis"),
        items: [
          `${itemA} pricing structure`,
          `${itemB} pricing structure`,
          "Hidden costs to consider",
          "Long-term cost projection"
        ]
      },
      {
        title: getNumberedTitle(style, 5, "Pros and Cons"),
        items: [
          `${itemA} advantages and limitations`,
          `${itemB} advantages and limitations`,
          "Ideal use cases for each option"
        ]
      },
      {
        title: getNumberedTitle(style, 6, "Verdict and Recommendations"),
        items: [
          "Best for beginners",
          "Best for professionals",
          "Best value for money",
          "Final recommendation based on specific needs"
        ]
      }
    ];
  } else if (outlineType === "review") {
    // Extract the product/service being reviewed
    const productMatch = lowerTopic.replace(/review|analysis/gi, '').trim();
    const product = productMatch || "Product";
    
    sections = [
      {
        title: getNumberedTitle(style, 1, `Introduction to ${product}`),
        items: [
          `What is ${product}? - Overview and background`,
          "Key specifications and features",
          "Market positioning and target audience",
          "First impressions"
        ]
      },
      {
        title: getNumberedTitle(style, 2, "Design and Build Quality"),
        items: [
          "Aesthetic design analysis",
          "Materials and durability",
          "Ergonomics and usability",
          "Comparison to competitors"
        ]
      },
      {
        title: getNumberedTitle(style, 3, "Performance Evaluation"),
        items: [
          "Testing methodology",
          "Performance metrics and results",
          "Real-world usage scenarios",
          "Stress testing outcomes"
        ]
      },
      {
        title: getNumberedTitle(style, 4, "Feature Deep Dive"),
        items: [
          "Standout feature #1 - Analysis",
          "Standout feature #2 - Analysis",
          "Standout feature #3 - Analysis",
          "Missing features and limitations"
        ]
      },
      {
        title: getNumberedTitle(style, 5, "Value for Money"),
        items: [
          "Pricing analysis",
          "Comparison to alternatives",
          "Long-term value assessment",
          "Additional costs to consider"
        ]
      },
      {
        title: getNumberedTitle(style, 6, "Final Verdict"),
        items: [
          "Scoring breakdown",
          "Who should buy this",
          "Who should avoid this",
          "Final recommendations"
        ]
      }
    ];
  } else if (outlineType === "listicle") {
    // Extract the topic for the list
    const listTopic = lowerTopic.replace(/tips|tricks|hacks|top|best/gi, '').trim();
    
    sections = [
      {
        title: getNumberedTitle(style, 1, `Introduction: Why ${listTopic} Matter`),
        items: [
          `The importance of mastering ${listTopic}`,
          "Common challenges people face",
          "How these tips will help you succeed"
        ]
      },
      {
        title: getNumberedTitle(style, 2, "Essential Tips (#1-5)"),
        items: [
          "Tip #1: Specific actionable advice",
          "Tip #2: Specific actionable advice",
          "Tip #3: Specific actionable advice",
          "Tip #4: Specific actionable advice",
          "Tip #5: Specific actionable advice"
        ]
      },
      {
        title: getNumberedTitle(style, 3, "Advanced Strategies (#6-10)"),
        items: [
          "Tip #6: Specific actionable advice",
          "Tip #7: Specific actionable advice",
          "Tip #8: Specific actionable advice",
          "Tip #9: Specific actionable advice",
          "Tip #10: Specific actionable advice"
        ]
      },
      {
        title: getNumberedTitle(style, 4, "Expert-Level Techniques (#11-15)"),
        items: [
          "Tip #11: Specific actionable advice",
          "Tip #12: Specific actionable advice",
          "Tip #13: Specific actionable advice",
          "Tip #14: Specific actionable advice",
          "Tip #15: Specific actionable advice"
        ]
      },
      {
        title: getNumberedTitle(style, 5, "Tools and Resources"),
        items: [
          "Recommended tool/resource #1",
          "Recommended tool/resource #2",
          "Recommended tool/resource #3",
          "How to combine these resources for best results"
        ]
      },
      {
        title: getNumberedTitle(style, 6, "Implementation Plan"),
        items: [
          "Getting started: First steps",
          "Building momentum: Week 1 plan",
          "Mastering the process: Long-term strategy",
          "Measuring your success"
        ]
      }
    ];
  } else {
    // General outline for any other type of content
    sections = [
      {
        title: getNumberedTitle(style, 1, "Introduction"),
        items: [
          `What is ${topic}? - Definitions and context`,
          "Why this topic matters",
          "Overview of key points"
        ]
      },
      {
        title: getNumberedTitle(style, 2, "Background and Context"),
        items: [
          "Historical development",
          "Current landscape",
          "Future trends and predictions"
        ]
      },
      {
        title: getNumberedTitle(style, 3, "Key Components"),
        items: [
          "First major component - Explanation and analysis",
          "Second major component - Explanation and analysis",
          "Third major component - Explanation and analysis",
          "How these components interact"
        ]
      },
      {
        title: getNumberedTitle(style, 4, "Practical Applications"),
        items: [
          "Real-world application #1",
          "Real-world application #2",
          "Real-world application #3",
          "Implementation strategies"
        ]
      },
      {
        title: getNumberedTitle(style, 5, "Challenges and Solutions"),
        items: [
          "Common challenge #1 and how to overcome it",
          "Common challenge #2 and how to overcome it",
          "Common challenge #3 and how to overcome it",
          "Preventative measures"
        ]
      },
      {
        title: getNumberedTitle(style, 6, "Conclusion and Future Directions"),
        items: [
          "Summary of key points",
          "Actionable takeaways",
          "Future developments to watch",
          "Final thoughts"
        ]
      }
    ];
  }
  
  return sections;
}

/**
 * Helper function to generate properly formatted section titles
 * @param style The section numbering style
 * @param index The section index
 * @param title The section title text
 * @returns Formatted section title
 */
function getNumberedTitle(style: string, index: number, title: string): string {
  if (style === "#") {
    return `# ${title}`;
  } else if (style === "A.") {
    const letter = String.fromCharCode(64 + index);
    return `${letter}. ${title}`;
  } else if (style === "1.") {
    return `${index}. ${title}`;
  } else {
    // Roman numerals
    const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return `${romans[index-1]}. ${title}`;
  }
}