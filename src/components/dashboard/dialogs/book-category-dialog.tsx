'use client'
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import CreateBookCategory from "@/components/dashboard/forms/book-category/create";
import DetailBookCategory from "@/components/dashboard/forms/book-category/detail";
import UpdateBookCategory from "@/components/dashboard/forms/book-category/update";
import DeleteBookCategory from "@/components/dashboard/forms/book-category/delete";
interface BookCategoryDialogProps {
    open: boolean
    setOpen: (value: boolean) => void
    type: string
}
export default function BookCategoryDialog(props:BookCategoryDialogProps) {
    return (
        <>
            <Dialog open={props.open} onOpenChange={props.setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={'capitalize'}>{props.type} Book Category</DialogTitle>
                    </DialogHeader>
                    {props.type === 'delete' ?
                        <DeleteBookCategory />
                        : props.type === 'create' ?
                            <CreateBookCategory />
                        : props.type === 'update' ?
                            <UpdateBookCategory />
                                : props.type === 'detail' ?
                                <DetailBookCategory />
                            : null
                    }

                </DialogContent>
            </Dialog>
        </>
    )
}