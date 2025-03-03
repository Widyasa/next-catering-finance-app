import {z} from "zod";
export const createProductCategorySchema = z.object({
    name: z.string().min(3, {
        message: "name must have at least 3 characters"
    }).nonempty({
        message: 'name is required'
    })
})