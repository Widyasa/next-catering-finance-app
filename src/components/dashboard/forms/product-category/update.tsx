"use client"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {productCategoryStore} from "@/stores/productCategoryStore";
import {useEffect, useState} from "react";
import {updateProductCategorySchema} from "@/requests/product-category/update";

export default function UpdateProductCategory() {
    const {loadingCrud, loadingDetail, updateProductCategory, category} = productCategoryStore()
    const form = useForm<z.infer<typeof updateProductCategorySchema>>({
        resolver: zodResolver(updateProductCategorySchema),
        defaultValues: {
            name: ''
        }
    })
    const [id, setId] = useState<string>('')
    useEffect(() => {
        form.setValue("name", category.name)
        setId(category.id!)
    }, [category, form]);
    const submitHandler = (values: z.infer<typeof updateProductCategorySchema>) => {
        updateProductCategory(id, values)
    }
    return (
        <>
            {
                loadingDetail ? 'Loading fields...' :
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitHandler)}>
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