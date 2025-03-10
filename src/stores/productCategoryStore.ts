import {create} from "zustand/react";
import {ProductCategory, ProductCategoryAction, ProductCategoryState} from "@/types/ProductCategory";
import {AxiosInstance} from "@/utils/axios";
import {ClientError} from "@/types/global";
import {toast} from "sonner";
import {supabase, supabaseClient} from "@/utils/supabase/client";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
type SetState = (state: Partial<ProductCategoryState>) => void;

const handleError = (set: SetState, error:unknown) => {
    const message = error as ClientError
    toast(message.response.data)
};

export const productCategoryStore = create<ProductCategoryState & ProductCategoryAction>((set, get) => ({
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
    getProductCategory: async (searchData?:string, pageSelected?:number) => {
        try {
            set ({
                loading:true,
                search: searchData || '',
                page: pageSelected || 1
            })
            const {search, page} = get()
            const {data, count} = await supabase
                .from("ProductCategories")
                .select('*', {count:'exact'})
                .range((page - 1)*7 , page * 7 - 1)
                .like('name', `%${search}%`)
            set({
                categories: data ?? [],
                totalData: count ?? 0
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
    getProductCategoryById: async (id:string) => {
        try {
            set({loadingDetail:true})
            const res = await AxiosInstance.get(`/api/product-category/${id}`)
            set({category: res.data})
        } catch (e) {
            handleError(set, e)
        } finally {
            set({loadingDetail:false})
        }
    },
    createProductCategory: async (req:ProductCategory) => {
        try {
            set({loadingCrud:true})
            const {status} = await supabaseClient
                .from('ProductCategories')
                .insert({...req})
                .single()
            await get().getProductCategory()
            set({status: status})
            if (status == 201) {
                set({message: 'Create Product Category Success'})
            }
        } catch (e) {
            handleError(set, e)
        } finally {
            set({loadingCrud:false})
        }
    },
    updateProductCategory: async (id:string, data:ProductCategory) => {
        try {
            set({loadingCrud:true})
            const res = await AxiosInstance.patch(`/api/product-category/${id}`, {
                data: {
                    ...data
                },
            })
            await get().getProductCategory()
            set({status: res.status})
            if (res.status == 200) {
                set({message: 'Update Product Category Success'})
            }
        } catch (e) {
            handleError(set, e)
        } finally {
            set({loadingCrud:false})
        }
    },
    deleteProductCategory: async (id:string) => {
        try {
            set({loadingCrud:true})
            const res = await AxiosInstance.delete(`/api/product-category/${id}`)
            await get().getProductCategory()
            set({status: res.status})
            if (res.status == 200) {
                set({message: 'Delete Product Category Success'})
            }
        } catch (e) {
            handleError(set, e)
        } finally {
            set({loadingCrud:false})
        }
    }
}))