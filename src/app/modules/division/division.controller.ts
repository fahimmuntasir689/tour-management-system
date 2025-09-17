import { Request, Response } from "express"
import { catchAsync } from "../../utilities/catchAsync"
import { divisionServices } from "./division.services"
import { sendResponse } from "../../utilities/sendResponse"
import httpStatus from 'http-status-codes'
import { verifyToken } from "../../utilities/jwt"
import { envVars } from "../../../../env"
import { JwtPayload } from "jsonwebtoken"
import AppError from "../../ErrorHelper/AppError"

const createDivision = catchAsync(async (req: Request, res: Response) => {

    const division = await divisionServices.createDivison(req.body)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: "division created successfully",
        success: true,
        data: division

    })
}
)

const getAllDivision = catchAsync(async (req: Request, res: Response) => {
    const divisions = await divisionServices.getAllDivision()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "divisions retrieved sucessfully",
        data: divisions
    })


}
)
const updateDivision = catchAsync(async (req: Request, res: Response) => {
    const division = await req.params.id

    const token = await req.headers.authorization

    const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET)
    const payload = req.body

    const updateDivision = await divisionServices.updateDivision(division, payload, verifiedToken as JwtPayload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "division has been changed sucessfully",
        data: updateDivision
    })


}
)
const deleteDivision = catchAsync(async (req: Request, res: Response) => {

    const division = req.params.id;
    const token = req.headers.authorization


    const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET)
    if (!verifiedToken) {
        throw new AppError(400, 'Token is not verified')
    }

    const deletedDivision = await divisionServices.deleteDivision(division)


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "division has been deleted sucessfully",
        data: deletedDivision
    })


}
)

export const divisionController = {
    createDivision, getAllDivision, updateDivision, deleteDivision
}