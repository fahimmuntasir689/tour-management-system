import z from "zod";


export const createTourZodSchema = z.object({
    title: z.string({ error: 'title must be a string' }).min(2).max(30),
    slug: z.string({ error: 'it should be string' }),
    images: z.string({ error: "Image must be a valid link" }).optional,
    description: z.string({ message: "Description must be a valid link" }).optional,
    location: z.string({ error: "location should be a valid location" }).optional,
    costFrom: z.number({ error: "cost should be a number" }).optional,
    startDate: z.date({ error: "date should be valid" }).optional().optional(),
    endDate: z.date({ error: "date should be valid" }).optional().optional(),  
    included: z.array(z.string()).optional,
    excluded: z.array(z.string()).optional,
    amenities: z.array(z.string()).optional,
    tourPlan: z.array(z.string()).optional,
    minAge: z.number({ error: "age should be a valid number" }).optional,
    maxGuest: z.string({ error: "guest should be a valid number" }).optional,
    divison: z.string({ error: "Give a valid division id" }).optional,
    tourType: z.string({ error: "Give a valid division tour type" }).optional,


});