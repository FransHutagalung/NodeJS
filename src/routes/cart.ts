import { RequestHandler, Router } from "express";
import { Cart } from "../controllers/cart";
import { authMiddlware } from "../middlewares/Auth/authMiddleware";
import { errorHandle } from "../error_handler";
import { CartValidator } from "../middlewares/validator/CartValidator";

const cartRouter = Router()
const cart = new Cart()

cartRouter.post(
    '/',
    [
        // authMiddlware,
        errorHandle(CartValidator)
    ] ,
    cart.addCart as RequestHandler
)

cartRouter.get('/' ,
    cart.listCart as RequestHandler
)

export default cartRouter