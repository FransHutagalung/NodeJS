import {z} from 'zod'

export const productSchema = z.object({
        
    kodeProduct    : z.string(),
    type    : z.string(),
    stock   : z.number().min(2),
    status  : z.string(),
    imageURL: z.string(),
    tag     : z.string(),
    brand   : z.string(),
    title : z.string(),
    price : z.number()
})