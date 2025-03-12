"use client";

import { productCategoryStore } from "@/stores/productCategoryStore";
import {useEffect, useState} from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Searchbar from "@/components/dashboard/searchbar";
import {PaginationWithLinks} from "@/components/ui/pagination-with-link";
import {useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import ProductCategoryDialog from "@/components/dashboard/dialogs/product-category-dialog";
import {toast} from "sonner";


export default function ProductCategoryTable() {
    const params = useSearchParams()
    const { categories, loading, getProductCategory, status, changeStatus, totalData, getProductCategoryById, message, error } = productCategoryStore();
    const currentPage = parseInt((params.get('page') as string) || '1');
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('')
    useEffect(() => {
        getProductCategory('', currentPage);
        if (status === 201 || status === 204) {
            setOpen(false)
            changeStatus(0)
            toast(message)
        }
    }, [changeStatus, currentPage, getProductCategory, message, status, error]);
    const handleChange = (e:string) => {
        if (e) {
            getProductCategory(e)
        } else {
            getProductCategory()
        }
    }
    const modalHandler = (type:string) => {
        setOpen(true)
        setType(type)
    }
    const getDetailHandler = (type: string, id: string) => {
        modalHandler(type)
        getProductCategoryById(id)
    }
    
    return (
        <>
            <div className="mt-5 mb-3 flex w-full gap-3">
                <Searchbar handleChange={handleChange}/>
                <Button onClick={() => modalHandler('create')}>Add New</Button>
            </div>
            <div className="h-[420px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Name</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow key={'loading'}>
                                <TableCell>Loading...</TableCell>
                            </TableRow>
                        ) : (
                            categories.map(({id, name}, index) => (
                                <TableRow key={id || index}>
                                    <TableCell>{name}</TableCell>
                                    <TableCell className={'flex gap-3'}>
                                        <Button onClick={() => getDetailHandler('detail', id!)}>
                                            Detail
                                        </Button>
                                        <Button onClick={() => getDetailHandler('update', id!)}>
                                            Update
                                        </Button>
                                        <Button onClick={() => getDetailHandler('delete', id!)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <PaginationWithLinks
                totalCount={totalData}
                pageSize={7}
                page={currentPage}
            />
            <ProductCategoryDialog
                open={open}
                setOpen={setOpen}
                type={type}
            />
        </>
    );
}
