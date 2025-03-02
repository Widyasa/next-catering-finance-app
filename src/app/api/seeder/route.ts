import prisma from "@/lib/db";

export async function GET() {
    try {
        await prisma.productCategories.createMany({
            data: [
                {name: "catering"},
                {name: "nasi kotak"},
                {name: "snack"},
            ]
        })
        const productCategories = await prisma.productCategories.findFirst({
            where: {
                name: 'snack'
            }
        })
        if (productCategories) {
            await prisma.products.create({
                data: {
                    name: 'snack minimalis',
                    price: 5000,
                    category_id: productCategories.id,
                    description: 'snack minimalis'
                }
            })
        }
        const product = await prisma.products.findFirst({
            where: {
                name: 'snack minimalis'
            }
        })
        await prisma.orders.create({
            data: {
                date: '2025-03-15',
                customer_phone: '08123456789',
                customer_name: 'budi saputra',
                customer_address: 'jl. raya no 1',
                total_price: 300000,
                status: 'confirmed',
                total_income: 50000
            }
        })
        const order = await prisma.orders.findFirst({
            where: {
                customer_name: 'budi saputra'
            }
        })
        if (order && product) {
            await prisma.orderDetail.create({
                data: {
                    order_id: order.id,
                    product_id: product.id,
                    quantity: 60,
                    price: 300000
                }
            })
            await prisma.orderOutcome.createMany({
                data: [
                    {
                        order_id: order.id,
                        name: 'beli bahan baku',
                        description: 'beli bahan a, b, c',
                        date: '2025-03-12',
                        price: 200000
                    },
                    {
                        order_id: order.id,
                        name: 'transport',
                        description: 'buat beli bensin',
                        date: '2025-03-15',
                        price: 50000
                    }
                ]
            })
        }
    return productCategories
    } catch (e) {
        if (e instanceof  Error) {
            console.log(e.message)
            return e.message
        }
    }

}