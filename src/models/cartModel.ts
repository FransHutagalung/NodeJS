import {number, z} from "zod"

export const cartSchema = z.object({
    userId      : z.number(),
    productId   : z.number()
})