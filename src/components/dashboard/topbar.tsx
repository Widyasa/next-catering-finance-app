'use client'
import {usePathname} from "next/navigation";

export default function Topbar(){
    const pathName = usePathname()
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
    return(
        <>
            <div className="flex justify-between items-center p-8 bg-white border-b">
                <div className="flex items-center">
                    <div className="ml-4">{formatPathName(pathName)} Page</div>
                </div>
                <div className="flex items-center">
                    <div className="mr-4">Profile</div>
                </div>
            </div>
        </>
    )
}