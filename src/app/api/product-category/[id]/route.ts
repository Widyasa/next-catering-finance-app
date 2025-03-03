import {NextRequest, NextResponse} from "next/server";
import {deleteCategory, getCategoryById, updateCategory} from "@/services/productCategory";
import {Prisma} from "@prisma/client";

export async function GET(_:NextRequest, { params }: { params: { id: string } }) {
    const {id} = params
    try {
        const categories = await getCategoryById(id)
        return NextResponse.json(categories)
    } catch (e) {
        if (e instanceof Error) {
            return NextResponse.json(e.message, {status: 500});
        }
        return NextResponse.json("An unexpected error occurred", {status: 500});
    }
}

export async function PATCH (req:NextRequest, { params }: { params: { id: string } }) {
    const request = await req.json()
    const {id} = params
    try {
        const category = await updateCategory(id, request.data)
        return NextResponse.json(category)
    } catch (e) {
        if (e instanceof Error) {
            if(e instanceof Prisma.PrismaClientKnownRequestError) {
                return NextResponse.json('Category is already taken', {status: 400});
            }
            return NextResponse.json(e.message, {status: 500});
        }
        return NextResponse.json("An unexpected error occurred", {status: 500});
    }
}

export async function DELETE (_:NextRequest, { params }: { params: { id: string } }) {
    const {id} = params
    try {
        const category = await deleteCategory(id)
        return NextResponse.json(category)
    } catch (e) {
        if (e instanceof Error) {
            return Response.json(e.message, {status: 500});
        }
        return Response.json("An unexpected error occurred", {status: 500});
    }
}
