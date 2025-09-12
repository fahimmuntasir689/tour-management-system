import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes'
import { userServices } from "./user.services";
import { catchAsync } from "../../utilities/catchAsync";
import { User } from "./user.model";
import { sendResponse } from "../../utilities/sendResponse";
import { verifyToken } from "../../utilities/jwt";
import { envVars } from "../../../../env";
import { JwtPayload } from "jsonwebtoken";
// import { AppError } from "../../ErrorHelper/AppError";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "user created successfully",
        success: true,
        data: user

    })

})
const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const token = req.headers.authorization;

    const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET)
    const payload = req.body

    const user = await userServices.updateUser(userId, payload, verifiedToken as JwtPayload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "user updated successfully",
        success: true,
        data: user

    })

})


const returnAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    try {
        console.log('return er age')
        const users = await User.find()
        console.log('return er pore')

        sendResponse(res, {
            statusCode: httpStatus.OK,
            message: "user retrieved successfully",
            success: true,
            data: users

        })

    } catch (error) {
        next(error)

    }

})


export const userControllers = {
    createUser, returnAllUser, updateUser
}