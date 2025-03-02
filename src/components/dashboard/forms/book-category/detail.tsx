"use client"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {createBookCategorySchema} from "@/requests/book-category/create";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {bookCategoryStore} from "@/stores/bookCategoryStore";
import {useEffect} from "react";

export default function DetailBookCategory() {
    const {category, loadingDetail} = bookCategoryStore()
    const form = useForm<z.infer<typeof createBookCategorySchema>>({
        resolver: zodResolver(createBookCategorySchema),
        defaultValues: {
            name: category.name
        }
    })
    useEffect(() => {
        form.setValue("name", category.name)
    }, [category, form]);
    return (
        <>
            {
                loadingDetail ? 'Loading fields...' :
                    <Form {...form}>
                        <form>
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
                        </form>
                    </Form>
            }
        </>
    )
}