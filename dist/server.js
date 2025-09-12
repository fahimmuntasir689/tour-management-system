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
const mongoose_1 = __importDefault(require("mongoose"));
// import { Server } from "http";
const app_1 = require("./app");
const env_1 = require("../env");
const seedSuperAdmin_1 = require("./app/utilities/seedSuperAdmin");
// let appServer : Server;
// let something;
const initServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.envVars.DB_URL);
        console.log('connected to mongodb..');
        app_1.app.listen(5000, () => {
            console.log('connected to server');
        });
    }
    catch (error) {
        console.error(error);
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield initServer();
    yield (0, seedSuperAdmin_1.seedSuperAdmin)();
}))();
/*

// error handling
// unhandle error rejection

process.on('unhandledRejection', (error) => {
    console.log("unhandled Error Detected", error)
    if (appServer) {
        appServer.close(() => {
            process.exit(1)
        })

    }
    process.exit(1)
})

Promise.reject(new Error('I forgot to catch the error'))


// uncaught Exception
process.on('uncaughtException', (error) => {
    console.log("uncaught Error Detected", error)
    if (appServer) {
        appServer.close(() => {
            process.exit(1)
        })

    }
    process.exit(1)
})

throw new Error('Error which is uncaught')

*/ 
