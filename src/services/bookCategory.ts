import prisma from "@/lib/db";
import {createPaginator} from "prisma-pagination";
import {BookCategory} from "@/interface/BookCategory";
import {Prisma} from "@prisma/client";

export const getCategories = async (request: { search: string | null; page: string }) => {
    const paginate = createPaginator({ perPage: 7 });

    const whereCondition = request.search ? { name: request.search } : {};
    return await paginate<BookCategory, Prisma.BookCategoriesFindManyArgs>(
        prisma.bookCategories,
        {where: whereCondition},
        {page: request.page}
    );
};


export const getCategoryById = (id:string) => {
    return prisma.bookCategories.findUnique({
        where: { id }
    });
};

export const createCategory = (request: BookCategory) => {
        return prisma.bookCategories.create({
            data: {...request}
        })
};

export const updateCategory = async (id: string, request: BookCategory) => {
    return prisma.bookCategories.update({
        where: { id },
        data: { ...request }
    });
};

export const deleteCategory = async (id: string) => {
    return prisma.bookCategories.delete({
        where: { id }
    });
};
