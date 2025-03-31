'use client'
import SidebarNav from "@/components/dashboard/sidebar/nav";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
const links = [
    { title: 'Dashboard', route: '/dashboard', icon:<DashboardOutlinedIcon/>},
    { title: 'Product Category', route: '/dashboard/category-product', active: '/dashboard/category-product', icon:<CategoryOutlinedIcon/>},
    { title: 'Products', route: '/dashboard/product', active: '/dashboard/product',icon: <FastfoodIcon/>},
    { title: 'Orders', route: '/dashboard/order', active: '/dashboard/order',icon: <ReceiptLongIcon/>},
]
export default function Sidebar(){
    return (
        <>
            <div className="bg-primary min-h-screen h-full ">
                <div className="px-3 pt-10">
                    <div className="text-white text-3xl text-center">Logo</div>
                    <div className="flex flex-col gap-3 mt-6 h-full">
                        {links.map((link, index) => (
                            <SidebarNav key={index} title={link.title} route={link.route} activeRoute={link?.active}>
                                {link.icon}
                            </SidebarNav>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}