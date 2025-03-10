import prisma from "@/lib/db";
import {createPaginator} from "prisma-pagination";
import {ProductCategory} from "@/types/ProductCategory";
import {Prisma} from "@prisma/client";

export const getCategories = async (request: { search: string | null; page: string }) => {
    const paginate = createPaginator({ perPage: 7 });
    return await paginate<ProductCategory, Prisma.ProductCategoriesFindManyArgs>(
        prisma.productCategories,
        {
            where: {
                name: {
                    contains: request.search || undefined,
                    mode: 'insensitive'
                }
            }
        },
        {page: request.page}
    );
};


export const getCategoryById = (id:string) => {
    return prisma.productCategories.findUnique({
        where: { id }
    });
};

export const createCategory = async (request: ProductCategory) => {
    return  prisma.productCategories.create({
            data: {...request}
        })
};

export const updateCategory = async (id: string, request: ProductCategory) => {
    return prisma.productCategories.update({
        where: { id },
        data: { ...request }
    });
};

export const deleteCategory = async (id: string) => {
    return prisma.productCategories.delete({
        where: { id }
    });
};

