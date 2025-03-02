export interface PostCategory {
    body : {
        id: string
        name: string
    }
}

export interface BookCategory {
    id?: string
    name: string
}

export interface BookCategoryState {
    categories: BookCategory[]
    category: BookCategory
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
    changeStatus: (status: number) => void
    getBookCategory: (search?:string, page?:number) => void
    getBookCategoryById: (id: string) => void
    createBookCategory: (data:BookCategory) => void
    updateBookCategory: (id: string, data:BookCategory) => void
    deleteBookCategory: (id: string) => void
}