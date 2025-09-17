import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utilities/catchAsync"
import { tourServices, tourTypeServices } from "./tour.services"
import { sendResponse } from "../../utilities/sendResponse"
import httpCodes from "http-status-codes"
import { verifyToken } from "../../utilities/jwt"
import { envVars } from "../../../../env"
import AppError from "../../ErrorHelper/AppError"
import { JwtPayload } from "jsonwebtoken"

const createTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const tour = await tourServices.createTour(req.body)

        console.log(tour)

        sendResponse(res, {
            statusCode: httpCodes.CREATED,
            success: true,
            message: "tour's been created successfully",
            data: tour
        })


    } catch (error) {
        console.log('hello');

        next(error)

    }
})
const getAllTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const tours = await tourServices.getAllTour()


        sendResponse(res, {
            statusCode: httpCodes.OK,
            success: true,
            message: "tours retrieved sucessfully",
            data: tours
        })


    } catch (error) {
        console.log('hello');

        next(error)

    }
})
const updateTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const tour = await req.params.id

        const token = await req.headers.authorization

        const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET)
        const payload = req.body

        const updateTour = await tourServices.updateTour(tour, payload, verifiedToken as JwtPayload)

        sendResponse(res, {
            statusCode: httpCodes.OK,
            success: true,
            message: "tour has been changed sucessfully",
            data: updateTour
        })


    } catch (error) {
        console.log('hello');

        next(error)

    }
})
const deleteTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const tour = req.params.id

        const token = req.headers.authorization

        const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET)
        if (!verifiedToken) {
            throw new AppError(400, 'Token is not verified')
        }

        const deletedTour = await tourServices.deleteTour(tour)


        sendResponse(res, {
            statusCode: httpCodes.OK,
            success: true,
            message: "tour has been deleted sucessfully",
            data: deletedTour
        })





    } catch (error) {

        next(error)


    }
})



const createTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const tourtype = await tourTypeServices.createTourType(req.body)


        sendResponse(res, {
            statusCode: httpCodes.CREATED,
            success: true,
            message: "tour-type's been created successfully",
            data: tourtype
        })


    } catch (error) {

        next(error)

    }
})
const getAllTourTypes = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const tourTypes = await tourTypeServices.getAllTourTypes()



        sendResponse(res, {
            statusCode: httpCodes.OK,
            success: true,
            message: "tour-type's been retrieved successfully",
            data: tourTypes
        })





    } catch (error) {

        next(error)


    }
})
const updateTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const tourtype = await req.params.id

        const token = await req.headers.authorization

        const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET)
        const payload = req.body

        const updateTourType = await tourTypeServices.updateTourType(tourtype, payload, verifiedToken as JwtPayload)

        sendResponse(res, {
            statusCode: httpCodes.OK,
            success: true,
            message: "tour type has been changed sucessfully",
            data: updateTourType
        })


    } catch (error) {

        next(error)

    }
})
const deleteTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const tourType = req.params.id

        const token = req.headers.authorization

        const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET)
        if (!verifiedToken) {
            throw new AppError(400, 'Token is not verified')
        }

        const deletedTourType = await tourTypeServices.deleteTourType(tourType)


        sendResponse(res, {
            statusCode: httpCodes.OK,
            success: true,
            message: "tour has been deleted sucessfully",
            data: deletedTourType
        })





    } catch (error) {

        next(error)


    }
})





export const tourController = {
    createTour, getAllTour, updateTour, deleteTour, createTourType, getAllTourTypes, updateTourType, deleteTourType
}