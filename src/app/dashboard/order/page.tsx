
import OrderTable from '../../../components/dashboard/tables/order-table';
import Head from "next/head";
import {Suspense} from "react";

export default function Order() {
    return (
        <>
             <Head>
                <title>Product Category Page</title>
            </Head>
            <div className="p-8 pb-5 bg-white rounded-xl">
                <Suspense fallback={<div>Loading Content.....</div>}>
                    <OrderTable />
                </Suspense>
            </div>
        </>
    )
}