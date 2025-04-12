"use client"
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import DeleteMessage from "@/components/ui/delete-message";
import {productStore} from "@/stores/productStore";

export default function DeleteProductForm() {
    const {loadingCrud, loadingDetail, deleteProduct, product} = productStore()
    const [id, setId] = useState<string>('')
    useEffect(() => {
        setId(product.product_id!)
    }, [product]);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        deleteProduct(id)
    }
    return (
        <>
            {
                loadingDetail ? 'Loading content...' :
                    <form onSubmit={submitHandler}>
                        <DeleteMessage module={'product'} />
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