"use client"
import {Button} from "@/components/ui/button";
import {productCategoryStore} from "@/stores/productCategoryStore";
import {useEffect, useState} from "react";
import DeleteMessage from "@/components/ui/delete-message";

export default function DeleteProductCategory() {
    const {loadingCrud, loadingDetail, deleteProductCategory, category} = productCategoryStore()
    const [id, setId] = useState<string>('')
    useEffect(() => {
        setId(category.id!)
    }, [category]);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        deleteProductCategory(id)
    }
    return (
        <>
            {
                loadingDetail ? 'Loading fields...' :
                    <form onSubmit={submitHandler}>
                        <DeleteMessage module={'product category'} />
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