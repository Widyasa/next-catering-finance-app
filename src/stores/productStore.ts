import {create} from "zustand/react";
import {Product, ProductAction, ProductState} from "@/types/Product";
import {AxiosInstance} from "@/utils/axios";
import {ClientError} from "@/types/global";
import {toast} from "sonner";
type SetState = (state: Partial<ProductState>) => void;

const handleError = (set: SetState, error:unknown) => {
    const message = error as ClientError
    toast(message.response.data)
};

export const productStore = create<ProductState & ProductAction>((set, get) => ({
    products: [],
    product: {id: "", name: "", price:0, category_id: '', description:''},
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
    getProduct: async (searchData?:string, pageSelected?:number) => {
        try {
            set ({
                loading:true,
                search: searchData || '',
                page: pageSelected || 1
            })
            const {search, page} = get()
            const params = { page, ...(search && { search }) };
            const res = await AxiosInstance.get(`/api/product`, { params });
            set({
                products: res.data.data,
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
    getProductById: async (id:string) => {
        try {
            set({loadingDetail:true})
            const res = await AxiosInstance.get(`/api/product/${id}`)
            set({product: res.data})
        } catch (e) {
            handleError(set, e)
        } finally {
            set({loadingDetail:false})
        }
    },
    createProduct: async (data:Product) => {
        try {
            set({loadingCrud:true})
            const res = await AxiosInstance.post(`/api/product`, {
                data : {
                    ...data
                }
            })
            console.log(res)
            get().getProduct()
            set({status: res.status})
            if (res.status == 200) {
                set({message: 'Create Product Success'})
            }
        } catch (e) {
            handleError(set, e)
        } finally {
            set({loadingCrud:false})
        }
    },
    updateProduct: async (id:string, data:Product) => {
        try {
            set({loadingCrud:true})
            const res = await AxiosInstance.patch(`/api/product/${id}`, {
                data: {
                    ...data
                },
            })
            get().getProduct()
            set({status: res.status})
            if (res.status == 200) {
                set({message: 'Update Product Success'})
            }
        } catch (e) {
            handleError(set, e)
        } finally {
            set({loadingCrud:false})
        }
    },
    deleteProduct: async (id:string) => {
        try {
            set({loadingCrud:true})
            const res = await AxiosInstance.delete(`/api/product/${id}`)
            get().getProduct()
            set({status: res.status})
            if (res.status == 200) {
                set({message: 'Delete Product Success'})
            }
        } catch (e) {
            handleError(set, e)
        } finally {
            set({loadingCrud:false})
        }
    }
}))