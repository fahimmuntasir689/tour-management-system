"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default.string({ error: 'name must be a string' }).min(2).max(30),
    email: zod_1.default.string({ error: 'it should be string' }).email({ message: 'invalid email' }),
    password: zod_1.default.string({ error: 'password lagbei' }).regex(/[A-Z]/, { message: "Password must contain at least 1 uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least 1 digit" })
        .regex(/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;'/]/, {
        message: "Password must contain at least 1 special character",
    }),
    phone: zod_1.default.string().regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/, {
        message: "Invalid Bangladesh phone number",
    }).optional(),
});
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default.string({ error: 'name must be a string' }).min(2).max(30).optional(),
    password: zod_1.default.string({ error: 'password lagbei' }).regex(/[A-Z]/, { message: "Password must contain at least 1 uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least 1 digit" })
        .regex(/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;'/]/, {
        message: "Password must contain at least 1 special character",
    }).optional(),
    phone: zod_1.default.string().regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/, {
        message: "Invalid Bangladeshi phone number",
    }).optional(),
});
