import {z} from 'zod'

export const updateUserAdressSchema = z.object({
    id : z.number(),
    shippingAddress : z.number(),
    billingAddres : z.number()
})