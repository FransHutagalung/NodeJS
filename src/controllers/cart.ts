import { Product, User } from "@prisma/client";
import { Request , Response , NextFunction, RequestHandler } from "express";
import { notFound } from "../exceptions/notFound";
import { ErrorCode } from "../exceptions/exception";
import { prismaClient } from "../prismaRender";

interface CartRequest extends Request {
    user? : User
}
export class Cart {


    addCart : RequestHandler = async (req:any , res:Response  ) => {

        let user    :User
        let product :Product
        
        try{
            user = await prismaClient.user.findFirstOrThrow({
                where : {
                    id : req.body.userId
                }
            })
        }catch(err){
            throw new notFound("No user found" , ErrorCode.USER_NOT_EXIST , 404 , null)
        }

        try{
            product = await prismaClient.product.findFirstOrThrow({
                where : {
                    id : req.body.productId
                }
            })
        }catch(err){
            throw new notFound("No product found" , ErrorCode.USER_NOT_EXIST , 404 , null)
        }


        const cart = await prismaClient.cart.create({
            data : {
                user : {
                    connect : {
                        id : user.id
                    }
                },
                product : {
                    connect : {
                        id : product.id
                    }
                }
            }
        })

        res.json({
            message : "Cart added successfully",
            data : cart
        })
    }

    
    removeCart :RequestHandler = async (req:Request , res:Response , next : NextFunction) => {
        try{
            await prismaClient.product.delete({
                where : {
                    id : +req.params.id
                }
            })
        res.status(200).json({
            message : "succes Delete"
        })
        
        }catch(err : any){
            if(err.code === "P2025"){
                throw new notFound("No Cart found" , ErrorCode.USER_NOT_EXIST , 404 , null)
            }
        }
    }

    listCart : RequestHandler = async (req:any , res:Response  ) => {

        const cart = await prismaClient.cart.findMany({
            where : {
                userId : req.body.id
            },
            orderBy : {
                createdAt : 'desc'
            },
            // select : {
            //     id : true ,
            //     userId : true ,
            //     createdAt : true ,
            //     product : true
            // },
            include : {
                product : {
                    select : {
                        kodeProduct : true,
                        brand : true,
                        tag : true,
                        imageURL : true,
                        stock : true,
                        status : true,
                        type : true
                    }
                }
            }
        })

        res
        .status(200)
        .json({
            message : "Cart list successfully",
            data : cart
        })
    }
}