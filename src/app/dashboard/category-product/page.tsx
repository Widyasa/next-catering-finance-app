import Head from "next/head";
import ProductCategoryTable from "@/components/dashboard/tables/product-category-table";
import {Suspense} from "react";

export default function ProductCategory(){

    return (
        <>
            <Head>
                <title>Product Category Page</title>
            </Head>
            <div className="p-8 pb-5 bg-white rounded-xl">
                <Suspense fallback={<div>Loading Content.....</div>}>
                    <ProductCategoryTable />
                </Suspense>
            </div>
        </>
    )
}