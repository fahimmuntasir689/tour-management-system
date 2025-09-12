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
exports.producingNewAccessToken = exports.createTokens = void 0;
const env_1 = require("../../../env");
const user_interface_1 = require("../modules/user/user.interface");
const jwt_1 = require("./jwt");
const user_model_1 = require("../modules/user/user.model");
const AppError_1 = require("../ErrorHelper/AppError");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createTokens = (user) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    };
    const accessToken = (0, jwt_1.producingToken)(jwtPayload, env_1.envVars.JWT_ACCESS_SECRET, env_1.envVars.JWT_ACCESS_EXPIRES);
    const refreshToken = (0, jwt_1.producingToken)(jwtPayload, env_1.envVars.JWT_REFRESH_SECRET, env_1.envVars.JWT_REFRESH_EXPIRES);
    return {
        accessToken, refreshToken
    };
};
exports.createTokens = createTokens;
const producingNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedToken = (0, jwt_1.verifyToken)(refreshToken, env_1.envVars.JWT_REFRESH_SECRET);
    const isExist = yield user_model_1.User.findOne({ email: verifiedToken.email });
    if (!isExist) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "User Doesn't Exist");
    }
    if (isExist.isActive === user_interface_1.IsActive.BLOCKED || isExist.isActive === user_interface_1.IsActive.INACTIVE) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, `User is ${isExist.isActive}`);
    }
    if (isExist.isDeleted) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "User is Deleted");
    }
    const jwtPayload = {
        userId: isExist._id,
        email: isExist.email,
        role: isExist.role
    };
    const accessToken = (0, jwt_1.producingToken)(jwtPayload, env_1.envVars.JWT_ACCESS_SECRET, env_1.envVars.JWT_ACCESS_EXPIRES);
    return accessToken;
});
exports.producingNewAccessToken = producingNewAccessToken;
