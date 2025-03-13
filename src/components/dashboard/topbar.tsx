'use client'
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {supabaseClient} from "@/utils/supabase/client";

export default function Topbar(){
    const router = useRouter()
    const handleSignOut = async () => {
        await supabaseClient.auth.signOut()
        router.refresh()
    }
    return(
        <>
            <div className="flex justify-between items-center p-8 bg-white border-b">
                <div className="flex items-center">
                    <div className="ml-4">Catering Finance System</div>
                </div>
                <div className="flex items-center">
                    <Button onClick={handleSignOut}>Logout</Button>
                </div>
            </div>
        </>
    )
}