"use client"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { createOrderSchema } from "@/requests/order/create";
import {orderStore} from "@/stores/orderStore";
import {useEffect} from "react";
import {useParams} from "next/navigation";
import {UpdateOrderDetails} from "@/components/dashboard/forms/order/update/detail";
import {UpdateOrderOutcomes} from "@/components/dashboard/forms/order/update/outcomes";
import {updateOrderSchema} from "@/requests/order/update";
export default function UpdateOrderForm() {
    const {id} = useParams() as {id:string}
    const {loadingCrud, updateOrder, getOrderById} = orderStore()
    const form = useForm<z.infer<typeof updateOrderSchema>>({
        resolver: zodResolver(updateOrderSchema),
        defaultValues: {
            p_order_id: "",
            p_date: "",
            p_customer_name: "",
            p_customer_phone: "",
            p_customer_address: "",
            p_status: "",
            p_code: ``,
            p_order_details: [{product_id: '', quantity: 0, price: 0}],
            p_order_outcomes: [{name: '', description: '', price: 0}]
        }
    })
    useEffect(() => {
        getOrderById(id);
        const unsub = orderStore.subscribe((state) => {
            form.reset({
                p_order_id: id,
                p_date: state.order?.date,
                p_customer_name: state.order?.customer_name,
                p_customer_phone: state.order?.customer_phone,
                p_customer_address: state.order?.customer_address,
                p_status: state.order?.status,
                p_code: state.order?.code,
                p_order_details: state.order?.order_details,
                p_order_outcomes: state.order?.order_outcomes,
            });
        });
        return () => unsub();
    }, [form, getOrderById, id]);
    const submitHandler = (values: z.infer<typeof createOrderSchema>) => {
        updateOrder(id, values)
    }
    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="mb-4 text-2xl font-semibold">Update Order</h2>
                <p className="font-semibold text-lg">{form.watch("p_code")}</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="p_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tanggal</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="p_customer_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Customer</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan nama..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="p_customer_phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Customer Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan nomor HP..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="p_customer_address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Customer Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan alamat..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="p_status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className={"w-full"}>
                                            <SelectValue placeholder="Pilih Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="finished">Finished</SelectItem>
                                        <SelectItem value="canceled">Cancelled</SelectItem>
                                        <SelectItem value="confirmed">Confirmed</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <UpdateOrderDetails control={form.control} />
                    <UpdateOrderOutcomes control={form.control} />

                    <Button type="submit" className={"mt-5"}>
                        {
                            loadingCrud ? 'Proces...' : 'Submit'
                        }
                    </Button>
                </form>
            </Form>
        </>
    )
}