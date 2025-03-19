'use client'
import {useEffect} from "react";
import Head from "next/head";
import {productStore} from "@/stores/productStore";
import CreateOrderForm from "@/components/dashboard/forms/order/create";

export default function CreateProductPage() {
    const {getProduct} = productStore()
    useEffect(() => {
        getProduct()
    }, [getProduct]);
    return (
        <>
            <Head>
                <title>Create Order Page</title>
            </Head>
            <div className="p-8 pb-5 bg-white rounded-xl">
                <CreateOrderForm />
            </div>
        </>
    )
}