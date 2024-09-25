import { User } from "@prisma/client"
import { Request , Response , NextFunction } from "express"
import { Forbidden } from "../../exceptions/forbidden"
import { ErrorCode } from "../../exceptions/exception"
interface AuthRequest extends Request{
    user?: User
}


export const isPermission = async (req:AuthRequest, res:Response, next:NextFunction) => {
  try{
    const {user} = req
    if(user?.role != 'ADMIN'){
        console.log(req.user)
       throw new Forbidden("Forbidden" , ErrorCode.FORBIDDEN , 403 , null )
    }  
    return next()
}catch(error){
    return next(error)
}


}
