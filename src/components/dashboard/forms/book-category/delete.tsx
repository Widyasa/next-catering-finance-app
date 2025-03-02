"use client"
import {Button} from "@/components/ui/button";
import {bookCategoryStore} from "@/stores/bookCategoryStore";
import {useEffect, useState} from "react";
import DeleteMessage from "@/components/ui/delete-message";

export default function DeleteBookCategory() {
    const {loadingCrud, loadingDetail, deleteBookCategory, category} = bookCategoryStore()
    const [id, setId] = useState<string>('')
    useEffect(() => {
        setId(category.id!)
    }, [category]);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        deleteBookCategory(id)
    }
    return (
        <>
            {
                loadingDetail ? 'Loading fields...' :
                    <form onSubmit={submitHandler}>
                        <DeleteMessage module={'book category'} />
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