"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.producingToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const producingToken = (payload, secret, expiresIn) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn
    });
    return accessToken;
};
exports.producingToken = producingToken;
const verifyToken = (token, secret) => {
    try {
        console.log('jwt verify er age');
        const verifiedToken = jsonwebtoken_1.default.verify(token, secret);
        console.log("verifyToken result type:", verifiedToken);
        return verifiedToken;
    }
    catch (error) {
        console.log(error);
    }
};
exports.verifyToken = verifyToken;
