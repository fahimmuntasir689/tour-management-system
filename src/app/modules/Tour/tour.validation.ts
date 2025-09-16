

// export const createTourZodSchema = z.object({
//     title: z.string().min(2, { message: "title must be at least 2 chars" }).max(30, { message: "title must be under 30 chars" }),
//     slug: z.string({ error : "slug is required" }),
//     // images: z.array(z.string()).optional,
//     description: z.string().optional,
//     location: z.string({ error: "location should be a valid location" }).optional,
//     costFrom: z.number({ error: "cost should be a number" }).optional,
//     startDate: z.date({ error: "date should be valid" }).optional().optional(),
//     endDate: z.date({ error: "date should be valid" }).optional().optional(),
//     included: z.array(z.string()).optional,
//     excluded: z.array(z.string()).optional,
//     amenities: z.array(z.string()).optional,
//     tourPlan: z.array(z.string()).optional,
//     minAge: z.number({ error: "age should be a valid number" }).optional,
//     maxGuest: z.string({ error: "guest should be a valid number" }).optional,
//     divison: z.string({ error: "Give a valid division id" }).optional,
//     tourType: z.string({ error: "Give a valid division tour type" }).optional,


// });

import { z } from "zod";

export const createTourZodSchema = z.object({
  title: z.string().min(2, { message: "title must be at least 2 chars" }).max(30, { message: "title must be under 30 chars" }),
  slug: z.string({ required_error: "slug is required" }), 
  description: z.string().optional(),
  location: z.string().optional(),
  costFrom: z.number({ invalid_type_error: "cost should be a number" }).optional(),
  startDate: z.date({ invalid_type_error: "date should be valid" }).optional(),
  endDate: z.date({ invalid_type_error: "date should be valid" }).optional(),
  included: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  tourPlan: z.array(z.string()).optional(),
  minAge: z.number({ invalid_type_error: "age should be a valid number" }).optional(),
  maxGuest: z.number({ invalid_type_error: "guest should be a valid number" }).optional(),
  divison: z.string({ invalid_type_error: "Give a valid division id" }).optional(),
  tourType: z.string({ invalid_type_error: "Give a valid tour type" }).optional(),
});
