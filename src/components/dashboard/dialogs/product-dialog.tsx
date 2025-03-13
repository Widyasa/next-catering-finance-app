'use client'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import DeleteProductForm from "@/components/dashboard/forms/product/delete";
interface ProductDialogProps {
    open: boolean
    setOpen: (value: boolean) => void
    type: string
}
export default function ProductDialog(props:ProductDialogProps) {
    return (
        <>
            <Dialog open={props.open} onOpenChange={props.setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={'capitalize'}>{props.type} Product </DialogTitle>
                        <DialogDescription aria-describedby={undefined} />
                    </DialogHeader>
                    {
                        props.type === 'delete' ?
                            <DeleteProductForm />
                        : null
                    }

                </DialogContent>
            </Dialog>
        </>
    )
}