import { NextFunction, Request, Response } from "express"

// reusable function

type asyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const catchAsync = (fnctn: asyncHandler) => (req: Request, res: Response, next: NextFunction) => {

    Promise.resolve(fnctn(req, res, next)).catch((err: any) => {

        next(err)

    })

}