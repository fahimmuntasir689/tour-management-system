"use strict";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const AppError_1 = require("../../ErrorHelper/AppError");
const user_Tokens_1 = require("../../utilities/user.Tokens");
const user_model_1 = require("../user/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../../../../env");
const credentialsLogIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isExist = yield user_model_1.User.findOne({ email });
    if (!isExist) {
        console.log('nai');
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Email Doesn't Exist");
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, isExist.password);
    if (!isPasswordMatch) {
        console.log('mile nai');
        throw new AppError_1.AppError(400, "password is not matched");
    }
    /* const jwtPayload = {
        userId: isExist._id,
        email: isExist.email,
        role: isExist.role
    }*/
    const userToken = (0, user_Tokens_1.createTokens)(isExist);
    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: isExist
    };
});
const getNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const newAccessToken = yield (0, user_Tokens_1.producingNewAccessToken)(refreshToken);
    // const userToken = createTokens(isExist)
    return {
        accessToken: newAccessToken
    };
});
const updatePassword = (oldPassword, newPassword, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(decodedToken.userId);
    const isOldPasswordMatch = yield bcryptjs_1.default.compare(oldPassword, user === null || user === void 0 ? void 0 : user.password);
    if (!isOldPasswordMatch) {
        throw new AppError_1.AppError(http_status_codes_1.default.UNAUTHORIZED, "password doesn't match");
    }
    user.password = yield bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.BCRYPT_SALTING));
    user === null || user === void 0 ? void 0 : user.save();
});
exports.authServices = {
    credentialsLogIn, getNewAccessToken, updatePassword
};
