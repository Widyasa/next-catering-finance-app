import prisma from "@/lib/db";

export async function GET() {
    try {
        return await prisma.bookCategories.createMany({
            data: [
                {name: "Fiction"},
                {name: "Documentary"},
                {name: "Action"},
                {name: "Romance"}
            ]
        })
    } catch (e) {
        if (e instanceof  Error) {
            console.log(e.message)
            return e.message
        }
    }

}