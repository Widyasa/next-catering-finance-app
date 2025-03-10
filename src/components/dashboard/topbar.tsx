'use client'
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {supabase} from "@/utils/supabase/client";

export default function Topbar(){
    const pathName = usePathname()
    const router = useRouter()
    const formatPathName = (path: string) => {
        const segments = path.replace("/dashboard", "").split("/").filter(Boolean);
        return segments.length > 0
            ? segments.map(segment => capitalize(segment)).join(" / ")
            : "Dashboard";
    };
    const capitalize = (str: string) => {
        return str
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };
    const handleSignOut = async () => {
        const {error} = await supabase.auth.signOut()
        router.refresh()
    }
    return(
        <>
            <div className="flex justify-between items-center p-8 bg-white border-b">
                <div className="flex items-center">
                    <div className="ml-4">{formatPathName(pathName)} Page</div>
                </div>
                <div className="flex items-center">
                    <Button onClick={handleSignOut}>Logout</Button>
                </div>
            </div>
        </>
    )
}