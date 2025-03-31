
export type Order = {
    order_id: string
    date: string
    customer_name: string
    customer_phone: string
    customer_address: string
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
    createOrder: (data:CrudOrder) => void
    updateOrder: (id: string, data:CrudOrder) => void
    deleteOrder: (id: string) => void
}
export type CrudOrder = {
    p_date: string,
    p_customer_name: string,
    p_customer_phone: string,
    p_customer_address: string,
    p_status: string,
    p_code: string,
    p_order_details: {
        product_id: string
        quantity: number
        price: number
    }[],
    p_order_outcomes:{
        name:string
        description:string
        price:number
    }[]
}