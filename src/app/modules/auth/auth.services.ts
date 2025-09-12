/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { JwtPayload } from "jsonwebtoken"

import { createTokens, producingNewAccessToken } from "../../utilities/user.Tokens"
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import bcrypt from 'bcryptjs'
import httpcode from 'http-status-codes'
import { envVars } from "../../../../env"
import AppError from "../../ErrorHelper/AppError"

const credentialsLogIn = async (payload: Partial<IUser>) => {

    const { email, password } = payload
    const isExist = await User.findOne({ email })
    if (!isExist) {
        console.log('nai')
        throw new AppError(httpcode.BAD_REQUEST, "Email Doesn't Exist");

    }
    const isPasswordMatch = await bcrypt.compare(password as string, isExist.password as string)

    if (!isPasswordMatch) {
        console.log('mile nai')
        throw new AppError(400, "password is not matched");

    }

    /* const jwtPayload = {
        userId: isExist._id,
        email: isExist.email,
        role: isExist.role
    }*/

    const userToken = createTokens(isExist)

    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: isExist
    }


}
const getNewAccessToken = async (refreshToken: string) => {


    const newAccessToken = await producingNewAccessToken(refreshToken)

    return {
        accessToken: newAccessToken
    }


}
const updatePassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

   

    const user = await User.findById(decodedToken.userId)
    
    

    const isOldPasswordMatch = await bcrypt.compare(oldPassword , user?.password as string)
    

    if(!isOldPasswordMatch){
        throw new AppError(httpcode.UNAUTHORIZED , "password doesn't match")
    } 

   try {
     user!.password = await bcrypt.hash(newPassword, Number(envVars.BCRYPT_SALTING))
    
   } catch (error) {
    console.log(error)
    
   }

   await user!.save()

    

}

export const authServices = {
    credentialsLogIn, getNewAccessToken, updatePassword
}