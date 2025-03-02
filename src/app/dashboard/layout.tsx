import type { Metadata } from "next";
import Sidebar from "../../components/dashboard/sidebar";
import React from "react";
import Topbar from "@/components/dashboard/topbar";


export const metadata: Metadata = {
    title: "Dashboard Page",
    description: "dashboard page",
};

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="grid grid-cols-12 min-h-screen h-full bg-[#F4F5FA]">
                <div className="col-span-3 h-full">
                    <Sidebar />
                </div>
                <div className="col-span-9">
                    <Topbar />
                    <div className="section mt-10">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
