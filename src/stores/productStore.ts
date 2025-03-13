import {create} from "zustand/react";
import {Product, ProductState, ProductAction} from "@/types/Product";
import {supabase, supabaseClient} from "@/utils/supabase/client";
import {toast} from "sonner";
import {redirect} from "next/navigation";
export const productStore = create<ProductState & ProductAction>((set, get) => ({
    products: [],
    product: {id: "", product_name: "", price:0, category_name:"", description:""},
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
        set ({
            loading:true,
            search: searchData || '',
            page: pageSelected || 1
        })
        const {search, page} = get()
        const {data, count} = await supabase
            .from("product_with_category")
            .select('*', {count:'exact'})
            .range((page - 1)*7 , page * 7 - 1)
            .like('product_name', `%${search}%`)
            .like('description', `%${search}%`)
            .like('category_name', `%${search}%`)
        set({
            products: data ?? [],
            totalData: count ?? 0
        })
        set({
            search: '',
            page: 1,
            loading: false
        })
    },
    getProductById: async (id:string) => {
        set({loadingDetail:true})
        const {data} = await supabaseClient
            .from('product_with_category')
            .select()
            .eq('product_id', id)
        if (data) {
            set({product: data[0]})
            set({loadingDetail:false})
        }
    },
    createProduct: async (req:Product) => {
        set({loadingCrud:true})
        const {status, error} = await supabaseClient
            .from('Products')
            .insert({...req})
        get().getProduct()
        set({status: status})
        set({loadingCrud: false})

        if (status == 201) {
            set({message: 'Create Product Success'})
            toast.success(get().message)
            redirect('/dashboard/product')
        }
        if (error?.code == '23505') {
            toast.warning('Product is Already Exists')
        } else {
            console.log(error)
        }
    },
    updateProduct: async (id:string, req:Product) => {
        set({loadingCrud:true})
        const {status, error} = await supabaseClient
            .from('Products')
            .update({...req})
            .eq('id', id)
        get().getProduct()
        set({status: status})
        set({loadingCrud:false})
        if (status == 204) {
            set({message: 'Update Product Product Success'})
            toast.success(get().message)
            redirect('/dashboard/product')
        }
        if (error?.code == '23505') {
            toast.warning('Product is Already Exists')
        } else {
            console.log(error)
        }
    },
    deleteProduct: async (id:string) => {
        set({loadingCrud:true})
        const {status} = await supabaseClient
            .from('Products')
            .delete()
            .eq('id', id)
        get().getProduct()
        set({status: status})
        if (status == 204) {
            set({message: 'Delete Product Product Success'})
            toast.success(get().message)
        }
        set({loadingCrud:false})
    }
}))