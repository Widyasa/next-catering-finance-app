import CreateProductForm from "@/components/dashboard/forms/product/create";
import Head from "next/head";
import { productStore } from "@/stores/productStore";

export default function CreateOrderPage() {
    const {getProduct} = productStore()
    getProduct()
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