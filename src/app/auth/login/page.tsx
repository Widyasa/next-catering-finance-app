'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignIn = async () => {
        await supabase.auth.signInWithPassword({
            email,
            password,
        })
        router.refresh()
    }

    // const handleSignOut = async () => {
    //     await supabase.auth.signOut()
    //     router.refresh()
    // }

    return (
        <>
            <div className="w-full flex h-screen justify-center items-center">
                <div className="flex flex-col w-[600px] p-10 border rounded-lg">
                    <h1 className="text-center text-4xl font-semibold">Login Page</h1>
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
                </div>
            </div>
        </>
    )
}