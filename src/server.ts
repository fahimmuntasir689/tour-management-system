import mongoose from "mongoose"
import { Server } from "http";
import { app } from "./app"
import { error } from "console"
import { promise } from "zod";

let appServer : Server;

let something;

const initServer = async () => {
    try {
        await mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.qxnsr.mongodb.net/tour-management-system?retryWrites=true&w=majority&appName=Cluster0')

        console.log('connected to mongodb..');
        app.listen(5000, () => {
            console.log('connected to server')

        })

    } catch (error) {
        console.error(error)

    }


}

initServer()

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