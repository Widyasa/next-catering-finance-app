'use client'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import DeleteOrderForm from "@/components/dashboard/forms/order/delete";
interface OrderDialogProps {
    open: boolean
    setOpen: (value: boolean) => void
    type: string
}
export default function OrderDialog(props:OrderDialogProps) {
    return (
        <>
            <Dialog open={props.open} onOpenChange={props.setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={'capitalize'}>{props.type} Order </DialogTitle>
                        <DialogDescription aria-describedby={undefined} />
                    </DialogHeader>
                    {
                        props.type === 'delete' ?
                            <DeleteOrderForm />
                            : null
                    }

                </DialogContent>
            </Dialog>
        </>
    )
}