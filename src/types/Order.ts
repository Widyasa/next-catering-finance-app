
export type Order = {
    order_id: string
    date: string
    customer_name: string
    total_price: number
    total_outcome?: number
    total_income: number
    status: string
    code: string
    order_details : [
        {
            product_id: string
            product_name: string
            quantity: number
            price: number
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

export type OrderState = {
    orders: Order[]
    order: Order
    search: string
    page: number
    totalData: number
    loading: boolean
    loadingCrud: boolean
    loadingDetail: boolean
    error: string
    status: number
    id: string
    message:string
}
export type OrderAction = {
    changeStatus: (status: number) => void
    getOrder: (search?:string, page?:number) => void
    getOrderById: (id: string) => void
    createOrder: (data:Order) => void
    updateOrder: (id: string, data:Order) => void
    deleteOrder: (id: string) => void
}