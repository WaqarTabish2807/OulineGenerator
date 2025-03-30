import { 
  users, type User, type InsertUser,
  sampleOutlines, type SampleOutline, type InsertSampleOutline,
  generatedOutlines, type GeneratedOutline, type InsertGeneratedOutline,
  type OutlineContent
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getSampleOutline(id: number): Promise<SampleOutline | undefined>;
  getSampleOutlines(userId?: number): Promise<SampleOutline[]>;
  createSampleOutline(outline: InsertSampleOutline): Promise<SampleOutline>;
  
  getGeneratedOutline(id: number): Promise<GeneratedOutline | undefined>;
  getGeneratedOutlines(userId?: number): Promise<GeneratedOutline[]>;
  createGeneratedOutline(outline: InsertGeneratedOutline): Promise<GeneratedOutline>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private sampleOutlines: Map<number, SampleOutline>;
  private generatedOutlines: Map<number, GeneratedOutline>;
  
  private currentUserId: number;
  private currentSampleOutlineId: number;
  private currentGeneratedOutlineId: number;

  constructor() {
    this.users = new Map();
    this.sampleOutlines = new Map();
    this.generatedOutlines = new Map();
    
    this.currentUserId = 1;
    this.currentSampleOutlineId = 1;
    this.currentGeneratedOutlineId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Sample outline methods
  async getSampleOutline(id: number): Promise<SampleOutline | undefined> {
    return this.sampleOutlines.get(id);
  }

  async getSampleOutlines(userId?: number): Promise<SampleOutline[]> {
    if (userId) {
      return Array.from(this.sampleOutlines.values()).filter(
        (outline) => outline.userId === userId
      );
    }
    return Array.from(this.sampleOutlines.values());
  }

  async createSampleOutline(insertOutline: InsertSampleOutline): Promise<SampleOutline> {
    const id = this.currentSampleOutlineId++;
    const now = new Date();
    const outline: SampleOutline = { 
      ...insertOutline, 
      id, 
      createdAt: now
    };
    this.sampleOutlines.set(id, outline);
    return outline;
  }

  // Generated outline methods
  async getGeneratedOutline(id: number): Promise<GeneratedOutline | undefined> {
    return this.generatedOutlines.get(id);
  }

  async getGeneratedOutlines(userId?: number): Promise<GeneratedOutline[]> {
    if (userId) {
      return Array.from(this.generatedOutlines.values()).filter(
        (outline) => outline.userId === userId
      );
    }
    return Array.from(this.generatedOutlines.values());
  }

  async createGeneratedOutline(insertOutline: InsertGeneratedOutline): Promise<GeneratedOutline> {
    const id = this.currentGeneratedOutlineId++;
    const now = new Date();
    const outline: GeneratedOutline = { 
      ...insertOutline, 
      id, 
      createdAt: now
    };
    this.generatedOutlines.set(id, outline);
    return outline;
  }
}

export const storage = new MemStorage();
