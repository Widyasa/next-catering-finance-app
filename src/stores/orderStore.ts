import {create} from "zustand/react";
import {Order, OrderState, OrderAction, CrudOrder} from "@/types/Order";
import {supabase, supabaseClient} from "@/utils/supabase/client";
import {toast} from "sonner";
import {redirect} from "next/navigation";
export const orderStore = create<OrderState & OrderAction>((set, get) => ({
    orders: [],
    order: {
        order_id: "",
        date: "",
        customer_name: "",
        total_price: 0,
        total_income: 0,
        status: "",
        code: "",
        order_details: [{
            product_id:"",
            price:0,
            quantity:0,
            product_name:""
        }],
        order_outcomes: [{
            price:0,
            id:"",
            name:"",
            description:""
        }]
    },
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
    getOrder: async (searchData?:string, pageSelected?:number) => {
        set ({
            loading:true,
            search: searchData || '',
            page: pageSelected || 1
        })
        const {search, page} = get()
        const {data, count} = await supabase
            .from("order_summary")
            .select('*', {count:'exact'})
            .range((page - 1)*7 , page * 7 - 1)
            .like('date', `%${search}%`)
            .like('customer_name', `%${search}%`)
            // .like('status', `%${search}%`)
        set({
            orders: data ?? [],
            totalData: count ?? 0
        })
        set({
            search: '',
            page: 1,
            loading: false
        })
    },
    getOrderById: async (id:string) => {
        set({loadingDetail:true})
        const {data} = await supabaseClient
            .from('order_summary')
            .select()
            .eq('order_id', id)
        if (data) {
            set({order: data[0]})
            set({loadingDetail:false})
        }
    },
    createOrder: async (req:CrudOrder) => {
        set({loadingCrud:true})
        const {status, error} = await supabaseClient
            .rpc('create_order', {
                ...req
            })
        get().getOrder()
        set({status: status})
        set({loadingCrud: false})

        if (status == 201) {
            set({message: 'Create Order Success'})
            toast.success(get().message)
            redirect('/dashboard/order')
        }
        if (error?.code == '23505') {
            toast.warning('Order is Already Exists')
        } else {
            console.log(error)
        }
    },
    updateOrder: async (id:string, req:CrudOrder) => {
        set({loadingCrud:true})
        const {status, error} = await supabaseClient
            .rpc('update_order', {
                p_order_id: id,
                ...req
            })
        get().getOrder()
        set({status: status})
        set({loadingCrud:false})
        if (status == 204) {
            set({message: 'Update Order Success'})
            toast.success(get().message)
            redirect('/dashboard/order')
        }
        if (error?.code == '23505') {
            toast.warning('Order is Already Exists')
        } else {
            console.log(error)
        }
    },
    deleteOrder: async (id:string) => {
        set({loadingCrud:true})
        const {status} = await supabaseClient
            .rpc('delete_order', { order_uuid: id });
        get().getOrder()
        set({status: status})
        if (status == 204) {
            set({message: 'Delete Order Success'})
            toast.success(get().message)
        }
        set({loadingCrud:false})
    }
}))