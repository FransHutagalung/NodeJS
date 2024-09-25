import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../prismaRender";
import { uploadImage } from "./helper/CloudinaryUpload";

interface UploadImageResponse {
    secure_url: string;
}


const prisma = new PrismaClient();
export const saveProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if product with the same ID already exists
        const existingProduct = await prismaClient.product.findUnique({
            where: { kodeProduct: req.body.kodeProduct }
        });

        // If product with the same ID exists, return error response
        if (existingProduct) {
            return res.status(400).json({
                message: 'Product with this ID already exists'
            });
        }

        const tagsArray = Array.isArray(req.body.tag) ? req.body.tag : req.body.tag.split(',');

        const saveImage = await uploadImage(req.body.imageURL);

        const product = await prismaClient.product.create({
            data: {
                ...req.body,
                imageURL: saveImage,
                tag: tagsArray.join(",")
            }
        });

        res.status(200).json({
            data: product
        });
    } catch (error) {
        next(error);
    }
};


export const getProduct = async (req :Request , res : Response , next : NextFunction) => {

    const idProduct = parseInt(req.params.id);
    const product = await prismaClient.product.findFirst({
        where: {
            id: idProduct ? idProduct : 1
        }
    });

    if(!product) {
        return res.status(404).json({
            message : "Product not found"
        })
    }   
    res.status(200).json({
        data: product
    })
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        const product = await prismaClient.product.delete({
            where: {
                id: id,
            },
        });

        res.status(200).json({
            message: "Product deleted successfully",
            data: product,
        });
    } catch (error : any) {

        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        return next(error);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {

    const product = req.body
    const tag = product.tag ? Array.isArray(product.tag) ? product.tag : product.tag.split(',') : null

    try {

        const findTag = await prismaClient.product.findFirst({
            where: {
                id: +req.params.id
            }
        })

        let updatedTagsString : any ;
        if(tag){
            const existingTags = findTag?.tag ? findTag.tag.split(',') : [];
            const updatedTags = Array.from(new Set([...existingTags, ...tag]));
             updatedTagsString = tag ? updatedTags.join(',') : '';
        }

        let updatedProduct : any
        if(updatedTagsString){
             updatedProduct = await prismaClient.product.update({
                where: {
                    id: +req.params.id
                },
                data: {
                    ...product,
                    tag : updatedTagsString
                }
            });
        }else{
             updatedProduct = await prismaClient.product.update({
                where: {
                    id: +req.params.id
                },
                data: {
                    ...product,
                    // tag : updatedTagsString
                }
            });
        }
        res.status(200).json({
            data: updatedProduct
        });
    } catch (error :any) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        return   next(error);
    }
}


export const forcedUpdate = (req :Request , res : Response , next : NextFunction) => {

        try{
            const update = prismaClient.product.updateMany({
                data : {
                    // imageURL : 
                }
            })
            return res.status(200).json({message : "Product updated successfully"})
        }catch(error : any){
            return next(error)
        }
}



export const paginationProduct = async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.query)

    const userSkipped = req.query.userSkipped ? parseInt(req.query.userSkipped as string) : 0
    const page = req.query.pages ? parseInt(req.query.pages as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const count = await prismaClient.product.count()
    const totalPages = Math.ceil(count / limit)

    if (page > totalPages) {
        return res.status(404).json({
            message: "Page not found"
        })
    }


    const results = await prismaClient.product.findMany({
        skip: userSkipped > 0 ? userSkipped : (page - 1) * limit,
        take: limit,
        orderBy: {
            createdAt: 'desc'
        }
    })

    res.json({
        count : count,
        data: results
    })
}

export const countData = async (req: Request, res: Response, next: NextFunction) => {

    const count = await prismaClient.product.count()
    res
    .status(200)
    .json({
        count : count
    })
}


export const searchProduct = async (req : Request  , res : Response , next : NextFunction) => {

    const searchTerm = req.query.search;
    const products = await prisma.$queryRaw`
    SELECT * FROM "Products" 
    WHERE to_tsvector('english', tag || ' ' || type) @@ plainto_tsquery('english', ${searchTerm});
    `;
    

    res
    .status(200)
    .json(products);
}
