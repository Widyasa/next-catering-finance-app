import {z} from "zod";
export const updateOrderSchema = z.object({
    p_date: z.string().date(),
    p_order_id: z.string(),
    p_customer_name: z.string().min(3, {
        message: "customer name must have at least 3 characters"
    }).nonempty({
        message: 'customer name is required'
    }),
    p_customer_phone: z.string().min(10, {
        message: "customer phone must have at least 10 characters"
    }).nonempty({
        message: 'customer phone is required'
    }),
    p_customer_address: z.string().min(3, {
        message: "customer address must have at least 3 characters"
    }).nonempty({
        message: 'customer address is required'
    }),
    p_status: z.string().nonempty({
        message: 'order status is required'
    }),
    p_code: z.string().nonempty({
        message: 'order code is required'
    }),
    p_order_details: z.array(
        z.object({
            product_id: z.string().nonempty({
                message: 'product is required'
            }),
            quantity: z.coerce.number().min(1, {
                message: "product quantity is cannot be 0"
            }),
            price: z.coerce.number().min(1, {
                message: "product price is cannot be 0"
            }),
        })
    ),
    p_order_outcomes: z.array(
        z.object({
            name: z.string().nonempty({
                message: 'name is required'
            }),
            description: z.string().nonempty({
                message: 'description is required'
            }),
            price: z.coerce.number().min(1, {
                message: "product price is cannot be 0"
            }),
        })
    ),
})