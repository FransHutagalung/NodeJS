import { Request, Response , NextFunction} from "express";
import { httpException } from "../exceptions/exception";

export const errorMiddleware = (error:httpException, req:Request, res:Response, next:NextFunction) => {
        res
        .status(error.statusCode || 500)
        .json({
            message: error.message || "Internal Server Error",
            errorCode : error.errorCode,
            error : error.error
        })
}