"use client"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {orderStore} from "@/stores/orderStore";
import {detailOrderSchema} from "@/requests/order/detail";
import CurrencyInput from "react-currency-input-field";
import {useParams} from "next/navigation";
import {useEffect} from "react";
import {DetailOrderDetails} from "@/components/dashboard/forms/order/detail/detail";
import {DetailOrderOutcomes} from "@/components/dashboard/forms/order/detail/outcomes";
export default function DetailOrderForm() {
    const {id} = useParams() as {id:string}
    const {getOrderById} = orderStore()
    const form = useForm<z.infer<typeof detailOrderSchema>>({
        resolver: zodResolver(detailOrderSchema),
        defaultValues: {
            p_date: '',
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
                p_date: state.order?.date,
                p_customer_name: state.order?.customer_name,
                p_customer_phone: state.order?.customer_phone,
                p_customer_address: state.order?.customer_address,
                p_status: state.order?.status,
                p_code: state.order?.code,
                total_income: state.order?.total_income,
                total_outcome: state.order?.total_outcome,
                total_price: state.order?.total_price,
                p_order_details: state.order?.order_details,
                p_order_outcomes: state.order?.order_outcomes,
            });
        });
        return () => unsub();
    }, [form, getOrderById, id]);
    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="mb-4 text-2xl font-semibold">Detail Order</h2>
                <p className="font-semibold text-lg">{form.watch("p_code")}</p>
            </div>
            <Form {...form}>
                <form className="space-y-4">
                    <FormField
                        control={form.control}
                        name="p_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tanggal</FormLabel>
                                <FormControl>
                                    <Input disabled={true} type="date" {...field} />
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
                                    <Input disabled={true} placeholder="Masukkan nama..." {...field} />
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
                                <FormLabel>No Hp Customer</FormLabel>
                                <FormControl>
                                    <Input disabled={true} placeholder="Masukkan nomor HP..." {...field} />
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
                                <FormLabel>Alamat Customer</FormLabel>
                                <FormControl>
                                    <Input disabled={true} placeholder="Masukkan alamat..." {...field} />
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
                                <FormControl>
                                    <Input disabled={true} placeholder="Masukkan nama..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="total_price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Harga</FormLabel>
                                <FormControl>
                                    <CurrencyInput
                                        disabled={true}
                                        id="price"
                                        placeholder="Insert price..."
                                        className="input-style"
                                        decimalsLimit={0}
                                        prefix="Rp "
                                        value={field.value}
                                        onValueChange={(value) => field.onChange(value ? Number(value) : undefined)}
                                        allowNegativeValue={false}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="total_income"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Pemasukan</FormLabel>
                                <FormControl>
                                    <CurrencyInput
                                        disabled={true}
                                        id="price"
                                        placeholder="Insert price..."
                                        className="input-style"
                                        decimalsLimit={0}
                                        prefix="Rp "
                                        value={field.value}
                                        onValueChange={(value) => field.onChange(value ? Number(value) : undefined)}
                                        allowNegativeValue={false}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="total_outcome"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Pengeluaran</FormLabel>
                                <FormControl>
                                    <CurrencyInput
                                        disabled={true}
                                        id="price"
                                        placeholder="Insert price..."
                                        className="input-style"
                                        decimalsLimit={0}
                                        prefix="Rp "
                                        value={field.value}
                                        onValueChange={(value) => field.onChange(value ? Number(value) : undefined)}
                                        allowNegativeValue={false}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DetailOrderDetails control={form?.control} />
                    <DetailOrderOutcomes control={form?.control} />
                </form>
            </Form>
        </>
    )
}