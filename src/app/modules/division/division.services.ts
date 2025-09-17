/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from "jsonwebtoken"
import AppError from "../../ErrorHelper/AppError"
import { IDivision } from "./division.interface"
import { Division } from "./division.model"
import httpCodes from "http-status-codes"
import { Role } from "../user/user.interface"

const createDivison = async (payload: Partial<IDivision>) => {



    const { name, ...rest } = payload
    const isDivisionExist = await Division.findOne({ name: payload.name })

    if (isDivisionExist) {
        throw new AppError(400, "division already exist")
    }

    const baseSlug = payload.name?.toLowerCase().split(" ").join("-")

    let slug = `${baseSlug}-division`

    console.log(slug)

    let count = 0;
    while (await Division.exists({ slug })) {
        slug = `${slug}-${count++}`

    }

    payload.slug = slug



    const division = await Division.create(payload)
    return division;



}

const getAllDivision = async () => {

    const divisions = await Division.find()

    return divisions

}

const updateDivision = async (userID: string, payload: Partial<IDivision>, token: JwtPayload) => {

    const isDivisionExist = await Division.findById(userID)

    if (!isDivisionExist) {
        throw new AppError(httpCodes.FORBIDDEN, "division doesn't exist")
    }

    if (payload.slug) {
        if (token.role === Role.USER || token.role === Role.GUIDE) {
            console.log(token.role)
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


    const newUpdatedDivision = await Division.findByIdAndUpdate(userID, payload, { new: true, runValidators: true })

    return newUpdatedDivision
}

const deleteDivision = async (userID: string) => {

    const division = await Division.deleteOne({ _id: userID })

    return division



}

export const divisionServices = {
    createDivison, getAllDivision, updateDivision, deleteDivision
}