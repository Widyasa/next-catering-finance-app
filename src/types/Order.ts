export type Order = {
    order_id: string
    date: string
    customer_name: string
    total_price: number
    total_outcome: number
    total_income: number
    status: string
    code: string
    order_details : [
        {
            product_id: string
            product_name: string
            quantity: number
            price: string
        }
    ]
    order_outcomes: [
        {
            id:string
            name:string
            description:string
            price:number
        }
    ]
}