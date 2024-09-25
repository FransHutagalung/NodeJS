import { Request, Response , NextFunction } from "express";
import { PrismaClient, User } from "@prisma/client";
import { hashSync , compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { badRequest } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/exception";
import { unProcessable } from "../exceptions/unprocessable";
import { signUpSchema } from "../models/usersModel";
import { generateAccessToken, generateRefreshToken } from "./utils/jwt.utils";
import { prismaClient } from "../prismaRender";


const prisma = new PrismaClient();

interface AuthRequest extends Request {
    user?: User; // Gunakan tipe yang diperluas secara eksplisit
  }

export const auth = (req:AuthRequest, res:Response) => {
    res.json({
        user : req.user
    })
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        
        let findUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (!findUser) {
            throw new badRequest('No user found', ErrorCode.USER_NOT_EXIST, 404, null);
        }

        if (!compareSync(password, findUser.password)) {
            throw new badRequest('Wrong password', ErrorCode.INCORRECT_PASSWORD, 401, null);
        }

        const token = generateAccessToken(findUser)
        const refreshToken = generateRefreshToken(findUser)! as string


        const isStoredRefreshToken = await prismaClient.refrehToken.findFirst({
            where : {
                userId : findUser.id
            }
        })

        if(isStoredRefreshToken) {
            await prismaClient.refrehToken.update({
                where : {
                    id : isStoredRefreshToken.id
                },
                data : {
                    token : refreshToken
                }
            })
        }else{
            const insertRefreshToken = await prismaClient.
            refrehToken.create({
                data : {
                    userId : findUser.id,
                    token : refreshToken
                }
            })
        }


        // Mengirimkan respons yang berisi user dan token
        return res.json({
            user: findUser,
            accessToken : token,
            refreshToken : refreshToken
        });

    } catch (error : any) {
        return next(error);
    }
};


export const Token = async (req : Request , res : Response , next : NextFunction) => {

    const { token } = req.body;

    console.log(token)
    if (!token) return res.sendStatus(401);

    try {
        const result = await prismaClient.refrehToken.findFirst({
            where : {
                token : token
            }
        })

        console.log(result)

        if (!result) return res
        .status(403)
        .json({
            "message" : "Invalid token"
        });

        jwt.verify(token, process.env.JWT_REFRESH as string , (err : any, user : any) => {
            if (err) return res.sendStatus(403);  

            const newAccessToken = generateAccessToken(user);
            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error refreshing token' });
    }
}

export const signUp =  async (
    req:Request, 
    res:Response,
    next:NextFunction
) => {
    const { body  : { email, password ,name} } = req;
    try {
        // signUpSchema.parse(req.body)
        const userisAlready = await prisma.user.findUnique({
            where: {
                email : email
            }
        })

        if (userisAlready) {
            return res
            .status(400)
            .json({message: "email already exists"})
        }

        const user = await prisma.user.create({
            data: {
                email : email,
                password : hashSync(password, 10),
                name : name
            }
        })
        res
        .status(200)
        .json({user})

    } catch(error:any){
        console.log(error)
        // return next(new unProcessable(
        //     error?.issues,
        //     'Error processing request',
        //     ErrorCode.INCPLICIT_VALIDATION,
        // ));

    } finally { 


    }
}

export const FirebaseAuth = async (req : Request , res : Response , next : NextFunction) => {
    const { email , password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where : {   
                email : email
            }
        })

        if(!user) {
            return res 
            .status(404)    
            .json({
                message : "User not found"
            })
        }

        if(!compareSync(password , user.password)) {
            return res
            .status(401)
            .json({
                message : "Wrong password"  
            })  
        }

        const token = generateAccessToken(user)
        res
        .status(200)
        .json({
            user : user,
            accessToken : token
        })
    } catch (error) {
        console.log(error)  
    }
}