"use client";

import {useEffect, useState} from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Searchbar from "@/components/dashboard/searchbar";
import {PaginationWithLinks} from "@/components/ui/pagination-with-link";
import {useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import ProductCategoryDialog from "@/components/dashboard/dialogs/product-category-dialog";
import {toast} from "sonner";
import {productStore} from "@/stores/productStore";
import Link from "next/link";


export default function ProductTable() {
    const params = useSearchParams()
    const { products, loading, getProduct, status, changeStatus, totalData, message, error } = productStore();
    const currentPage = parseInt((params.get('page') as string) || '1');
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('')
    useEffect(() => {
        getProduct('', currentPage);
        if (status === 200) {
            setOpen(false)
            changeStatus(0)
            toast(message)
        }
    }, [changeStatus, currentPage, getProduct, message, status, error]);
    const handleChange = (e:string) => {
        if (e) {
            getProduct(e)
        } else {
            getProduct()
        }
    }
    const modalHandler = (type:string) => {
        setOpen(true)
        setType(type)
    }

    return (
        <>
            <div className="mt-5 mb-3 flex w-full gap-3">
                <Searchbar handleChange={handleChange}/>
                <Link href={'/dashboard/product/create'}>
                    <Button>Add New</Button>
                </Link>
            </div>
            <div className="h-[420px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Name</TableHead>
                            <TableHead className="">Price</TableHead>
                            <TableHead className="">Category</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell>Loading...</TableCell>
                            </TableRow>
                        ) : (
                            products.map(({id, name, price, category}) => (
                                <TableRow key={id}>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{price}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell className={'flex gap-3'}>
                                        <Button>
                                            Detail
                                        </Button>
                                        <Button>
                                            Update
                                        </Button>
                                        <Button onClick={() => modalHandler('create')}>
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
