'use client'
import Head from "next/head";
import ProductCategoryTable from "@/components/dashboard/tables/product-category-table";

export default function ProductCategory(){

    return (
        <>
            <Head>
                <title>Product Category Page</title>
            </Head>
            <div className="p-8 pb-5 bg-white rounded-xl">
                <ProductCategoryTable />
            </div>
        </>
    )
}