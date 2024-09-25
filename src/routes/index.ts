import { Router } from "express";
import { Request , Response } from "express";
import authRouter from "./auth";
import productRouter from "./product";
import cartRouter from "./cart";
import userRouter from "./user";
import workerRouter from "./worker";

const rootRouter:Router = Router()

// rootRouter.use("*", (req:Request, res:Response) => {
//     res.status(404).json({ message: "Route not found" });
// })


rootRouter.get("/",
    ( req:Request, res:Response) => {
   res.json({ message: "Hello World" });
 });
 
rootRouter.use("/auth", authRouter);
rootRouter.use("/product" , productRouter)
rootRouter.use('/cart' , cartRouter)
rootRouter.use('/user' , userRouter)
rootRouter.use('/worker' , workerRouter)


export default rootRouter