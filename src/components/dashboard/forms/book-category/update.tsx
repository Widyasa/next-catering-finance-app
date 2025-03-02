"use client"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {bookCategoryStore} from "@/stores/bookCategoryStore";
import {useEffect, useState} from "react";
import {updateBookCategorySchema} from "@/requests/book-category/update";

export default function UpdateBookCategory() {
    const {loadingCrud, loadingDetail, updateBookCategory, category} = bookCategoryStore()
    const form = useForm<z.infer<typeof updateBookCategorySchema>>({
        resolver: zodResolver(updateBookCategorySchema),
        defaultValues: {
            name: ''
        }
    })
    const [id, setId] = useState<string>('')
    useEffect(() => {
        form.setValue("name", category.name)
        setId(category.id!)
    }, [category, form]);
    const submitHandler = (values: z.infer<typeof updateBookCategorySchema>) => {
        updateBookCategory(id, values)
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