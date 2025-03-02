"use client"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {createBookCategorySchema} from "@/requests/book-category/create";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {bookCategoryStore} from "@/stores/bookCategoryStore";

export default function CreateBookCategory() {
    const {loadingCrud, createBookCategory} = bookCategoryStore()
    const form = useForm<z.infer<typeof createBookCategorySchema>>({
        resolver: zodResolver(createBookCategorySchema),
        defaultValues: {
            name: ''
        }
    })
    const submitHandler = (values: z.infer<typeof createBookCategorySchema>) => {
        createBookCategory(values)
    }
    return (
        <>
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
        </>
    )
}