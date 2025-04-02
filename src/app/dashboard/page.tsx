"use client"


import {useEffect} from "react";
import {dashboardStore} from "@/stores/dashboardStore";
import {formatRupiah} from "@/utils/currency";

export default function Dashboard() {
    const {getDashboard, dashboard} = dashboardStore()
    useEffect(() => {
        getDashboard()
    }, [getDashboard]);
    return (
        <section>
            <div className="w-full flex h-full bg-white p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-6 w-full">
                    <div className="border p-4 rounded border-primary w-full">
                        <h6 className="text-sm font-semibold">Total Product Category</h6>
                        <h1 className="font-bold text-2xl">{dashboard.total_product_categories}</h1>
                    </div>
                    <div className="border p-4 rounded border-primary w-full">
                        <h6 className="text-sm font-semibold">Total Product</h6>
                        <h1 className="font-bold text-2xl">{dashboard.total_products}</h1>
                    </div>
                    <div className="border p-4 rounded border-primary w-full">
                        <h6 className="text-sm font-semibold">Total Order Monthly</h6>
                        <h1 className="font-bold text-2xl">{dashboard.total_orders_per_month}</h1>
                    </div>
                    <div className="border p-4 rounded border-primary w-full">
                        <h6 className="text-sm font-semibold">Total Income Monthly</h6>
                        <h1 className="font-bold text-2xl">{formatRupiah(dashboard.total_income_per_month)}</h1>
                    </div>
                    <div className="border p-4 rounded border-primary w-full">
                        <h6 className="text-sm font-semibold">Total Order All Time</h6>
                        <h1 className="font-bold text-2xl">{dashboard.total_orders_all}</h1>
                    </div>
                    <div className="border p-4 rounded border-primary w-full">
                        <h6 className="text-sm font-semibold">Total Income All Time</h6>
                        <h1 className="font-bold text-2xl">{formatRupiah(dashboard.total_income_all)}</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}