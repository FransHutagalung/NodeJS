import { error } from "console";
import { ErrorCode } from "../../exceptions/exception";
import { unProcessable } from "../../exceptions/unprocessable";
import { Request , Response , NextFunction } from "express";
import { ZodError } from "zod"
import { cartSchema } from "../../models/cartModel";

export const CartValidator = (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        cartSchema.parse(req.body)
        return next()
    }catch(error : any){
        if(error instanceof ZodError){
            const err:Array <any>  = error?.issues
            return next(new unProcessable(
                error = err.map((e) => {
                    return {
                        message : e.message,
                        path : e.path[0]
                    }
                }) ,
                'Error processing request',
                ErrorCode.INCPLICIT_VALIDATION,
            ))
        }
        return next(new unProcessable(
             null,
            'Error processing request',
            ErrorCode.INTERNAL_SERVER_ERROR,
        ));

    }
}