import dotenv from 'dotenv'

dotenv.config()

interface EnvVar {
    PORT: string,
    DB_URL: string,
    NODE_DEV: 'development'| 'universe'
}

export const envVars : EnvVar= {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_DEV: 'development',
}