"use client"
// import {Button} from "@/components/ui/button";



export default function Dashboard() {
    // const data = async () => {
    //     await fetch('/api/seeder')
    // }
    // const handleClick = () => {
    //     data().catch(console.error)
    // }
    return (
        <section>
            <div className="w-full flex justify-center items-center h-full">
                {/*<p className="">INI DASHBOARD</p>*/}
                {/*<Button onClick={handleClick}>seed</Button>*/}
                <div className="bg-white size-[200px] rounded">
                    <div className="flex justify-center items-center flex-col h-full">
                        <div className="size-20 bg-black rounded-full"></div>
                        <p className="text-center">nasi cumi hitam</p>
                        <div className="size-5 bg-black rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}