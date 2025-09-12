import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../../env";
import { IsActive, IUser } from "../modules/user/user.interface";
import { producingToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";
import httpcode from 'http-status-codes'
import AppError from "../ErrorHelper/AppError";

export const createTokens = (user: Partial<IUser>) => {

    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }

    const accessToken = producingToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    const refreshToken = producingToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

    return {
        accessToken, refreshToken
    }

}

export const producingNewAccessToken = async (refreshToken: string) => {


    const verifiedToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload

    const isExist = await User.findOne({ email: verifiedToken.email })
    if (!isExist) {

        throw new AppError(httpcode.BAD_REQUEST, "User Doesn't Exist");

    }
    if (isExist.isActive === IsActive.BLOCKED || isExist.isActive === IsActive.INACTIVE) {


        throw new AppError(httpcode.BAD_REQUEST, `User is ${isExist.isActive}`);

    }
    if (isExist.isDeleted) {

        throw new AppError(httpcode.BAD_REQUEST, "User is Deleted");

    }

    const jwtPayload = {
        userId: isExist._id,
        email: isExist.email,
        role: isExist.role
    }

    const accessToken = producingToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)


    return accessToken


}