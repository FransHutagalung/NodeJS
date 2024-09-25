import { PrismaClient } from "@prisma/client"
import { signUpSchema } from "./models/usersModel"
import { productSchema } from "./models/productModel"

export const prismaClient = new PrismaClient({
    log : ["query"]
}).$extends({
    query : {
      user : {
        create : ({args , query}) => {
           args.data = signUpSchema.parse(args.data)
           return query(args)
        }
      },
      product  : {
        create : ({args , query}) => {
          args.data = productSchema.parse(args.data)
          return query(args)
        }
      }

    }
})