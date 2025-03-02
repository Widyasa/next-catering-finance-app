import {create} from "zustand/react";
import {BookCategory, BookCategoryState} from "@/interface/BookCategory";
import {AxiosInstance} from "@/utils/axios";
type SetState = (state: Partial<BookCategoryState>) => void;

const handleError = (set: SetState, error: unknown) => {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    set({ error: message });
};

export const bookCategoryStore = create<BookCategoryState>((set, get) => ({
    categories: [],
    category: {id: "", name: ""},
    search: "",
    page: 1,
    totalData: 0,
    loading: false,
    loadingCrud: false,
    loadingDetail: false,
    error: "",
    status: 0,
    id: "",
    message: '',
    changeStatus: (status) => set(() => ({status : status})),
    getBookCategory: async (searchData?:string, pageSelected?:number) => {
        try {
            set ({
                loading:true,
                search: searchData || '',
                page: pageSelected || 1
            })
            const {search, page} = get()
            const params = { page, ...(search && { search }) };
            const res = await AxiosInstance.get(`/api/book-category`, { params });
            set({
                categories: res.data.data,
                totalData: res.data.meta.total
            })
        } catch (e) {
            handleError(set, e)
        }
        finally {
            set({
                search: '',
                page: 1,
                loading: false
            })
        }
    },
    getBookCategoryById: async (id:string) => {
        try {
            set({loadingDetail:true})
            const res = await AxiosInstance.get(`/api/book-category/${id}`)
            set({category: res.data})
        } catch (e) {
            handleError(set, e)
        } finally {
            set({loadingDetail:false})
        }
    },
    createBookCategory: async (data:BookCategory) => {
        try {
            set({loadingCrud:true})
            const res = await AxiosInstance.post(`/api/book-category`, {
                data : {
                    ...data
                }
            })
            await get().getBookCategory()
            set({status: res.status})
            if (res.status == 200) {
                set({message: 'Create Book Category Success'})
            }
        } catch (e) {
            handleError(set, e)
        } finally {
            set({loadingCrud:false})
        }
    },
    updateBookCategory: async (id:string, data:BookCategory) => {
        try {
            set({loadingCrud:true})
            const res = await AxiosInstance.patch(`/api/book-category/${id}`, {
                data: {
                    ...data
                },
            })
            await get().getBookCategory()
            set({status: res.status})
            if (res.status == 200) {
                set({message: 'Update Book Category Success'})
            }
        } catch (e) {
            handleError(set, e)
        } finally {
            set({loadingCrud:false})
        }
    },
    deleteBookCategory: async (id:string) => {
        try {
            set({loadingCrud:true})
            const res = await AxiosInstance.delete(`/api/book-category/${id}`)
            await get().getBookCategory()
            set({status: res.status})
            if (res.status == 200) {
                set({message: 'Delete Book Category Success'})
            }
        } catch (e) {
            handleError(set, e)
        } finally {
            set({loadingCrud:false})
        }
    }
}))