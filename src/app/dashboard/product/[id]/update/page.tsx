'use client'
import {useEffect} from "react";
import {productCategoryStore} from "@/stores/productCategoryStore";
import Head from "next/head";
import UpdateProductForm from "@/components/dashboard/forms/product/update";

export default function UpdateProductPage() {
    const {getProductCategory} = productCategoryStore()
    useEffect(() => {
        getProductCategory()
    }, [getProductCategory]);
    return (
        <>
            <Head>
                <title>Update Product Page</title>
            </Head>
            <div className="p-8 pb-5 bg-white rounded-xl">
                <UpdateProductForm />
            </div>
        </>
    )
}