'use client'
import {Button} from "@/components/ui/button";
import {useState} from "react";
import LogoutDialog from "@/components/dashboard/dialogs/logout-dialog";

export default function Topbar(){
    const [open, setOpen] = useState(false)
    const modalHandler = () => {
        setOpen(true)
    }
    return(
        <>
            <div className="flex justify-between items-center p-8 bg-white border-b">
                <div className="flex items-center">
                    <h1 className="ml-4 text-2xl font-semibold">Catering Finance System</h1>
                </div>
                <div className="flex items-center">
                    <Button onClick={modalHandler}>Logout</Button>
                </div>
            </div>
            <LogoutDialog
                setOpen={setOpen}
                open={open}
            />
        </>
    )
}