import { User } from "@prisma/client"
import express from 'express'

declare module 'express-serve-static-core'{
    export interface Request {
        user? : User
    }
}