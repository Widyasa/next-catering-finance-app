import { Prisma } from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {createProduct, getProduct} from "@/services/product";
export async function GET (req:NextRequest) {
    try {
        const {searchParams} = req.nextUrl
        const search = searchParams.get('search')
        const page = searchParams.get('page')!
        const categories = await getProduct({search, page})
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
        const category = await createProduct(request.data)
        return NextResponse.json(category)
    } catch (e) {
        if (e instanceof Error) {
            if(e instanceof Prisma.PrismaClientKnownRequestError) {
                return NextResponse.json(e, {status: 400});
            }
            return NextResponse.json(e, {status: 500});
        }
        return NextResponse.json("An unexpected error occurred", {status: 500});
    }
}


