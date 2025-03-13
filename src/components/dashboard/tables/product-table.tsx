"use client";

import {useEffect, useState} from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Searchbar from "@/components/dashboard/searchbar";
import {PaginationWithLinks} from "@/components/ui/pagination-with-link";
import {useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import {productStore} from "@/stores/productStore";
import Link from "next/link";
import {formatRupiah} from "@/utils/currency";
import ProductDialog from "@/components/dashboard/dialogs/product-dialog";


export default function ProductTable() {
    const params = useSearchParams()
    const { products, loading, getProduct, status, changeStatus, totalData,getProductById } = productStore();
    const currentPage = parseInt((params.get('page') as string) || '1');
    const [prevPage, setPrevPage] = useState(currentPage)
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('')
    useEffect(() => {
        if (products.length === 0 || (currentPage !== prevPage)) {
            getProduct('', currentPage);
        }
        setPrevPage(currentPage)
        if (status === 201 || status === 204) {
            setOpen(false)
            changeStatus(0)
        }
    }, [changeStatus, currentPage, getProduct, prevPage, products.length, status]);
    const handleChange = (e:string) => {
        if (e) {
            getProduct(e)
        } else {
            getProduct()
        }
    }
    const modalHandler = (type:string, id:string) => {
        setOpen(true)
        setType(type)
        getProductById(id)
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
                            <TableRow key={'loading'}>
                                <TableCell>Loading...</TableCell>
                            </TableRow>
                        ) : (
                            products.map(({product_id, product_name, price, category_name}, index) => (
                                <TableRow key={product_id || index}>
                                    <TableCell>{product_name}</TableCell>
                                    <TableCell>{formatRupiah(price)}</TableCell>
                                    <TableCell>{category_name}</TableCell>
                                    <TableCell className={'flex gap-3'}>
                                        <Link href={`/dashboard/product/${product_id}`}>
                                            <Button>
                                                Detail
                                            </Button>
                                        </Link>
                                        <Link href={`/dashboard/product/${product_id}/update`}>
                                            <Button>
                                                Update
                                            </Button>
                                        </Link>
                                        <Button onClick={() => modalHandler('delete', product_id!)}>
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
            <ProductDialog
                open={open}
                setOpen={setOpen}
                type={type}
            />
        </>
    );
}
