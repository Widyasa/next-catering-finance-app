import Head from "next/head";
import DetailProductForm from "@/components/dashboard/forms/product/detail";

export default function UpdateProductPage() {
    return (
        <>
            <Head>
                <title>Detail Product Page</title>
            </Head>
            <div className="p-8 pb-5 bg-white rounded-xl">
                <DetailProductForm />
            </div>
        </>
    )
}