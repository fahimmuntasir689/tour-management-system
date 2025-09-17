
import { JwtPayload } from "jsonwebtoken"
import { ITour, ITourType } from "./tour.interface"
import { Tour, TourType } from "./tour.model"
import AppError from "../../ErrorHelper/AppError"
import httpCodes from "http-status-codes"
import { Role } from "../user/user.interface"

const createTour = async (payload: ITour) => {

    const tour = await Tour.create(payload)

    return tour
}
const getAllTour = async () => {
    const tours = await Tour.find()

    return tours

}
const updateTour = async (tourID: string, payload: Partial<ITour>, token: JwtPayload) => {
    const isTourExist = await Tour.findById(tourID)

    if (!isTourExist) {
        throw new AppError(httpCodes.FORBIDDEN, "tour doesn't exist")
    }

    if (payload.slug) {
        if (token.role === Role.USER || token.role === Role.GUIDE) {
            throw new AppError(httpCodes.FORBIDDEN, 'you do not have authorization')
        }
        if (token.role === Role.SUPER_ADMIN && token.role === Role.ADMIN) {
            throw new AppError(httpCodes.FORBIDDEN, 'you do not have authorization to make SUPER_ADMIN')
        }
    }
    if (token.isActive || token.isDeleted || token.isVerified) {
        if (token.role === Role.USER || token.role === Role.GUIDE) {
            throw new AppError(httpCodes.FORBIDDEN, 'you do not have authorization to change these things')
        }
    }


    const newUpdatedTour = await Tour.findByIdAndUpdate(tourID, payload, { new: true, runValidators: true })

    return newUpdatedTour
}
const deleteTour = async (userID: string) => {
    const tour = await Tour.deleteOne({ _id: userID })

    return tour
}


const createTourType = async (payload: ITourType) => {

    const tourType = await TourType.create(payload)

    return tourType
}
const getAllTourTypes = async () => {

    const tourTypes = await TourType.find()

    return tourTypes
}
const updateTourType = async (tourTypeID: string, payload: Partial<ITourType>, token: JwtPayload) => {
    const isTourTypeExist = await TourType.findById(tourTypeID)

    if (!isTourTypeExist) {
        throw new AppError(httpCodes.FORBIDDEN, "tour type doesn't exist")
    }

    if (payload.name) {
        if (token.role === Role.USER || token.role === Role.GUIDE) {
            throw new AppError(httpCodes.FORBIDDEN, 'you do not have authorization')
        }
        if (token.role === Role.SUPER_ADMIN && token.role === Role.ADMIN) {
            throw new AppError(httpCodes.FORBIDDEN, 'you do not have authorization to make SUPER_ADMIN')
        }
    }
    if (token.isActive || token.isDeleted || token.isVerified) {
        if (token.role === Role.USER || token.role === Role.GUIDE) {
            throw new AppError(httpCodes.FORBIDDEN, 'you do not have authorization to change these things')
        }
    }


    const newUpdatedTourType = await TourType.findByIdAndUpdate(tourTypeID, payload, { new: true, runValidators: true })



    return newUpdatedTourType
}
const deleteTourType = async (tourTypeId: string) => {

    const tourType = await TourType.deleteOne({ _id: tourTypeId })

    return tourType
}





export const tourServices = {
    createTour, getAllTour, updateTour, deleteTour
}
export const tourTypeServices = {
    createTourType, getAllTourTypes, updateTourType, deleteTourType
}