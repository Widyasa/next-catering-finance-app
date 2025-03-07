import {NextRequest, NextResponse} from "next/server";
import {deleteProduct, getProductById, updateProduct} from "@/services/product";
import {Prisma} from "@prisma/client";

export async function GET(_:NextRequest, { params }: { params: { id: string } }) {
    const {id} = params
    try {
        const categories = await getProductById(id)
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
        const product = await updateProduct(id, request.data)
        return NextResponse.json(product)
    } catch (e) {
        if (e instanceof Error) {
            if(e instanceof Prisma.PrismaClientKnownRequestError) {
                return NextResponse.json('Product is already taken', {status: 400});
            }
            return NextResponse.json(e.message, {status: 500});
        }
        return NextResponse.json("An unexpected error occurred", {status: 500});
    }
}

export async function DELETE (_:NextRequest, { params }: { params: { id: string } }) {
    const {id} = params
    try {
        const product = await deleteProduct(id)
        return NextResponse.json(product)
    } catch (e) {
        if (e instanceof Error) {
            return Response.json(e.message, {status: 500});
        }
        return Response.json("An unexpected error occurred", {status: 500});
    }
}
