"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    res.status(500).json({
        sucess: false,
        message: 'something went wrong',
        err
    });
};
exports.globalErrorHandler = globalErrorHandler;
