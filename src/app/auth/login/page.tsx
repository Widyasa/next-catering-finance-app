import LoginForm from "@/components/dashboard/forms/login";

export default function Login() {
    return (
        <>
            <div className="w-full flex h-screen justify-center items-center">
                <div className="flex flex-col w-[600px] p-10 border rounded-lg">
                    <h1 className="text-center text-4xl font-semibold">Login Page</h1>
                    <LoginForm />
                </div>
            </div>
        </>
    )
}