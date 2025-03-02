'use client'
import Link from "next/link";
import {ReactNode} from "react";
import {usePathname} from "next/navigation";

interface SidebarNavProps {
    title: string
    route: string
    activeRoute?: string
    children: ReactNode
}
export default function SidebarNav(props:SidebarNavProps){
    const pathName = usePathname()
    const isPage = props.activeRoute != null
        ? pathName.startsWith(props.activeRoute)
        : pathName === props.route;

    return (
        <>
            {}
           <Link href={props.route} className={`${isPage ? 'active': ''} sidebar-nav-wrapper flex gap-3`}>
               <span className="">
                    {props.children}
               </span>
               {props.title}
           </Link>
        </>
    )
}