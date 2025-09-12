import Types from 'mongoose'

export enum Role {
    SUPER_ADMIN = "SUPER ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE"
}

export interface IAuthProvider {
    provider: 'google' | 'credentials', // google , email etc credentials 
    providerId: string
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}
export interface IUser {
    _id?: Types.ObjectId,
    name: string,
    email: string,
    password?: string,
    phone?: string,
    address?: string,
    picture?: string,
    isActive?: IsActive,
    isDeleted: boolean,
    isVerified?: boolean,
    role: Role,
    auths: IAuthProvider[],
    booking?: Types.ObjectId[],
    guides: Types.ObjectId[]
}