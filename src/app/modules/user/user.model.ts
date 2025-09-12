import mongoose from "mongoose";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";
const { Schema } = mongoose

const authProviderSchema = new Schema<IAuthProvider>(  // embedded schema
    {
        provider: {
            type: String, required: true
        },
        providerId: {
            type: String,
            required: true
        }

    },
    {
        versionKey: false,
        _id: false
    }
)

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        // min: 10
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    picture: {
        type: String
    },
    isActive: {
        type: String,
        enum: Object.values(IsActive),
        default: IsActive.ACTIVE
    },
    isDeleted: {
        type: Boolean, default: false
    },
    isVerified: {
        type: Boolean,
        default: false

    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER
    },
    auths: {
        type: [authProviderSchema]
    },



}, {
    versionKey: false,
    timestamps: true
})

export const User = mongoose.model<IUser>('User', userSchema);