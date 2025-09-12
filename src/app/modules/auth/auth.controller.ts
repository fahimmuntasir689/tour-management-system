/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilities/catchAsync";
import { sendResponse } from "../../utilities/sendResponse";
import httpstatus from 'http-status-codes';
import { authServices } from "./auth.services";
import { createCookie } from "../../utilities/setCookie";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../ErrorHelper/AppError";
import { createTokens } from "../../utilities/user.Tokens";
import { envVars } from "../../../../env";
import passport from "passport";


const credentialsLogIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // const logInfo = await authServices.credentialsLogIn(req.body)

    passport.authenticate("local", async (err: any, user: any, info: any) => {

        if (err) {
            console.log("err" , err)
            return next(new AppError(300 , err))
        }

        if (!user) {
            console.log("user e nai")
            return next(new AppError(400 , err))
        }

        const userTokens = await createTokens(user)

        const { password: pass, ...rest } = user.toObject()

        createCookie(res, userTokens)

        sendResponse(res, {
            statusCode: httpstatus.OK,
            message: "Logged In successfully by credentials",
            success: true,
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest

            }

        })

    })(req, res, next)




})
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {


        throw new Error('refresh token nai')

    }


    const tokenInfo = await authServices.getNewAccessToken(refreshToken as string)

    createCookie(res, tokenInfo)

    sendResponse(res, {
        statusCode: httpstatus.OK,
        message: "Token got successfully",
        success: true,
        data: tokenInfo

    })

})
const logOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {



    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })




    sendResponse(res, {
        statusCode: httpstatus.OK,
        message: "Logged out successfully",
        success: true,
        data: null

    })

})
const updatePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const oldPassword = req.body.oldPassword;

    const newPassword = req.body.newPassword;
    const decodedToken = req.user

    const updatedPassword = await authServices.updatePassword(oldPassword, newPassword, decodedToken as JwtPayload)



    sendResponse(res, {
        statusCode: httpstatus.OK,
        message: "Password has been updated successfully",
        success: true,
        data: null

    })

})
const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    let state = req.query.state ? req.query.state as string : ""

    if (state.startsWith('/')) {
        state = state.slice(1)

    }

    const user = req.user
    console.log("google", user)

    if (!user) {
        throw new AppError(httpstatus.BAD_REQUEST, 'did not get the user')
    }

    const tokenInfo = createTokens(user)

    createCookie(res, tokenInfo)

    res.redirect(`${envVars.FRONTEND_URL}/${state}`)



})

export const authControllers = {
    credentialsLogIn,
    getNewAccessToken,
    logOut,
    updatePassword,
    googleCallbackController
}