interface DashboardProps {
    title: string
    number: number | string
}
export default function CardDashboard(props:DashboardProps) {
    return (
        <>
            <div className="border p-4 rounded border-primary w-full">
                <h6 className="text-sm font-semibold">{props.title}</h6>
                <h1 className="font-bold text-2xl">{props.number}</h1>
            </div>
        </>
    )
}