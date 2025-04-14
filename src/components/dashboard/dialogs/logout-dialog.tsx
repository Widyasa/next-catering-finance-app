'use client'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import LogoutForm from "@/components/dashboard/forms/logout";
interface LogoutDialogProps {
    open: boolean
    setOpen: (value: boolean) => void
}
export default function LogoutDialog(props:LogoutDialogProps) {
    return (
        <>
            <Dialog open={props.open} onOpenChange={props.setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={'capitalize'}>Logout Confirmation</DialogTitle>
                        <DialogDescription aria-describedby={undefined} />
                    </DialogHeader>
                    <LogoutForm />
                </DialogContent>
            </Dialog>
        </>
    )
}