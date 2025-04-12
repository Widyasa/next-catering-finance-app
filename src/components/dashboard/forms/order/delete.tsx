"use client"
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import DeleteMessage from "@/components/ui/delete-message";
import {orderStore} from "@/stores/orderStore";

export default function DeleteOrderForm() {
    const {loadingCrud, loadingDetail, deleteOrder, order} = orderStore()
    const [id, setId] = useState<string>('')
    useEffect(() => {
        console.log(order)
        setId(order.order_id!)
    }, [order]);
    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        await deleteOrder(id)
    }
    return (
        <>
            {
                loadingDetail ? 'Loading content...' :
                    <form onSubmit={submitHandler}>
                        <DeleteMessage module={'order'} />
                        <Button className={'mt-5'} type={'submit'}>
                            {
                                loadingCrud ? 'processing...' :
                                    'delete'
                            }
                        </Button>
                    </form>
            }
        </>
    )
}