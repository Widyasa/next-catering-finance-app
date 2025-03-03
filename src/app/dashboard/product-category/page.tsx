import Head from "next/head";
import ProductCategoryTable from "@/components/dashboard/tables/product-category-table";

export default function BookCategory(){

    return (
        <>
            <Head>
                <title>tes page title</title>
            </Head>
            <div className="p-8 pb-5 bg-white rounded-xl">
                <ProductCategoryTable />
            </div>
        </>
    )
}