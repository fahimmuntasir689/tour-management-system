import { NextFunction, Request, Response } from "express"

export const validateRequest = (ZodSchema: any) => async (req: Request, res: Response, next: NextFunction) => {

    try {

        req.body = await ZodSchema.parseAsync(req.body)

        next()

    } catch (error) {
        
        next(error)

    }


}