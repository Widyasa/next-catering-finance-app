import Head from "next/head";
import ProductTable from "@/components/dashboard/tables/product-table";
import {Suspense} from "react";

export default function Product() {
    return(
        <>
            <Head>
                <title>tes page title</title>
            </Head>
            <div className="p-8 pb-5 bg-white rounded-xl">
                <Suspense fallback={<div>Loading Content.....</div>}>
                    <ProductTable />
                </Suspense>
            </div>
        </>
    )
}