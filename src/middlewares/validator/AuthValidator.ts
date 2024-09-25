import { ErrorCode } from "../../exceptions/exception";
import { unProcessable } from "../../exceptions/unprocessable";
import { signUpSchema } from "../../models/usersModel";
import { Request , Response , NextFunction } from "express";

export const AuthValidator = (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const { body  : { email, password , name} }  = req;
    try {
        signUpSchema.parse(req.body)
        return next()
    }catch(error:any){
        return next(new unProcessable(
            error?.issues,
            'Error processing request',
            ErrorCode.INCPLICIT_VALIDATION,
        ));
    }
}