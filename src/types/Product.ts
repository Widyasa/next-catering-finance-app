import {ProductCategory} from "@/types/ProductCategory";

export type Product = {
    id?: string
    name?: string
    product_name?: string
    price: number
    category_id?: string
    description: string
    category_name?: string
    category?:ProductCategory
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