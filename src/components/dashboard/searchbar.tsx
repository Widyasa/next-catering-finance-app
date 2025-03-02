'use client'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {SearchIcon} from "lucide-react";
interface SearchbarProps {
    handleChange: (value: string) => void
}
export default function Searchbar(props:SearchbarProps){
    const [inputValue, setInputValue] = useState('')
    return(
        <>
            <div className="flex gap-3 w-full">
                <div className="relative w-full">
                    <div className="absolute z-[10] right-0">
                        <Button type={'button'} onClick={() => props.handleChange(inputValue)}>
                            <SearchIcon />
                        </Button>
                    </div>
                    <div className="relative w-full">
                        <Input placeholder={'search data here'} onChange={(e) => setInputValue(e.target.value)}/>
                    </div>
                </div>
            </div>
        </>
    )
}