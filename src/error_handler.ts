import { NextFunction, Request, Response } from "express"
import { ErrorCode, httpException } from "./exceptions/exception"
import { ZodError } from "zod"
import { unProcessable } from "./exceptions/unprocessable"

export const errorHandle = (method: Function) =>{
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log('error handler')
        try {
            // console.log(req.body)
            await method(req, res, next)
        } catch (error:any) {
            console.log(error)
            let exception: httpException
            if(error instanceof httpException){
                exception = error
            }
            else{
                if(error instanceof ZodError){
                    exception =new unProcessable(
                        error?.issues,
                        'Error processing request',
                        ErrorCode.INCPLICIT_VALIDATION,
                    )
                }
                exception = new httpException(error.message, ErrorCode.INTERNAL_SERVER_ERROR, 500, null)
            }
            next(exception)
        }
    }
}