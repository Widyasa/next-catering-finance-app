"use client"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {productStore} from "@/stores/productStore";
import {Textarea} from "@/components/ui/textarea";
import CurrencyInput from "react-currency-input-field";
import {useParams} from "next/navigation";
import {useEffect} from "react";
import {detailProductSchema} from "@/requests/product/detail";

export default function DetailProductForm() {
    const {id} = useParams() as {id:string}
    const {loadingCrud, getProductById, loadingDetail} = productStore()
    const form = useForm<z.infer<typeof detailProductSchema>>({
        resolver: zodResolver(detailProductSchema),
    })
    useEffect(() => {
        getProductById(id);
        const unsub = productStore.subscribe((state) => {
            form.reset({
                name: state.product?.product_name,
                category_name: state.product?.category_name,
                description: state.product?.description,
                price: state.product?.price
            });
        });
        return () => unsub();
    }, [form, getProductById, id]);
    return (
        <>
            {loadingDetail ? 'Loading Form...' :
                <Form {...form}>
                    <form>
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={true} placeholder="insert name..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
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
                                        <FormDescription>
                                            Price per pax
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Input disabled={true} placeholder="insert name..." {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea disabled={true} placeholder="insert description..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            }
        </>
    )
}