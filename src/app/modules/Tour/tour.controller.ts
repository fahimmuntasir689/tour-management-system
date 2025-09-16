import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utilities/catchAsync"
import { tourServices } from "./tour.services"
import { sendResponse } from "../../utilities/sendResponse"
import httpCodes from "http-status-codes"

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


export const tourController = {
    createTour
}