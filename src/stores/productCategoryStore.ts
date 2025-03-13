import {create} from "zustand/react";
import {ProductCategory, ProductCategoryAction, ProductCategoryState} from "@/types/ProductCategory";
import {supabase, supabaseClient} from "@/utils/supabase/client";
import {toast} from "sonner";
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
        set({
            search: '',
            page: 1,
            loading: false
        })
    },
    getProductCategoryById: async (id:string) => {
        set({loadingDetail:true})
        const {data} = await supabaseClient
            .from('ProductCategories')
            .select()
            .eq('id', id)
        if (data) {
            set({category: data[0] ?? {}})
        }
        set({loadingDetail:false})
    },
    createProductCategory: async (req:ProductCategory) => {
        set({loadingCrud:true})
        const {status, error} = await supabaseClient
            .from('ProductCategories')
            .insert({...req})
        await get().getProductCategory()
        set({status: status})
        if (status == 201) {
            set({message: 'Create Product Category Success'})
            toast.success(get().message)
        }
        if (error?.code == '23505') {
            toast.warning('Category is Already Exists')
        }
        set({loadingCrud:false})
    },
    updateProductCategory: async (id:string, req:ProductCategory) => {
        set({loadingCrud:true})
        const {status, error} = await supabaseClient
            .from('ProductCategories')
            .update({...req})
            .eq('id', id)
        await get().getProductCategory()
        set({status: status})
        if (status == 204) {
            set({message: 'Update Product Category Success'})
            toast.success(get().message)
        }
        if (error?.code == '23505') {
            toast.warning('Category is Already Exists')
        }
        set({loadingCrud:false})
    },
    deleteProductCategory: async (id:string) => {
        set({loadingCrud:true})
        const {status} = await supabaseClient
            .from('ProductCategories')
            .delete()
            .eq('id', id)
        await get().getProductCategory()
        set({status: status})
        if (status == 204) {
            set({message: 'Delete Product Category Success'})
            toast.success(get().message)
        }
        set({loadingCrud:false})
    }
}))