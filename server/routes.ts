import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { OutlineContent } from "@shared/schema";
import { z } from "zod";
import { extractTextFromDocx, extractTextFromPdf, extractTextFromTxt } from "./document-parser";
import { generateOutline } from "./outline-generator";
import { setupAuth } from "./auth";

// Setup multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/msword', // .doc
      'text/plain', // .txt
      'application/pdf', // .pdf
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only DOCX, DOC, TXT, and PDF files are allowed.'));
    }
  },
});

// Validation schema for the outline generation request
const generateOutlineSchema = z.object({
  topic: z.string().min(3).max(200),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);
  
  // API routes
  app.post('/api/upload-sample', upload.single('file'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      const file = req.file;
      let content = '';
      
      // Extract text based on file type
      if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        content = await extractTextFromDocx(file.buffer);
      } else if (file.mimetype === 'application/msword') {
        content = await extractTextFromDocx(file.buffer);
      } else if (file.mimetype === 'text/plain') {
        content = await extractTextFromTxt(file.buffer);
      } else if (file.mimetype === 'application/pdf') {
        content = await extractTextFromPdf(file.buffer);
      }
      
      // Store the sample outline
      const sampleOutline = await storage.createSampleOutline({
        userId: 1, // Default user ID for now
        name: file.originalname,
        content,
      });
      
      res.status(201).json({
        id: sampleOutline.id,
        name: sampleOutline.name,
        preview: content.substring(0, 200) + (content.length > 200 ? '...' : '')
      });
    } catch (error) {
      console.error('Error uploading sample:', error);
      res.status(500).json({ message: 'Failed to process the uploaded file' });
    }
  });
  
  app.post('/api/generate-outline', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const result = generateOutlineSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Invalid request',
          errors: result.error.format() 
        });
      }
      
      const { topic } = result.data;
      let userId = 1; // Default guest user
      
      // Check if user is authenticated and has credits
      if (req.isAuthenticated()) {
        const user = req.user as Express.User;
        userId = user.id;
        
        if (user.credits <= 0 && user.plan === 'free') {
          return res.status(403).json({ 
            message: 'No credits remaining',
            type: 'CREDIT_LIMIT_REACHED',
            requiresUpgrade: true
          });
        }
      } else {
        // Anonymous user - check how many outlines they've generated
        const generatedOutlines = await storage.getGeneratedOutlines();
        if (generatedOutlines.length >= 2) {
          return res.status(403).json({ 
            message: 'Free trial limit reached. Please sign up to continue.',
            type: 'TRIAL_LIMIT_REACHED',
            requiresSignup: true
          });
        }
      }
      
      // Get the most recent sample outline
      const samples = await storage.getSampleOutlines();
      if (samples.length === 0) {
        return res.status(400).json({ message: 'No sample outline found. Please upload a sample first.' });
      }
      
      // Use the most recent sample
      const sample = samples[samples.length - 1];
      
      // Generate the outline
      const outlineContent = await generateOutline(topic, sample.content);
      
      // Store the generated outline
      const generatedOutline = await storage.createGeneratedOutline({
        userId,
        sampleId: sample.id,
        topic,
        content: outlineContent,
      });
      
      // If authenticated user with free plan, deduct a credit
      if (req.isAuthenticated()) {
        const user = req.user as Express.User;
        if (user.plan === 'free' && user.credits > 0) {
          user.credits -= 1;
        }
      }
      
      res.status(201).json({
        id: generatedOutline.id,
        topic: generatedOutline.topic,
        content: outlineContent,
        creditsRemaining: req.isAuthenticated() ? (req.user as Express.User).credits : null,
      });
    } catch (error) {
      console.error('Error generating outline:', error);
      res.status(500).json({ message: 'Failed to generate outline' });
    }
  });

  app.get('/api/samples', async (req: Request, res: Response) => {
    try {
      const samples = await storage.getSampleOutlines();
      
      // Return basic info about each sample
      const sampleInfo = samples.map(sample => ({
        id: sample.id,
        name: sample.name,
        createdAt: sample.createdAt,
      }));
      
      res.status(200).json(sampleInfo);
    } catch (error) {
      console.error('Error fetching samples:', error);
      res.status(500).json({ message: 'Failed to fetch sample outlines' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Using the imported functions from document-parser.ts and outline-generator.ts
