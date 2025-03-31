'use client'
import { Control, useFieldArray, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CurrencyInput from "react-currency-input-field";
import {z} from "zod";
import {createOrderSchema} from "@/requests/order/create";

type OutcomeDetailProps = {
    control: Control<z.infer<typeof createOrderSchema>>;
};

export function UpdateOrderOutcomes({ control }: OutcomeDetailProps) {
    const { setValue } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "p_order_outcomes",
    });

    return (
        <div>
            <div className="flex justify-between mt-10 items-center">
                <FormLabel className={'text-2xl'}>Outcome Details</FormLabel>
                <Button type="button" onClick={() => append({ name: "", description: "", price: 0 })}>+</Button>
            </div>
            {fields.map((field, index) => (
                <FormItem key={field.id} className="flex gap-3 items-end w-full">
                    <FormField
                        control={control}
                        name={`p_order_outcomes.${index}.name`}
                        render={({ field }) => (
                            <FormItem className={'w-full'}>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter outcome name..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name={`p_order_outcomes.${index}.description`}
                        render={({ field }) => (
                            <FormItem className={'w-full'}>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter description..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name={`p_order_outcomes.${index}.price`}
                        render={({ field }) => (
                            <FormItem className={'w-full'}>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <CurrencyInput
                                        placeholder="Insert price..."
                                        className="input-style"
                                        decimalsLimit={0}
                                        prefix="Rp "
                                        value={field.value}
                                        allowNegativeValue={false}
                                        onValueChange={(value) => setValue(`p_order_outcomes.${index}.price`, Number(value) || 0)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="button" onClick={() => remove(index)}>-</Button>
                </FormItem>
            ))}
        </div>
    );
}
