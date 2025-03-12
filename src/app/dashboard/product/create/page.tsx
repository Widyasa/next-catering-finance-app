'use client'
import {useEffect} from "react";
import {productCategoryStore} from "@/stores/productCategoryStore";
import CreateProductForm from "@/components/dashboard/forms/product/create";
import Head from "next/head";
import ProductCategoryTable from "@/components/dashboard/tables/product-category-table";

export default function CreateProductPage() {
    const {getProductCategory} = productCategoryStore()
    useEffect(() => {
        getProductCategory()
    }, [getProductCategory]);
    return (
        <>
            <Head>
                <title>Create Product Page</title>
            </Head>
            <div className="p-8 pb-5 bg-white rounded-xl">
                <CreateProductForm />
            </div>
        </>
    )
}