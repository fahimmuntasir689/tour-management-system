"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (fnctn) => (req, res, next) => {
    Promise.resolve(fnctn(req, res, next)).catch((err) => {
        next(err);
    });
};
exports.catchAsync = catchAsync;
