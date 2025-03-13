'use client'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import DeleteProductCategory from "@/components/dashboard/forms/product-category/delete";
import CreateProductCategory from "@/components/dashboard/forms/product-category/create";
import UpdateProductCategory from "@/components/dashboard/forms/product-category/update";
import DetailProductCategory from "@/components/dashboard/forms/product-category/detail";
interface ProductCategoryDialogProps {
    open: boolean
    setOpen: (value: boolean) => void
    type: string
}
export default function ProductCategoryDialog(props:ProductCategoryDialogProps) {
    return (
        <>
            <Dialog open={props.open} onOpenChange={props.setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={'capitalize'}>{props.type} Product Category</DialogTitle>
                        <DialogDescription aria-describedby={undefined} />
                    </DialogHeader>
                    {
                        props.type === 'delete' ?
                            <DeleteProductCategory />
                        : props.type === 'create' ?
                            <CreateProductCategory />
                        : props.type === 'update' ?
                            <UpdateProductCategory />
                        : props.type === 'detail' ?
                            <DetailProductCategory />
                            : null
                    }

                </DialogContent>
            </Dialog>
        </>
    )
}