import {create} from "zustand/react";
import {supabase} from "@/utils/supabase/client";
import {DashboardAction, DashboardState} from "@/types/Dashboard";
export const dashboardStore = create<DashboardState & DashboardAction>((set) => ({
    dashboard: {total_orders_all:0, total_income_all:0, total_products:0, total_product_categories:0, total_income_per_month:0, total_orders_per_month:0},
    getDashboard: async () => {
        const {data} = await supabase
            .from("dashboard_summary")
            .select('*')
            .single()
        set({
            dashboard: data ?? [],
        })
    },
}))