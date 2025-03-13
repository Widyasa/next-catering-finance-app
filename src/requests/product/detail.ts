import {z} from "zod";
export const detailProductSchema = z.object({
    name: z.string(),
    price: z.coerce.number(),
    description: z.string(),
    category_name: z.string()
})