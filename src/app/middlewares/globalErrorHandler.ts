/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import AppError from "../ErrorHelper/AppError";
import { envVars } from "../../../env";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500;
    const errorBox: any = []
    let message = "something went wrong"
    if (err.code === 11000) {
        const matchArr = err.message.match(/"([^"]*)"/)
        statusCode = 400
        message = `${matchArr[1]} already exist`
        // console.log(message)

    }
    else if (err.name === "ValidationError") {
        statusCode = 400
        const errors: any = Object.values(err.errors)
        errors.forEach((errorObj: any) => errorBox.push({
            path: errorObj.path,
            message: errorObj.message

        }));
        message = "Validation Error"

    }
    else if (err instanceof Error) {
        statusCode = 500
        message = err.message
    }


    res.status(statusCode).json({
        sucess: false,
        message,
        errorBox,
        err: envVars.NODE_DEV === "development" ? err : null,
        stack: envVars.NODE_DEV === "development" ? err.stack : null

    })
}