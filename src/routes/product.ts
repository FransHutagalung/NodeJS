import { Router } from "express";
import { countData, deleteProduct, getProduct, paginationProduct, saveProduct, searchProduct, updateProduct } from "../controllers/product";
import { authMiddlware } from "../middlewares/Auth/authMiddleware";
import { 
    checkSchema , 
    validationResult , 
    matchedData 
} from "express-validator";
import { isPermission } from "../middlewares/Auth/isPermission";
import { errorHandle } from "../error_handler";
import { ProductValidator } from "../middlewares/validator/ProductValidator";
import { addProductValidator } from "../validator/Product/addProduct_Validtor";

const productRouter:Router = Router()

productRouter.get('/listProduct' , 
    checkSchema(addProductValidator),
    // [ FinalAddProduct ],
    paginationProduct
)

productRouter.get('/search' ,
    searchProduct
 )

 productRouter.get('/countdata' , countData)
productRouter.delete(
    '/:id' , 
    [ 
        // authMiddlware ,
        // isPermission
   ] ,
     deleteProduct)
productRouter.get('/:id' , 
    getProduct
)
productRouter.put('/:id' ,
    updateProduct
)


productRouter.post(
    '/addProduct' ,
    [
        // authMiddlware,
        // isPermission,
        errorHandle(ProductValidator)
    ],
     saveProduct
    )

export default productRouter