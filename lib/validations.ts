import { z } from "zod";

import { projectTypes } from "@/content/site";

const phoneRegex = /^[0-9+\-\s]{8,20}$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Share a little more detail").max(3000),
  website: z.string().optional(),
});

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  businessName: z.string().trim().min(2, "Enter business name").max(120),
  projectType: z.enum(projectTypes),
  budgetRange: z.string().trim().max(80).optional(),
  timeline: z.string().trim().max(80).optional(),
  requirements: z
    .string()
    .trim()
    .min(20, "Share at least 20 characters")
    .max(3000),
  website: z.string().optional(),
});

export const demoSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  companyName: z.string().trim().max(120).optional().or(z.literal("")),
  product: z.string().trim().min(2).max(80),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().optional(),
});

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(1000),
});

export const chatSchema = z.object({
  message: z.string().trim().min(2).max(1000),
  history: z.array(chatMessageSchema).max(10).default([]),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
export type DemoInput = z.infer<typeof demoSchema>;
export type ChatInput = z.infer<typeof chatSchema>;
