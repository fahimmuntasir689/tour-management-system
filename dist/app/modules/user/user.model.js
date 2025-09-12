"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_interface_1 = require("./user.interface");
const { Schema } = mongoose_1.default;
const authProviderSchema = new Schema(// embedded schema
{
    provider: {
        type: String, required: true
    },
    providerId: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    _id: false
});
const userSchema = new Schema({
    name: {
        type: String,
        required: true
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
        enum: Object.values(user_interface_1.IsActive),
        default: user_interface_1.IsActive.ACTIVE
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
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.USER
    },
    auths: {
        type: [authProviderSchema]
    },
}, {
    versionKey: false,
    timestamps: true
});
exports.User = mongoose_1.default.model('User', userSchema);
