import prisma from "@/lib/db";
import {createPaginator} from "prisma-pagination";
import {Product} from "@/types/Product";
import {Prisma} from "@prisma/client";

export const getProduct = async (request: { search: string | null; page: string }) => {
    const paginate = createPaginator({ perPage: 7 });

    return await paginate<Product, Prisma.ProductsFindManyArgs>(
        prisma.products,
        {
            where: {
                name: {
                    contains: request.search || undefined,
                    mode: 'insensitive'
                }
            },
            include: {
                category:true
            }
        },
        {page: request.page}
    );
};


export const getProductById = (id:string) => {
    return prisma.products.findUnique({
        where: { id }
    });
};

export const createProduct = async (request: Product) => {
    return  prisma.products.create({
        data: {...request}
    })
};

export const updateProduct = async (id: string, request: Product) => {
    return prisma.products.update({
        where: { id },
        data: { ...request }
    });
};

export const deleteProduct = async (id: string) => {
    return prisma.products.delete({
        where: { id }
    });
};

