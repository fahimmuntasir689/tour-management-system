import { Request, Response } from "express";
import httpCodes from 'http-status-codes'

export const notFound = ( req: Request , res: Response) => {
    res.status(httpCodes.NOT_FOUND).json({
        success : false,
        message: "not found anything"
    })

}