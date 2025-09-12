
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpCodes from 'http-status-codes'
import bcrypt from 'bcryptjs'
import { envVars } from "../../../../env";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../ErrorHelper/AppError";

const code = httpCodes.BAD_REQUEST

const createUser = async (payload: Partial<IUser>) => { // service layer
    const { email, password, ...rest } = payload
    const isExist = await User.findOne({ email })
    // if (isExist) {

    //     throw new AppError(code, "User Already Exist");

    // }
    const hashedPass = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALTING))

    const authProvider: IAuthProvider = {
        provider: 'credentials',
        providerId: email as string
    }

    const user = await User.create({
        email,
        password: hashedPass,

        auths: [authProvider],

        ...rest
    })
    return user;

}

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    const isUserExist = await User.findById(userId)

    if (!isUserExist) {
        throw new AppError(httpCodes.FORBIDDEN, "user doesn't exist")
    }

    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpCodes.FORBIDDEN, 'you do not have authorization')
        }
        if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
            throw new AppError(httpCodes.FORBIDDEN, 'you do not have authorization to make SUPER_ADMIN')
        }
    }
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpCodes.FORBIDDEN, 'you do not have authorization to change these things')
        }
    }
    if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, Number(envVars.BCRYPT_SALTING))
    }

    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

    return newUpdatedUser

}
const getAllUser = async () => {    // service layer
    const users = await User.find()
    return users

}

export const userServices = {

    createUser, getAllUser , updateUser

}