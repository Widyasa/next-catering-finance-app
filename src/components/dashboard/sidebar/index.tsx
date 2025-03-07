'use client'
import SidebarNav from "@/components/dashboard/sidebar/nav";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import FastfoodIcon from '@mui/icons-material/Fastfood';
const links = [
    { title: 'Dashboard', route: '/dashboard', icon:<DashboardOutlinedIcon/>},
    { title: 'Product Category', route: '/dashboard/category-product', active: '/dashboard/category-product', icon:<CategoryOutlinedIcon/>},
    { title: 'Products', route: '/dashboard/product', active: '/dashboard/product',icon: <FastfoodIcon/>},
]
export default function Sidebar(){
    return (
        <>
            <div className="bg-primary max-h-screen h-full px-3 pt-10">
                <div className="text-white text-3xl text-center">Logo</div>
                <div className="flex flex-col gap-3 mt-6">
                    {links.map((link, index) => (
                        <SidebarNav key={index} title={link.title} route={link.route} activeRoute={link?.active}>
                            {link.icon}
                        </SidebarNav>
                    ))}
                </div>
            </div>
        </>
    )
}