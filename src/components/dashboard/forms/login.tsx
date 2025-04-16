'use client'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {toast} from "sonner";

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignIn = async () => {
        const login = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (login.error !== null) {
            toast.error('Login failed, please check your email and password')
        } else {
            toast.success('Login success')
            router.push('/dashboard')
        }
    }
    return (
        <>
            <div className="mt-5">
                <Label htmlFor="email">Email</Label>
                <Input type={"email"} name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className="mt-3">
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <Button className={"mt-10"} onClick={handleSignIn}>Sign in</Button>
        </>
    )
}