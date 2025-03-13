"use client"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {productStore} from "@/stores/productStore";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {productCategoryStore} from "@/stores/productCategoryStore";
import CurrencyInput from "react-currency-input-field";
import {useParams} from "next/navigation";
import {useEffect} from "react";
import {updateProductSchema} from "@/requests/product/update";

export default function UpdateProductForm() {
    const {id} = useParams() as {id:string}
    const {loadingCrud, updateProduct, getProductById, loadingDetail} = productStore()
    const {categories} = productCategoryStore()
    const form = useForm<z.infer<typeof updateProductSchema>>({
        resolver: zodResolver(updateProductSchema),
    })
    useEffect(() => {
        getProductById(id);
        const unsub = productStore.subscribe((state) => {
            form.reset({
                name: state.product?.product_name,
                category_id: state.product?.category_id,
                description: state.product?.description,
                price: state.product?.price
            });
        });
        return () => unsub();
    }, [form, getProductById, id]);
    const submitHandler = (values: z.infer<typeof updateProductSchema>) => {
        updateProduct(id, values)
    }
    return (
        <>
            {loadingDetail ? 'Loading Form...' :
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)}>
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="insert name..." {...field} />
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
                                name="category_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Categories" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map(({id, name}, index) => (
                                                    <SelectItem key={index} value={id!}>{name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                                            <Textarea placeholder="insert description..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className={"mt-5"}>
                            {
                                loadingCrud ? 'Proces...' : 'Submit'
                            }
                        </Button>
                    </form>
                </Form>
            }
        </>
    )
}