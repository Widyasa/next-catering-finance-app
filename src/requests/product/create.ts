import {z} from "zod";
export const createProductSchema = z.object({
    name: z.string().min(3, {
        message: "product name must have at least 3 characters"
    }).nonempty({
        message: 'name is required'
    }),
    price: z.number().min(1, {
        message: "product price cannot be null"
    }),
    description: z.string().min(3, {
        message: "product description must have at least 3 characters"
    }).nonempty({
        message: 'description is required'
    }),
    category_id: z.string().nonempty({
        message: 'product category is required'
    }),
})