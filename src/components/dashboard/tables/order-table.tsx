"use client";

import {useEffect, useState} from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Searchbar from "@/components/dashboard/searchbar";
import {PaginationWithLinks} from "@/components/ui/pagination-with-link";
import {useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {formatRupiah} from "@/utils/currency";
import {orderStore} from "@/stores/orderStore";
import OrderDialog from "@/components/dashboard/dialogs/order-dialog";

export default function OrderTable() {
    const params = useSearchParams()
    const { orders, loading, getOrder, status, changeStatus, totalData, getOrderById } = orderStore();
    const currentPage = parseInt((params.get('page') as string) || '1');
    const [prevPage, setPrevPage] = useState(currentPage)
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('')
    useEffect(() => {
        if (orders.length === 0 || (currentPage !== prevPage)) {
            getOrder('', currentPage);
        }
        setPrevPage(currentPage)
        if (status === 201 || status === 204) {
            setOpen(false)
            changeStatus(0)
        }
    }, [changeStatus, currentPage, getOrder, prevPage, orders.length, status]);
    const handleChange = (e:string) => {
        if (e) {
            getOrder(e)
        } else {
            getOrder()
        }
    }
    const modalHandler = (type:string, id:string) => {
        setOpen(true)
        setType(type)
        getOrderById(id)
    }

    return (
        <>
            <div className="mt-5 mb-3 flex w-full gap-3">
                <Searchbar handleChange={handleChange}/>
                <Link href={'/dashboard/order/create'}>
                    <Button>Add New</Button>
                </Link>
            </div>
            <div className="h-[420px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Date</TableHead>
                            <TableHead className="">Total Price</TableHead>
                            <TableHead className="">Customer Name</TableHead>
                            <TableHead className="">Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow key={'loading'}>
                                <TableCell>Loading...</TableCell>
                            </TableRow>
                        ) : (
                            orders.map(({date, order_id, total_price, customer_name, status}, index) => (
                                <TableRow key={order_id || index}>
                                    <TableCell>{date}</TableCell>
                                    <TableCell>{formatRupiah(total_price)}</TableCell>
                                    <TableCell>{customer_name}</TableCell>
                                    <TableCell>{status}</TableCell>
                                    <TableCell className={'flex gap-3'}>
                                        <Link href={`/dashboard/order/${order_id}`}>
                                            <Button>
                                                Detail
                                            </Button>
                                        </Link>
                                        <Link href={`/dashboard/order/${order_id}/update`}>
                                            <Button>
                                                Update
                                            </Button>
                                        </Link>
                                        <Button onClick={() => modalHandler('delete', order_id!)}>
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
            <OrderDialog
                open={open}
                setOpen={setOpen}
                type={type}
            />
        </>
    );
}
