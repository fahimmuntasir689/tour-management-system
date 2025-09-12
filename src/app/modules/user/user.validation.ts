import z from "zod";

export const createUserZodSchema = z.object({
    name: z.string({ error: 'name must be a string' }).min(2).max(30),
    email: z.string({ error: 'it should be string' }).email({ message: 'invalid email' }),
    password: z.string({ error: 'password has to be given' }).regex(/[A-Z]/, { message: "Password must contain at least 1 uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least 1 digit" })
        .regex(/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;'/]/, {
            message: "Password must contain at least 1 special character",
        }),
    phone: z.string().regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/, {
        message: "Invalid Bangladesh phone number",
    }).optional(),


});
export const updateUserZodSchema = z.object({
    name: z.string({ error: 'name must be a string' }).min(2).max(30).optional(),
    password: z.string({ error: 'password lagbei' }).regex(/[A-Z]/, { message: "Password must contain at least 1 uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least 1 digit" })
        .regex(/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;'/]/, {
            message: "Password must contain at least 1 special character",
        }).optional(),
    phone: z.string().regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/, {
        message: "Invalid Bangladeshi phone number",
    }).optional(),

});

//     export interface IDivision {
//     name: string,
//     slug: string,
//     thumbnail ?: string,
//     description ?: string
// }
export const createDivisionZodSchema = z.object({
    name: z.string({ error: 'name must be a string' }).min(2).max(30).optional(),
    slug: z.string({ error: 'slug must be a string' }).min(5).max(30).optional(),
    thumbnail: z.string({ error: 'thumbnail must be a link' }).optional(),
    description: z.string({ error: 'description must be a string' }).min(10).max(30).optional()


}); 