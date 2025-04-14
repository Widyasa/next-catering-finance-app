"use client"
import {Button} from "@/components/ui/button";
import {supabaseClient} from "@/utils/supabase/client";
import {useRouter} from "next/navigation";

export default function LogoutForm() {
    const router = useRouter()
    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        await supabaseClient.auth.signOut()
        router.refresh()
    }
    return (
        <>
            {
                    <form onSubmit={submitHandler}>
                        <p>
                            Are you absolutely sure you want to log out now? If yes, click the logout button. Otherwise, click the X button.
                        </p>
                        <Button className={'mt-5'} type={'submit'}>
                            Logout
                        </Button>
                    </form>
            }
        </>
    )
}