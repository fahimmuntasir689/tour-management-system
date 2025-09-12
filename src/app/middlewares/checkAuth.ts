import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utilities/jwt";
import { envVars } from "../../../env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import httpcode from 'http-status-codes'
import { IsActive } from "../modules/user/user.interface";
import AppError from "../ErrorHelper/AppError";


export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, 'No Taken Has Been Given')
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload


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

        if (!verifiedToken) {

            throw new AppError(403, 'Token could be wrong')
        }

        if (!authRoles.includes(verifiedToken.role)) {

            throw new AppError(403, 'You are not eligible for access as not being Admin or Super Admin')

        }

        req.user = verifiedToken

        next()

    } catch (error) {

        next(error)

    }


}