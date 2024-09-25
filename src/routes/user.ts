import { Router } from "express";
import { User } from "../controllers/user";
import { errorHandle } from "../error_handler";
import { addresValidator } from "../middlewares/validator/updateAdressValidator";

const userRouter = Router();
const user = new User()


userRouter.post(
    '/updateUserRouter' ,
    [
        errorHandle(addresValidator)
    ], 
    user.updateUserAddres )

export default userRouter