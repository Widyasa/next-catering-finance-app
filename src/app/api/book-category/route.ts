import {createCategory, getCategories} from "@/services/bookCategory";
import {NextRequest, NextResponse} from "next/server";
export async function GET (req:NextRequest) {
    try {
        const {searchParams} = req.nextUrl
        const search = searchParams.get('search')
        const page = searchParams.get('page')!
        const categories = await getCategories({search, page})
        return NextResponse.json(categories)
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message)
            return NextResponse.json(e.message, {status: 500});
        }
        return NextResponse.json("An unexpected error occurred", {status: 500});
    }

}

export async function POST (req:NextRequest) {
    const request = await req.json()
    try {
        const category = await createCategory(request.data)
        return NextResponse.json(category)
    } catch (e) {
        if (e instanceof Error) {
            return NextResponse.json(e.message, {status: 500});
        }
        return NextResponse.json("An unexpected error occurred", {status: 500});
    }
}


