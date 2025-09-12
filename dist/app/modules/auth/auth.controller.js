"use strict";
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
exports.authControllers = void 0;
const catchAsync_1 = require("../../utilities/catchAsync");
const sendResponse_1 = require("../../utilities/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth_services_1 = require("./auth.services");
const setCookie_1 = require("../../utilities/setCookie");
const credentialsLogIn = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const logInfo = yield auth_services_1.authServices.credentialsLogIn(req.body);
    (0, setCookie_1.createCookie)(res, logInfo);
    console.log('login kore cookies paisi');
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        message: "Logged In successfully",
        success: true,
        data: logInfo
    });
}));
const getNewAccessToken = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new Error('refresh token nai');
    }
    const tokenInfo = yield auth_services_1.authServices.getNewAccessToken(refreshToken);
    (0, setCookie_1.createCookie)(res, tokenInfo);
    console.log('login kore refresh cookies paisi');
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        message: "Token got successfully",
        success: true,
        data: tokenInfo
    });
}));
const logOut = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        message: "Logged out successfully",
        success: true,
        data: null
    });
}));
const updatePassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newpassword;
    const decodedToken = req.user;
    const updatedPassword = yield auth_services_1.authServices.updatePassword(oldPassword, newPassword, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        message: "Password Changed successfully",
        success: true,
        data: null
    });
}));
exports.authControllers = {
    credentialsLogIn,
    getNewAccessToken,
    logOut,
    updatePassword
};
