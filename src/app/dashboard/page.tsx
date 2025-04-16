"use client"


import {useEffect} from "react";
import {dashboardStore} from "@/stores/dashboardStore";
import {formatRupiah} from "@/utils/currency";
import CardDashboard from "@/components/ui/card-dashboard";

export default function Dashboard() {
    const {getDashboard, dashboard} = dashboardStore()
    useEffect(() => {
        getDashboard()
    }, [getDashboard]);
    return (
        <section>
            <div className="w-full flex h-full bg-white p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-6 w-full">
                    <CardDashboard title={'Total Product Category'} number={dashboard.total_product_categories} />
                    <CardDashboard title={'Total Product'} number={dashboard.total_products} />
                    <CardDashboard title={'Total Order Monthly'} number={dashboard.total_orders_per_month} />
                    <CardDashboard title={'Total Income Monthly'} number={formatRupiah(dashboard.total_income_per_month)} />
                    <CardDashboard title={'Total Order All Time'} number={dashboard.total_orders_all} />
                    <CardDashboard title={'Total Income All Time'} number={formatRupiah(dashboard.total_income_all)} />
                </div>
            </div>
        </section>
    )
}