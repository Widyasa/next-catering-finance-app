export type Product = {
    id?: string
    name: string
    price: number
    category_id: string
    description: string
}
export type ProductState = {
    products: Product[]
    product: Product
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
export type ProductAction = {
    changeStatus: (status: number) => void
    getProduct: (search?:string, page?:number) => void
    getProductById: (id: string) => void
    createProduct: (data:Product) => void
    updateProduct: (id: string, data:Product) => void
    deleteProduct: (id: string) => void
}