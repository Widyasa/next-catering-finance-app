
export type ProductCategory = {
    id?: string
    name: string
}
export type ProductCategoryState = {
    categories: ProductCategory[]
    category: ProductCategory
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
export type ProductCategoryAction = {
    changeStatus: (status: number) => void
    getProductCategory: (search?:string, page?:number) => void
    getProductCategoryById: (id: string) => void
    createProductCategory: (data:ProductCategory) => void
    updateProductCategory: (id: string, data:ProductCategory) => void
    deleteProductCategory: (id: string) => void
}