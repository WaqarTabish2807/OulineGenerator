import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User authentication schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  name: text("name"),
  credits: integer("credits").default(2).notNull(),
  plan: text("plan").default("free").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
});

// Sample outlines schema
export const sampleOutlines = pgTable("sample_outlines", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSampleOutlineSchema = createInsertSchema(sampleOutlines).pick({
  userId: true,
  name: true,
  content: true,
});

// Generated outlines schema
export const generatedOutlines = pgTable("generated_outlines", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sampleId: integer("sample_id").references(() => sampleOutlines.id),
  topic: text("topic").notNull(),
  content: jsonb("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGeneratedOutlineSchema = createInsertSchema(generatedOutlines).pick({
  userId: true,
  sampleId: true,
  topic: true,
  content: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type SampleOutline = typeof sampleOutlines.$inferSelect;
export type InsertSampleOutline = z.infer<typeof insertSampleOutlineSchema>;
export type GeneratedOutline = typeof generatedOutlines.$inferSelect;
export type InsertGeneratedOutline = z.infer<typeof insertGeneratedOutlineSchema>;

// Types for outline structure
export type OutlineSection = {
  title: string;
  items: string[];
};

export type OutlineContent = {
  title: string;
  sections: OutlineSection[];
};
