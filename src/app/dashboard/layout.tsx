import type { Metadata } from "next";
import Sidebar from "../../components/dashboard/sidebar";
import React from "react";
import Topbar from "@/components/dashboard/topbar";


export const metadata: Metadata = {
    title: "Dashboard Page",
    description: "dashboard page",
};

export default async function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex bg-[#F4F5FA]">
                <div className="max-w-[300px] w-full">
                    <Sidebar />
                </div>
                <div className="w-full">
                    <Topbar />
                    <div className="section mt-10">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
