import Head from "next/head";
import ProductTable from "@/components/dashboard/tables/product-table";

export default function Product() {
    return(
        <>
            <Head>
                <title>tes page title</title>
            </Head>
            <div className="p-8 pb-5 bg-white rounded-xl">
                <ProductTable />
            </div>
        </>
    )
}