'use client'
import Head from "next/head";
import DetailOrderForm from "@/components/dashboard/forms/order/detail";

export default function DetailOrderPage() {
    // const {getProduct} = productStore()
    // getProduct()
    return (
        <>
            <Head>
                <title>Detail Order Page</title>
            </Head>
            <div className="p-8 pb-5 bg-white rounded-xl">
                <DetailOrderForm />
            </div>
        </>
    )
}