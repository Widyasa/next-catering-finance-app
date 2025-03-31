'use client'
import {useEffect} from "react";
import Head from "next/head";
import {productStore} from "@/stores/productStore";
import UpdateOrderForm from "@/components/dashboard/forms/order/update";

export default function UpdateProductPage() {
    const {getProduct} = productStore()
    useEffect(() => {
        getProduct()
    }, [getProduct]);
    return (
        <>
            <Head>
                <title>Update Order Page</title>
            </Head>
            <div className="p-8 pb-5 bg-white rounded-xl">
                <UpdateOrderForm />
            </div>
        </>
    )
}