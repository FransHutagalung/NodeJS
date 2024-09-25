import {Router} from "express";
import { auth, login, signUp, Token } from "../controllers/auth";
import { AuthValidator } from "../middlewares/validator/AuthValidator";
import { errorHandle } from "../error_handler";
import { authMiddlware } from "../middlewares/Auth/authMiddleware";
import passport from "passport";
import { asyncMiddleware } from "../controllers/helper/asyncMiddleware";

const authRouter:Router = Router();

authRouter.post("/login", login);
authRouter.post('/signup', errorHandle(AuthValidator) , signUp);
// authRouter.get('/me', [asyncMiddleware(authMiddlware)] , auth)
authRouter.post('/getRefreshToken' , Token )

authRouter.get(
    '/google' , 
    passport.authenticate('google') ,
)

authRouter.get('/google/callback' , 
        passport.authenticate('google') , 
        (req , res) => {
            res
            .status(200)
            .json({
                message : "success"
            })
        }
)

export default authRouter